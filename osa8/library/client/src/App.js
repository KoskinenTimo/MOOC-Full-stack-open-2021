import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

// Components
import Authors from './components/Authors'
import Books from './components/Books'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import Recommendations from './components/Recommendations'
import { GET_ME } from './queries'


const App = () => {
  const [ notification, setNotification ] = useState(null)
  const [ token, setToken ] = useState(localStorage.getItem('library-user-token') || null)
  const [ user, setUser ] = useState(null)

  const [ getUser, userResult ] = useLazyQuery(GET_ME, {
    onError: (error) => console.log(error)
  })

  useEffect(() => {
    if (token) {
      getUser()
    }
  }, [token,getUser])

  useEffect(() => {
    if (userResult && userResult.data) {
      setUser(userResult.data.me)
    }
  }, [userResult])
  return (
    <div className="wrap">
      <Header 
        token={token}
        setToken={setToken}
        setNotification={setNotification}
        setUser={setUser}
        user={user}
      />
      <Notification 
        setNotification={setNotification}
        notification={notification}        
      />
      <Switch>
        <Route exact path="/">
          <Authors 
            token={token}
            setNotification={setNotification}
          />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/addbook">
          <NewBook 
            setNotification={setNotification}
            user={user}
          />         
        </Route>
        <Route path="/login">
          <LoginForm 
            setNotification={setNotification}
            token={token}
            setToken={setToken}
            user={user}
            setUser={setUser}
          />
        </Route>
        <Route path="/recommendations">
          <Recommendations
            user={user}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App