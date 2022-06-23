const jwtError = 'JsonWebTokenError';
const invalidToken = 'Expired or invalid token';

const errorMiddleware = (err, _req, res, _next) => {
  if (err.name === jwtError) return res.status(401).json({ message: invalidToken });
  if (!err.status || !err.message) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  return res.status(err.status).json({ message: err.message });
};
  
  module.exports = errorMiddleware;
