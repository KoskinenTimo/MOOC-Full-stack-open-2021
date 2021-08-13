import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'

// Components
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedBlogListUser')) || null)
  const [notifications, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  return (
    <div>
      <Header />
      <Notification
        notifications={notifications}
        setNotification={setNotification}
      />
      <Togglable
        label={'Log In'}
        visible={user ? true : false}
      >
        <LoginForm
          user={user}
          setUser={setUser}
          setNotification={setNotification}
        />
      </Togglable>
      <Togglable label={'Create A Blog'}>
        <BlogForm
          user={user}
          setNotification={setNotification}
          setBlogs={setBlogs}
        />
      </Togglable>
      <BlogList
        blogs={blogs}
        user={user}
        setBlogs={setBlogs}
        setNotification={setNotification}
      />
    </div>
  )
}

export default App