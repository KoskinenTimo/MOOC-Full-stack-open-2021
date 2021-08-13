import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const BlogForm = ({
  user,
  setNotification,
  setBlogs,
  toggleVisibility
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleInput = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthorInput = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrlInput = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const res = await blogService.create(newBlog, user.token)
    if (res.error) {
      setNotification({ errors: [res.error] })
    } else {
      setNotification({ responses: [`A blog with a title ${newBlog.title} was created`] })
      setTitle('')
      setAuthor('')
      setUrl('')
      toggleVisibility()
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

  if (user) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            title:
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleTitleInput}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleAuthorInput}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              name="url"
              value={url}
              onChange={handleUrlInput}
            />
          </div>
          <button type="submit">Create</button>
        </form>
        <button onClick={toggleVisibility}>Cancel</button>
      </>
    )
  } else {
    return (
      <div>
        <p>Please log in to create blogs.</p>
      </div>
    )
  }
}

BlogForm.propTypes  = {
  user: PropTypes.object,
  setNotification: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func
}

export default BlogForm