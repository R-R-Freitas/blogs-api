const categoryService = require('../services/categoryService');
const errorHandler = require('../middlewares/errorHandler');

const missingName = '"name" is required';

const create = async (req, res, _next) => {
  if (!req.body.name) throw errorHandler(400, missingName);
  const { name } = req.body;
  const newCategory = await categoryService.create(name);
  return res.status(201).json(newCategory);
};

const getAll = async (_req, res, _next) => {
  const categories = await categoryService.getAll();
  return res.status(200).json(categories);
};

module.exports = {
  create,
  getAll,
};
