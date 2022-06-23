const errorHandler = require('../utils/errorHandler');
const blogPostService = require('../services/blogPostService');
const categoryService = require('../services/categoryService');
const { newBlogPostValidation, editBlogPostValidation } = require('../utils/blogPostSchemas');

const missingFields = 'Some required fields are missing';
const unauthorized = 'Unauthorized user';

const create = async (req, res, _next) => {
  const validateBody = newBlogPostValidation.validate(req.body);
  if (validateBody.error) throw errorHandler(400, missingFields);
  const userId = req.user.data.id;

  const { title, content, categoryIds } = req.body;
  await categoryService.getByIds(categoryIds);


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
  const userId = req.user.data.id;

  const { id } = req.params;
  const { title, content } = req.body;

  const currentBlogPost = await blogPostService.getById(id);
  if (userId !== currentBlogPost.user.id) throw errorHandler(401, unauthorized);
  const blogPost = await blogPostService.edit(id, title, content);
  return res.status(200).json(blogPost);
};

const remove = async (req, res, _next) => {
  const { id } = req.params;
  const userId = req.user.data.id;
  const blogPost = await blogPostService.getById(id);
  if (userId !== blogPost.user.id) throw errorHandler(401, unauthorized);
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
