import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const Blog = ({
  blog,
  toggleVisibility,
  user,
  setBlogs,
  setNotification
}) => {

  const handleLikeButton = async() => {
    const updatedLikes = {
      likes: blog.likes + 1
    }
    await blogService.update(blog.id, updatedLikes, user.token)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

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
  return (
    <div>
      <p>
        {blog.title} {blog.author + ' '}
        <button onClick={toggleVisibility}>Hide</button>
      </p>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={handleLikeButton}>Like</button></p>
      <p>{blog.user.name}</p>
      {renderRemoveButton()}
    </div>
  )
}

Blog.propTypes  = {
  blog: PropTypes.object.isRequired,
  toggleVisibility: PropTypes.func,
  user: PropTypes.object,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Blog