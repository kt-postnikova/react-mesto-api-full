const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

// const { JWT_SECRET = 'dev-key' } = process.env;
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let playload;

  try {
    playload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'express-dev-key');
  } catch (err) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }
  req.user = playload;
  next();
};
