const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { asyncHandler, userExtractor } = require('../utils/middleware');
const { createError } = require('../utils/createError');

/**
 * GET all blogs from db
 */
blogsRouter.get('/', asyncHandler(async (req,res,next) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });
  if (blogs) {
    res.status(200).json(blogs);
  } else {
    next(createError());
  }
}));

/**
 * POST one blog to db
 */
blogsRouter.post('/', userExtractor, asyncHandler(async (req,res,next) => {
  const { body, currentUser} = req;  
  const blog = new Blog({ ...body, user: currentUser.id }); 
  const postedBlog = await blog
    .save()
    .then(blog => 
      blog
      .populate('user', { username: 1, name: 1 })
      .execPopulate());
  if (postedBlog) {
    res.status(201).json(postedBlog);
  } else {
    next(createError());
  }
}));

/**
 * GET one blog from db
 */
blogsRouter.get('/:id', asyncHandler(async (req,res,next) => {
  const id = req.params.id;
  const blog = await Blog.findById(id)
    .populate('user', { username: 1, name: 1 });
  if (blog) {
    res.status(200).json(blog);
  } else {    
    next(createError(404,`Blog with id ${id} not found.`));
  }
}));

/**
 * DELETE one blog from db
 */
blogsRouter.delete('/:id', userExtractor, asyncHandler(async (req,res,next) => {
  const id = req.params.id;
  const { currentUser } = req;
  const blog = await Blog.findById(id);

  if (blog.user.toString() == currentUser.id) {
    const response = await Blog.findByIdAndRemove(id);
    if (response) {
      res.status(204).end();
    } else {
      next(createError(404,`Blog with id ${id} not found.`));
    }
  } else {
    next(createError(401,"Not the blog owner, access denied"));
  }
}));

/**
 * UPDATE one blog in db
 */
blogsRouter.put('/:id', asyncHandler (async (req,res,next) => {
  const id = req.params.id;
  const update = req.body;
  const response = await Blog.findByIdAndUpdate(id, update, { new:true, runValidators:true })
    .populate('user', { username: 1, name: 1 });
  if (response) {
    res.json(response);
  } else {
    next(createError(404,`Blog with id ${id} not found.`));
  }
}));

module.exports = blogsRouter;