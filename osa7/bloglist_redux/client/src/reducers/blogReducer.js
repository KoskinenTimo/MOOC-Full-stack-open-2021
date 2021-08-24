import { displayNotification } from './notificationReducer'
import blogService from '../services/blogs'


const blogsReducer = (state=[],action) => {
  switch (action.type) {
  case 'CREATE_BLOG':
    return state.concat(action.data)
  case 'UPDATE_BLOG':
    return state.map(blog =>
      blog.id === action.data.id
        ? { ...blog, ...action.data.update }
        : blog
    )
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'GET_BLOGS':
    return action.data
  case 'CREATE_BLOG_COMMENT':
    return state.map(blog =>
      blog.id === action.data.id
        ? action.data
        : blog
    )
  default:
    return state
  }
}

const handleResponse = (dispatch,res,type,message=null) => {
  if (res.error) {
    dispatch(displayNotification({ errors: [res.error] }),5)
    return false
  } else {
    dispatch({
      type: type,
      data: res
    })
    if (message) {
      dispatch(displayNotification({ messages: [message] }),5)
    }
    return true
  }
}

export const getAllBlogs = () => {
  return async dispatch => {
    const res = await blogService.getAll()
    handleResponse(dispatch,res,'GET_BLOGS')
  }
}

export const createOneBlog = (blog,user) => {
  return async dispatch => {
    const res = await blogService.create(blog,user.token)
    return handleResponse(
      dispatch,
      res,
      'CREATE_BLOG',
      'A new blog created succesfully'
    )
  }
}

export const deleteOneBlog = (blogId,user) => {
  return async dispatch => {
    const res = await blogService.remove(blogId,user.token)
    return handleResponse(
      dispatch,
      res === '' ? { id:blogId } : res,
      'REMOVE_BLOG',
      'Blog removed succesfully'
    )
  }
}

export const updateOneBlog = (blogId,update,like=false) => {
  return async dispatch => {
    const res = await blogService.update(blogId,update)
    res.id = blogId
    res.update = update
    handleResponse(
      dispatch,
      res,
      'UPDATE_BLOG',
      like ? `You liked '${res.title}'` : 'Blog updated succesfully'
    )
  }
}

export const createBlogComment = (blogId,comment) => {
  return async dispatch => {
    const res = await blogService.createComment(blogId,comment)
    handleResponse(
      dispatch,
      res,
      'CREATE_BLOG_COMMENT',
      'Comment posted'
    )
  }
}


export default blogsReducer