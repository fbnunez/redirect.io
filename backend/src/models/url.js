const Joi = require('joi');

const schema = Joi.object().keys({
  url: Joi.string().trim().uri().required(),
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
