const Joi = require('joi');
const { urlRegex } = require('../helpers/urlRegex');

const schema = Joi.object().keys({
  url: Joi.string().trim().pattern(urlRegex).required(),
  alias: Joi.string()
    .trim()
    .pattern(/[\w\-]/i)
    .allow('')
    .optional(),
});

const validate = async (body) => {
  const validation = schema.validate(body);
  if (validation.error) {
    throw new Error(validation.error);
  }
  return true;
};

module.exports = {
  validate,
};
