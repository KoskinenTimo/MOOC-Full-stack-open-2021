const logger = require('./logger');
const jwt = require('jsonwebtoken');


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
  } else if (err.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
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

const userExtractor = async (req,res,next) => {
  const authToken = req.get('authorization');
  if (authToken && authToken.toLowerCase().startsWith('bearer ')) {
    try {
      const tokenDecoded = jwt.verify(authToken.substring(7), process.env.SECRET);
      req.currentUser = tokenDecoded;
    } catch (err) {
      err.status = 401;
      err.message = "Access denied"
      return next(err);
    }
  } else {
    return res.status(401).json({ error: "Authorization token missing or invalid"})
  }
  next();
}

module.exports = {
  routeNotFound,
  errorHandler,
  requestLogger,
  asyncHandler,
  userExtractor
}