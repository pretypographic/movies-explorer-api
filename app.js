const PORT = process.env.PORT || 3000;

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();

// const path = require('path');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const index = require('./routes');
const errorHandler = require('./middlewares/error-handler');

mongoose.connect('mongodb://127.0.0.1/bitfilmsdb');
const app = express();
app.use(cors());

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(requestLogger);
app.use(index);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
