import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({
  blog,
  user,
  setBlogs,
  setNotification,
  handleLikeButton
}) => {

  const [visible, setVisible] = useState(false)

  const handleRemoveButton = async() => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      const res = await blogService.remove(blog.id, user.token)
      if (res) {
        setNotification({ errors: res })
      } else {
        setNotification({ responses: ['Remove succesful'] })
        const blogs = await blogService.getAll()
        setBlogs(blogs)
      }
    }
  }

  const renderRemoveButton = () => {
    if (blog.user.username
      && user
      && blog.user.username === user.username) {
      return <button onClick={handleRemoveButton}>Remove</button>
    }
  }

  if (!visible) {
    return (
      <div>
        <p>
          {blog.title} {blog.author + ' '}
          <button onClick={() => setVisible(true)}>Show</button>
        </p>
      </div>
    )
  } else {
    return (
      <div>
        <p>
          {blog.title} {blog.author + ' '}
          <button onClick={() => setVisible(false)}>Hide</button>
        </p>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={() => handleLikeButton(blog)}>Like</button></p>
        <p>{blog.user.name}</p>
        {renderRemoveButton()}
      </div>
    )
  }
}

Blog.propTypes  = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
  setBlogs: PropTypes.func,
  setNotification: PropTypes.func
}

export default Blog