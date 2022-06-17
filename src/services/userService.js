const { User } = require('../database/models');

const create = async (displayName, email, password, image) => {
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

module.exports = {
  create,
  getAll,
  getById,
};
