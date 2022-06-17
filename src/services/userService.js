const { User } = require('../database/models');
const errorHandler = require('../middlewares/errorHandler');

const notFound = 'User does not exist';

const create = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw errorHandler(404, notFound);
  return user;
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  getByEmail,
};
