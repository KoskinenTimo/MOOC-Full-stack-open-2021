import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Anecdote from './Anecdote'
import { vote } from '../reducers/anecdoteReducer'
import { setText, resetText } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const voteHandler = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(vote({ id: anecdote.id }))
    dispatch(setText(`You voted '${anecdote.content}'!`))
    setTimeout(() => {
      dispatch(resetText())
    }, 2000)
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
          vote={voteHandler}
        />
    )}
  </>
  )
}

export default AnecdoteList