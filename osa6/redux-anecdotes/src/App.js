import React from 'react'

// Components
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AcecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'


const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App