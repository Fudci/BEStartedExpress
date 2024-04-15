const requestLoggerMiddleware = (err, req, res, next) => {
  console.log(`Incoming request to ${req.path} from ${req.ip}`);
  console.log("this before after", err);
  res.status(500).send(err)
  next();
};

module.exports = requestLoggerMiddleware;
