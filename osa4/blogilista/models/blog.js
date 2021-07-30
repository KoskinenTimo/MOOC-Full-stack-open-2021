const mongoose = require('mongoose');


const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title value is required"],
    minLength: [2, "title must be atleast 2 characters long"]
  },
  author: {
    type: String,
    required: [true, "author value is required"],
    minLength: [2, "author must be atleast 2 characters long"]
  },
  url: {
    type: String,
    required: [true, "url value is required"],
    minLength: [8, "title must be atleast 8 characters long"]
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog