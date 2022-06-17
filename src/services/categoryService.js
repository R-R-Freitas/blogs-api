const { Category } = require('../database/models');
const errorHandler = require('../middlewares/errorHandler');

const notFound = 'CategoryIds not found';

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
  if (validIds.length !== ids.length) throw errorHandler(404, notFound);
};

module.exports = {
  create,
  getAll,
  getByIds,
};
