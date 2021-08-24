import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// Components
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import UserList from './components/UserList'
import UserDetails from './components/UserDetails'


// Reducers
import { getAllBlogs } from './reducers/blogReducer'
import { getUser } from './reducers/currentUserReducer'
import { getAllUsers } from './reducers/usersReducer'
import NavigationBar from './components/NavigationBar'
import Blog from './components/Blog'
import UserSignOut from './components/UserSignOut'
import NotFound from './components/NotFound'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.currentUser)

  useEffect(() => {
    dispatch(getAllBlogs())
    dispatch(getUser())
    dispatch(getAllUsers())
  }, [])

  return (
    <div>
      <Header />
      <NavigationBar />
      <Notification />

      <Switch>
        <Route exact path="/">
          <Togglable label={'Create A Blog'}>
            <BlogForm />
          </Togglable>
          <BlogList />
        </Route>
        <Route path="/signin">
          {
            user
              ? <Redirect to="/" />
              : <LoginForm />
          }
        </Route>
        <Route exact path="/users">
          <UserList />
        </Route>
        <Route path="/users/:id">
          <UserDetails />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/signout">
          <UserSignOut />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>

    </div>
  )
}

export default App