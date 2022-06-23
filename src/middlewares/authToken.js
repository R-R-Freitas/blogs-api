const jwt = require('jsonwebtoken');
require('dotenv').config();
const errorHandler = require('../utils/errorHandler');

const notFound = 'Token not found';
const secret = process.env.JWT_SECRET;

const authToken = async (req, _res, next) => {
    const token = req.headers.authorization;

    if (!token) throw errorHandler(401, notFound);
    const decoded = jwt.verify(token, secret)
    req.user = decoded;

    next();
}

module.exports = authToken 