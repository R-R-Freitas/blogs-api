const errorHandler = require('../utils/errorHandler');
const blogPostService = require('../services/blogPostService');
const categoryService = require('../services/categoryService');
const { newBlogPostValidation, editBlogPostValidation } = require('../utils/blogPostSchemas');

const missingFields = 'Some required fields are missing';

const create = async (req, res, _next) => {
  const validateBody = newBlogPostValidation.validate(req.body);
  if (validateBody.error) throw errorHandler(400, missingFields);

  const { title, content, categoryIds } = req.body;
  await categoryService.getByIds(categoryIds);

  const userId = 1;

  const newBlogPost = await blogPostService.create(title, content, userId, categoryIds);
  return res.status(201).json(newBlogPost);
};

const getAll = async (_req, res, _next) => {
  const blogPosts = await blogPostService.getAll();
  return res.status(200).json(blogPosts);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const blogPost = await blogPostService.getById(id);
  return res.status(200).json(blogPost);
};

const edit = async (req, res, _next) => {
  const validateBody = editBlogPostValidation.validate(req.body);
  if (validateBody.error) throw errorHandler(400, missingFields);

  const { id } = req.params;
  const { title, content } = req.body;
  const blogPost = await blogPostService.edit(id, title, content);
  return res.status(200).json(blogPost);
};

const remove = async (req, res, _next) => {
  const { id } = req.params;
  await blogPostService.remove(id);
  return res.status(204).end();
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
  remove,
};
