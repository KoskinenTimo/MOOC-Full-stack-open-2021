const logger = require('./logger');


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const routeNotFound = (req,res,next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Page not found"
  next(err);
}

const errorHandler = (err,req,res,next) => {
  logger.error(err.message);
  if (err.name === "ValidationError") {
    return res.status(400).json({error:err.message})
  } else {
    return res.status(err.status || 500).json({error:err.message});
  }
}

const asyncHandler = (callback) => {
  return async(req,res,next) => {
    try {
      await callback(req,res,next);
    } catch (error) {
      next(error);
    }
  }
}


module.exports = {
  routeNotFound,
  errorHandler,
  requestLogger,
  asyncHandler
}