const { customAlphabet } = require('nanoid/async');
require('dotenv').config();
const max = Number(process.env.MAX_SEED);
const min = Number(process.env.MIN_SEED);

const getNanoUrl = async () => {
  const nanoid = customAlphabet(
    '1234567890abcdfghijklmnopqrstuvxzABCDFGHIJKLMNOPQRSTUVXZ',
    Math.floor(Math.random() * (max - min + 1) + min)
  );
  return await nanoid();
};

module.exports = {
  getNanoUrl,
};
