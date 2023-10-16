const mongoose = require('mongoose');
const movieModel = require('../models/movie');

const OK = 200;
const CREATED = 201;

const Forbidden = require('../errors/forbidden');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

function getMovies(req, res, next) {
  movieModel.find({})
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
};

function postMovie(req, res, next) {
  movieModel.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(CREATED).send(movie);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('incorrect data'));
      };
      return next(error);
    });
};

function deleteMovie(req, res, next) {
  movieModel.findById(req.params.movieId).orFail()
    .then((movie) => {
      if (req.user._id !== movie.owner._id.toString()) {
        throw new Forbidden('forbidden');
      };
      return movieModel.deleteOne({ _id: movie._id });
    })
    .then((removedMovie) => {
      res.status(OK).send(removedMovie);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('incorrect address'));
      }
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('does not exist'));
      }
      return next(error);
    });
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
