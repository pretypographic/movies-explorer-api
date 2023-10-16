/* eslint-disable no-console */
const BadRequestError = require('../errors/bad-request-err');
const AccessDeniedError = require('../errors/access-denied-err');
const Forbidden = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found-err');
const Conflict = require('../errors/conflict');

const BAD_REQUEST = 400;
const ACCESS_DENIED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;

module.exports = (error, req, res, next) => {
  if (error instanceof BadRequestError) {
    console.log(BAD_REQUEST, error.message);
    return res.status(BAD_REQUEST).json({
      error: error.message,
      message: error.stack,
    });
  }
  if (error instanceof AccessDeniedError) {
    console.log(ACCESS_DENIED, error.message);
    return res.status(ACCESS_DENIED).json({
      error: error.message,
      message: error.stack,
    });
  }
  if (error instanceof Forbidden) {
    console.log(FORBIDDEN, error.message);
    return res.status(FORBIDDEN).json({
      error: error.message,
      message: error.stack,
    });
  }
  if (error instanceof NotFoundError) {
    console.log(NOT_FOUND, error.message);
    return res.status(NOT_FOUND).json({
      error: error.message,
      message: error.stack,
    });
  }
  if (error instanceof Conflict) {
    console.log(CONFLICT, error.message);
    return res.status(CONFLICT).json({
      error: error.message,
      message: error.stack,
    });
  }
  console.log('Error occurred:', error);
  res.status(INTERNAL_SERVER_ERROR).json({
    error: 'internal server error',
    message: error.stack,
  });
  return next();
};
