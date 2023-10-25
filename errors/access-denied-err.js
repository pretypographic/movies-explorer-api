class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = 'AccessDeniedError';
  }
}

module.exports = AccessDeniedError;
