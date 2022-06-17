const userService = require('../services/userService');

const login = async (req, res, _next) => {
  const { email, password } = req.body;
  const token = email;
  return res.status(200).json({ token, password });
};

const create = async (req, res, _next) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await userService.create(displayName, email, password, image);
  return res.status(201).json(newUser);
};

const getAll = async (_req, res, _next) => {
  const users = await userService.getAll();
  return res.status(200).json(users);
};

const getById = async (req, res, _next) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  return res.status(200).json(user);
};

module.exports = {
  login,
  create,
  getAll,
  getById,
};
