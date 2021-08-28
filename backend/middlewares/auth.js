const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports = (req, res, next) => {
  const { Authorization } = req.headers;

  const token = Authorization.replace('Bearer ', '');
  let playload;

  try {
    playload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }
  req.user = playload;
  next();
};
