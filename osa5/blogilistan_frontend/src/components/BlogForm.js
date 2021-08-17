import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({
  user,
  createBlog,
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
    const res = await createBlog(newBlog)
    if (res) {
      setTitle('')
      setAuthor('')
      setUrl('')
      toggleVisibility()
    }
  }

  if (user) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            title:
            <input
              id='title'
              type="text"
              name="title"
              value={title}
              onChange={handleTitleInput}
            />
          </div>
          <div>
            author:
            <input
              id='author'
              type="text"
              name="author"
              value={author}
              onChange={handleAuthorInput}
            />
          </div>
          <div>
            url:
            <input
              id='url'
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
  setNotification: PropTypes.func,
  setBlogs: PropTypes.func,
  toggleVisibility: PropTypes.func
}

export default BlogForm