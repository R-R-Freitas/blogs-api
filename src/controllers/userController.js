const userService = require('../services/userService');
const errorHandler = require('../middlewares/errorHandler');
const { newUserValidation } = require('../middlewares/userSchemas');

const missingFields = 'Some required fields are missing';

const login = async (req, res, _next) => {
  if (!req.body.email || !req.body.password) throw errorHandler(400, missingFields);
  const { email, password } = req.body;
  const token = email;
  return res.status(200).json({ token, password });
};

const create = async (req, res, _next) => {
  const invalidUser = newUserValidation.validate(req.body);
  if (invalidUser.error) throw errorHandler(400, invalidUser.error.details[0].message);
  
  const { displayName, email, password, image } = req.body;
  await userService.getByEmail(email);
  
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

const remove = async (req, res, _next) => {
  const id = 1;

  await userService.remove(id);
  return res.status(204).end();
};

module.exports = {
  login,
  create,
  getAll,
  getById,
  remove,
};
