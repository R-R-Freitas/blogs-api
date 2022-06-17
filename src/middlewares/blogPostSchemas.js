const Joi = require('joi');

const newBlogPostValidation = Joi.object({
    title: Joi.required(),
    content: Joi.required(),
    categoryIds: Joi.required(),
  });

  const editBlogPostValidation = Joi.object({
    title: Joi.required(),
    content: Joi.required(),
  });

module.exports = {
  newBlogPostValidation,
  editBlogPostValidation,
};
