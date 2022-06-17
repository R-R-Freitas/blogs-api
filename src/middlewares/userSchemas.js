const Joi = require('joi');

const newUserValidation = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

module.exports = {
  newUserValidation,
};
