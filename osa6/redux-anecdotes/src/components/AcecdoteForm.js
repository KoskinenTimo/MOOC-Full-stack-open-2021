import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNewAnecdote = (e) => {    
    e.preventDefault()
    const anecdote = {
      content: e.target.querySelector("input[name='anecdote']").value
    }
    dispatch(addAnecdote(anecdote))
    e.target.querySelector("input[name='anecdote']").value = ''
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