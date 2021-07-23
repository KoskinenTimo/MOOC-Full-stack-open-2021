const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { asyncHandler } = require('../utils/middleware');

const createError = (statusCode=500,message="Something went wrong.") => {
  const err = new Error();
  err.status = statusCode;
  err.message = message;
  return err;
}

/**
 * GET all blogs from db
 */
blogsRouter.get('/', asyncHandler(async (req,res,next) => {
  const blogs = await Blog.find({});
  if (blogs) {
    res.json(blogs);
  } else {
    next(createError());
  }
}));

/**
 * POST one blog to db
 */
blogsRouter.post('/', asyncHandler(async (req,res,next) => {
  const blog = new Blog(req.body)
  const postedBlog = await blog.save();
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
  const blog = await Blog.findById(id);
  if (blog) {
    res.status(200).json(blog);
  } else {    
    next(createError(404,`Blog with id ${id} not found.`));
  }
}));

/**
 * DELETE one blog from db
 */
blogsRouter.delete('/:id', asyncHandler(async (req,res,next) => {
  const id = req.params.id;
  const response = await Blog.findByIdAndRemove(id);
  if (response) {
    res.status(204).end();
  } else {
    next(createError(404,`Blog with id ${id} not found.`));
  }
}));

/**
 * UPDATE one blog in db
 */
blogsRouter.put('/:id', asyncHandler (async (req,res,next) => {
  const id = req.params.id;
  const update = req.body;
  const response = await Blog.findByIdAndUpdate(id, update, { new:true, runValidators:true });
  if (response) {
    res.json(response);
  } else {
    next(createError(404,`Blog with id ${id} not found.`));
  }
}));

module.exports = blogsRouter;