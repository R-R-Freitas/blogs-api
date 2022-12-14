const { Category } = require('../database/models');
const errorHandler = require('../utils/errorHandler');

const notFound = '"categoryIds" not found';

const create = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const getByIds = async (ids) => {
// solução semelhante à encontrada em: https://stackoverflow.com/questions/24920427/sequelize-error-when-using-where-and-in-on-a-subarray
  const validIds = await Category.findAll({ where: { id: ids } });
  if (validIds.length !== ids.length) throw errorHandler(400, notFound);
};

module.exports = {
  create,
  getAll,
  getByIds,
};
