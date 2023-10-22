const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-err');

router.get('/', (req, res) => {
  res.status(200).send('connected');
});
router.use(usersRouter);
router.use(moviesRouter);
router.use('*', (req, res, next) => next(new NotFoundError('incorrect address')));

module.exports = router;
