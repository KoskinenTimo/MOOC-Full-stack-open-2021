const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const { asyncHandler } = require('../utils/middleware');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { createError } = require('../utils/createError');


loginRouter.post('/', asyncHandler(async(req,res,next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username }, { username: 1, passwordHash: 1, name: 1 });
  
  if (user) {
    const validDetails = bcryptjs.compareSync(password,user.passwordHash);
    if (validDetails) {
      const userObjectForToken = {
        username: user.username,
        id: user._id
      }    
      
      const token = jwt.sign(
        userObjectForToken,
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      
      res.status(200).send({ token, username: user.username, name: user.name });
    } else {
      next(createError(401,"Login details incorrect"));
    } 
  } else {
    next(createError(401,"Username does not exist"));
  }  
}))


module.exports = loginRouter;