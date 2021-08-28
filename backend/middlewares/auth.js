const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports = (req) => {
  // const { authorization } = req.headers;

  // const token = authorization.replace('Bearer ', '');
  const token = req.cookie.jwt;
  console.log('token');
  let playload;

  try {
    playload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }
  req.user = playload;
  // next();
};
