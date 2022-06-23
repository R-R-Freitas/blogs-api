const Joi = require('joi');

const newBlogPostValidation = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
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
