import React from 'react'
import {
  useHistory,
} from "react-router-dom"
import useField from '../hooks'
import { useDispatch } from 'react-redux'
import { displayNotification } from './reducers/notificationReducer'


const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const noReset = ({ reset, ...rest }) => rest
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    dispatch(displayNotification(`a new anecdote '${content.value}' created`,10))
    history.push('/anecdotes')
  }

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...noReset(content)} />
        </div>
        <div>
          author
          <input {...noReset(author)} />
        </div>
        <div>
          url for more info 
          <input {...noReset(info)} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={() => resetFields()}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew