import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const voteHandler = (anecdote) => {
    console.log('VOTE_ANECDOTE', anecdote.id)    
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'!`,2))    
  }

  return(
  <>    
    {anecdotes
      .filter(a => a.content.includes(filter))
      .sort((a,b) => b.votes-a.votes)
      .map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          voteHandler={voteHandler}
        />
    )}
  </>
  )
}

export default AnecdoteList