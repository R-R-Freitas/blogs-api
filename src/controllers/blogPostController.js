const blogPostService = require('../services/blogPostService');

const create = async (req, res, _next) => {
  const { title, content, categoryIds } = req.body;
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

module.exports = {
  create,
  getAll,
  getById,
};
