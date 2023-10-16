const mongoose = require('mongoose');
const userSchema = require('./user');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/[a-z0-9\-_.~:/?#[\]@!$&'()*+,;=]+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid URL reference`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/[a-z0-9\-_.~:/?#[\]@!$&'()*+,;=]+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid URL reference`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http|https):\/\/[a-z0-9\-_.~:/?#[\]@!$&'()*+,;=]+$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid URL reference`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userSchema,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);