import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const voteHandler = (id) => {
    console.log('vote', id)
    dispatch(vote({ id: id }))
  }

  return(
  <>    
    {anecdotes
      .sort((a,b) => b.votes-a.votes)
      .map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          vote={voteHandler}
        />
    )}
  </>
  )
}

export default AnecdoteList