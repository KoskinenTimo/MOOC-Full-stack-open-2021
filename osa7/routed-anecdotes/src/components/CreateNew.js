import React from 'react'
import {
  useHistory,
} from "react-router-dom"
import useField from '../hooks'


const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const noReset = ({ reset, ...rest }) => rest
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`a new anecdote '${content.value}' created!`)
    history.push('/anecdotes')
    setTimeout(() => {
      props.setNotification(null)
    },10000)
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