const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  if (error.status) res.status(error.status);
  else res.status(500);

  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? 'Well....' : error.stack,
  });
});

const port = process.env.DEFAULT_PORT || 8888;
app.listen(port, () => {
  console.log(`Listening at localhost:${port}`);
});
