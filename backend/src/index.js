const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
require('dotenv').config();
const rfs = require('rotating-file-stream');
const path = require('path');

const app = express();
const logStream = rfs.createStream('request.log', {
  interval: '1d',
  size: '50M',
  path: path.join(__dirname, 'logs'),
});
app.use(helmet());
app.use(morgan('combined', { stream: logStream }));
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  if (error.status) res.status(error.status);
  else res.status(500);

  res.json({
    message: error.message ? error.message : 'Something went wrong 🤔️',
    stack:
      process.env.NODE_ENV === 'production'
        ? 'Pss... this is just for the devs 😅️'
        : error.stack,
  });
});

const port = process.env.DEFAULT_PORT || 8888;
app.listen(port, () => {
  console.log(`Listening at localhost:${port}`);
});
