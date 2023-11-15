const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies,
  postMovie,
  deleteMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, celebrate({
  body: Joi.object().keys({
    id: Joi.number().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.object().required(),
    trailerLink: Joi.string().uri({ scheme: ['http', 'https'] }).regex(/^(?!.*~!)(?!.*link:).*$/).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    created_at: Joi.string(),
    updated_at: Joi.string(),
  }),
}), postMovie);
router.delete('/movies/:movieId', auth, celebrate({
  params: Joi.object().keys({
    movieId: Joi
      .string()
      .alphanum()
      .length(24)
      .hex()
      .required(),
  }),
}), deleteMovie);

module.exports = router;
