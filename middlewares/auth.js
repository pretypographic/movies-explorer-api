/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AccessDeniedError = require('../errors/access-denied-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AccessDeniedError('authorization required'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'napo7b-2e-napo7b',
    );
  } catch {
    return next(new AccessDeniedError('authorization required'));
  }
  req.user = payload;
  return next();
};
