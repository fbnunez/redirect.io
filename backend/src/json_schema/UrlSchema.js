const Joi = require('joi');
const { urlRegex } = require('../helpers/urlRegex');

const urlValidation = Joi.object().keys({
  url: Joi.string().trim().pattern(urlRegex).required(),
});

const aliasValidation = Joi.object().keys({
  alias: Joi.string()
    .trim()
    .pattern(/[\w\-]/i)
    .allow('')
    .optional(),
});

const validate = async (body) => {
  const urlIsValid = urlValidation.validate({ url: body.url });
  if (urlIsValid.error) {
    throw new Error('Your URL is not valid');
  }
  const aliasIsValid = aliasValidation.validate({ alias: body.alias });
  if (aliasIsValid.error) {
    throw new Error('Your ALIAS is not valid');
  }
  return true;
};

module.exports = {
  validate,
};
