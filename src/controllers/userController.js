const userService = require('../services/userService');
const errorHandler = require('../utils/errorHandler');
const { newUserValidation, loginValidation } = require('../utils/userSchemas');
const generateJWT = require('../utils/generateJWT');

const missingFields = 'Some required fields are missing';

const login = async (req, res, _next) => {
  const invalidUser = loginValidation.validate(req.body);
  if (invalidUser.error) throw errorHandler(400, missingFields);
  const { email, password } = req.body;
  const user = await userService.login(email, password);
  const token = generateJWT(user);
  return res.status(200).json({ token });
};

const create = async (req, res, _next) => {
  const invalidUser = newUserValidation.validate(req.body);
  if (invalidUser.error) throw errorHandler(400, invalidUser.error.details[0].message);
  
  const { displayName, email, password, image } = req.body;
  await userService.getByEmail(email);
  
  const newUser = await userService.create(displayName, email, password, image);
  const token = generateJWT(newUser);

  return res.status(201).json({ token });
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
  const { id } = req.user.data;

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
