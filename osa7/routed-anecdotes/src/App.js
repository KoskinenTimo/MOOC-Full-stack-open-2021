import React, { useState } from 'react'
import {
  Redirect,
  Route, 
  Switch,
  useRouteMatch
} from "react-router-dom"

// Components
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'
import AnecdoteDetails from './components/AnecdoteDetails'
import Notification from './components/Notification'
import Header from './components/Header'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    console.log(anecdotes);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch("/anecdotes/:id")
  const anecdote = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null

  return (
    <div>
      <Header />
      <Menu />
      <Notification notification={notification}/>
      <Switch>
        <Route exact path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew 
            addNew={addNew} 
            setNotification={setNotification}
          />
        </Route>  
        <Route exact path="/anecdotes/:id">
          <AnecdoteDetails anecdote={anecdote} />
        </Route>     
        <Route>
          <Redirect to="/" />
        </Route> 
      </Switch>
      <Footer />
    </div>
  )
}

export default App;