const requestLoggerMiddleware = (err, req, res, next) => {
  console.log("err", err);
  console.log(`Incoming request to ${req.path} from ${req.ip}`);

  next();
};

module.exports = requestLoggerMiddleware;
