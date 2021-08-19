import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setText, resetText } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = (e) => {    
    e.preventDefault()
    const anecdote = {
      content: e.target.querySelector("input[name='anecdote']").value
    }
    dispatch(addAnecdote(anecdote))
    e.target.querySelector("input[name='anecdote']").value = ''
    dispatch(setText(`A new anecdote '${anecdote.content}' was created!`))
    setTimeout(() => {
      dispatch(resetText())
    }, 2000)
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

export default AnecdoteForm