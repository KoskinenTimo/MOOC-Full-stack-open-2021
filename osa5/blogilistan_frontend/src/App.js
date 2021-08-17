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

  const createBlog = async(newBlog) => {
    const res = await blogService.create(newBlog, user.token)
    if (res.error) {
      setNotification({ errors: [res.error] })
      return false
    } else {
      setNotification({ responses: [`A blog with a title ${newBlog.title} was created`] })
      setBlogs(blogs.concat(res))
      return true
    }
  }

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
          createBlog={createBlog}
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