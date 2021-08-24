const User = require('../models/user');
const usersRouter = require('express').Router();
const { asyncHandler } = require('../utils/middleware');
const bcryptjs = require('bcryptjs');
const { createError } = require('../utils/createError');


/**
 * GET all users from db
 */
usersRouter.get('/', asyncHandler(async(req,res,next) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 });
  if (users) {
    res.json(users.map(user => user.toJSON()));
  } else {
    next(createError());
  }
}));

/**
 * POST one user to db
 */
usersRouter.post('/', asyncHandler(async(req,res,next) => {
  const { username, password, name } = req.body;  
  if(!password || password.length < 6) {
    next(createError(400, "Password must be atleast 6 characters long"));
  } else {
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const user = new User({
      username: username,
      passwordHash: hashedPassword,
      name: name
    })
    const saved = await user.save();
    if (saved) {
      res.status(201).json(user)
    } else {
      next(createError());
    }    
  }
}));

module.exports = usersRouter;