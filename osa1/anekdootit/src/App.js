import React, { useEffect, useState } from 'react'

const Button = ({ text, clickAction }) => {
  return (
    <button onClick={clickAction}>{text}</button>
  )
}

const DisplayAnecdote = ({ anecdote, votes, text }) => {
  return (
    <>
      <h2>{text}</h2>
      <p>{anecdote}</p>    
      <p>has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(0);

  const handleNextAnecdoteClick = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  const handleVoteClick = () => {    
    const copy = [...votes]
    copy[selected] += 1;
    setVotes(copy);    
  }

  useEffect(() => {
    const indexOfMostVoted = votes.reduce((mostVotesIndex, currentValue, currentIndex, array) => {
      if (currentValue > array[mostVotesIndex]) {
        return currentIndex;
      } else {
        return mostVotesIndex;
      }
    }, 0);
    setMostVotes(indexOfMostVoted);
  }, [votes]);

  return (
    <div>
      <DisplayAnecdote 
        anecdote={anecdotes[selected]} 
        votes={votes[selected]} 
        text="Anecdote of the day"  
        />
      <Button text="vote" clickAction={handleVoteClick} />  
      <Button text="next anecdote" clickAction={handleNextAnecdoteClick} />
      <DisplayAnecdote 
        anecdote={anecdotes[mostVotes]} 
        votes={votes[mostVotes]} 
        text="Anecdote with the most votes"
        />
    </div>
  )
}

export default App