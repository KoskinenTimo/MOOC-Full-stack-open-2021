import React from 'react'
import PropTypes from 'prop-types'

// Hooks
import { useField } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'

// Reducers
import { createOneBlog } from '../reducers/blogReducer'


const BlogForm = ({
  toggleVisibility
}) => {
  const user = useSelector(state => state.currentUser)
  const dispatch = useDispatch()
  const title = useField('text','title')
  const author = useField('text','author')
  const url = useField('text','url')
  // eslint-disable-next-line no-unused-vars
  const noReset = ({ reset, ...rest }) => rest
  const resetFields = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const created = await dispatch(createOneBlog(newBlog,user))
    if (created) {
      resetFields()
      toggleVisibility()
    }
  }

  if (user) {
    return (
      <div className="form--centered">
        <h1>Create a new blog</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input {...noReset(title)}/>
          <label htmlFor="author">Author:</label>
          <input {...noReset(author)}/>
          <label htmlFor="url">Url:</label>
          <input {...noReset(url)}/>
          <button type="submit">Create</button>
          <button type="button" onClick={toggleVisibility}>Cancel</button>
        </form>
      </div>
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
  toggleVisibility: PropTypes.func
}

export default BlogForm