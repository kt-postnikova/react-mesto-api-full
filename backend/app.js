const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routes/user');
const cardsRouter = require('./routes/card');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { loginValidator, registrationValidator } = require('./middlewares/validation');
const NotFoundError = require('./errors/NotFoundError');
// const signOut = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cors({
  // origin: 'http://localhost:3001',
  origin: 'https://project.mesto.nomoredomains.rocks',
  methods: ['POST', 'DELETE', 'GET', 'PUT', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValidator, login);
app.post('/signup', registrationValidator, createUser);
// app.post('/signout', signOut);

app.use(auth);
app.use('/', userRouter);
app.use('/', cardsRouter);

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });

  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT);
