import React from 'react'

// Components
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AcecdoteForm'


const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App