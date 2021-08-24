import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlogComment } from '../reducers/blogReducer'


const Comments = ({ blog }) => {
  const comment = useField('text','comment')
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const noReset = ({ reset, ...rest }) => rest

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createBlogComment(blog.id,comment.value))
    comment.reset()
  }

  return (
    <div className="blogbox">
      <h1>Comments</h1>
      <div className="comments--flex">
        <ul className="comments">
          {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
        </ul>
        <form onSubmit={handleSubmit}>
          <label htmlFor="comment">New Comment:</label>
          <input {...noReset(comment)}/>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => comment.reset()}>Reset</button>
        </form>
      </div>
    </div>
  )
}

export default Comments