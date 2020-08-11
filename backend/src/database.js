const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
  'mongodb+srv://app:' +
    process.env.MONGO_ATLAS_KEY +
    '@cluster0.utntn.mongodb.net/' +
    process.env.MONGO_ATLAS_DB +
    '?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose;
