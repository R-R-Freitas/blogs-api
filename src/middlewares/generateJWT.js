const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256'
};

const generateJWT = (payload) => {
  const token = jwt.sign({ data: payload }, secret, jwtConfig);

  return token;
};

module.exports = generateJWT; 