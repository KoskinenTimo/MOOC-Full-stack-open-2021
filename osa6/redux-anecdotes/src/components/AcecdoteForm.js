import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

  const addNewAnecdote = (e) => {    
    e.preventDefault()
    const anecdote = e.target.querySelector("input[name='anecdote']").value
    props.addAnecdote(anecdote)
    e.target.querySelector("input[name='anecdote']").value = ''
    props.setNotification(`A new anecdote '${anecdote.content}' was created!`,4)
  }

  return(
  <>
    <h2>create new</h2>
    <form onSubmit={addNewAnecdote}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  </>
  )
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)