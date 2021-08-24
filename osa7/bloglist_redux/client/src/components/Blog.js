import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateOneBlog, deleteOneBlog } from '../reducers/blogReducer'
import Comments from './Comments'


const Blog = () => {
  const user = useSelector(state => state.currentUser)
  const blogs = useSelector(state => state.blogs)
  const { id } = useParams()
  const dispatch = useDispatch()
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    if (blogs.length && id) {
      setBlog(blogs.find(blog => blog.id === id))
      console.log(blog)
    }
  })

  const handleLikeButton = (blog) => {
    const updatedLikes = {
      likes: blog.likes + 1
    }
    dispatch(updateOneBlog(blog.id, updatedLikes,true))
  }

  const handleRemoveButton = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      dispatch(deleteOneBlog(blog.id,user))
    }
  }

  if (blog === undefined) {
    return (
      <div>
        <h1>Not found!</h1>
      </div>
    )
  } else if (blog) {
    return (
      <div className='wrap'>
        <div className='blogbox'>
          <h1>{blog.title} {blog.author}</h1>
          <label><a href={blog.url}>{blog.url}</a></label>
          <p>Likes: {blog.likes} <button onClick={() => handleLikeButton(blog)}>Like</button></p>
          <p>{blog.user.name}</p>
          {
            user &&
            blog.user.username === user.username
              ? <button onClick={() => handleRemoveButton(blog)} className="remove-blog-button">Remove</button>
              : null
          }
        </div>
        <Comments blog={blog}/>
      </div>
    )
  } else {
    return null
  }
}

export default Blog