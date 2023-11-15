const mongoose = require('mongoose');
const userSchema = require('./user');

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
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
    type: Object,
    required: true,
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userSchema,
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
