const ipLoggerMiddleware = (req, res, next) => {
    const ip = req.ip;
    console.log(`Request IP: ${ip}`);
    next();
  };
  
  module.exports = ipLoggerMiddleware;