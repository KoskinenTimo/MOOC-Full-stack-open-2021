import {
  useApolloClient,
  useLazyQuery,
  useQuery,
  useSubscription
} from '@apollo/client'
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

// Queries
import {
  GET_ME,
  BOOK_ADDED,
  ALL_BOOKS
} from './queries'


const App = () => {
  const [ notification, setNotification ] = useState(null)
  const [ token, setToken ] = useState(localStorage.getItem('library-user-token') || null)
  const [ user, setUser ] = useState(null)
  const booksResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  const [ getUser, userResult ] = useLazyQuery(GET_ME, {
    onError: (error) => console.log(error)
  })  

  
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      setNotification({
        message:`${addedBook.title} added`,
        type:"normal" 
      })
      updateCacheWith(addedBook)
    }
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

  if (booksResult.loading)  {
    return <div className="wrap">loading...</div>
  }
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
          <Books 
            booksResult={booksResult.data.allBooks}
          />
        </Route>
        <Route path="/addbook">
          <NewBook
            updateCacheWith={updateCacheWith}
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