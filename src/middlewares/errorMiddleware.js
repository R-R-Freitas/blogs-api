const errorMiddleware = (err, _req, res, _next) => {
    if (!err.status || !err.message) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    return res.status(err.status).json({ message: err.message });
  };
  
  module.exports = errorMiddleware;
