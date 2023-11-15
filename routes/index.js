const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');

// const { OK } = require('../utils/constants');

// router.get('/', (req, res) => {
//   res.status(OK).send('connected');
// });
router.use(usersRouter);
router.use(moviesRouter);
router.use('*', (req, res, next) => next(new NotFoundError('incorrect address')));

module.exports = router;
