import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'

// Components
import Header from './components/Header'
import Blog from './components/Blog'
import FormLogin from './components/FormLogin'
import Notification from './components/Notification'
import FormBlog from './components/FormBlog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('loggedBlogListUser')) || null);
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
      <FormLogin 
        user={user}  
        setUser={setUser}
        setNotification={setNotification}   
      />
      <FormBlog 
        user={user}
        setNotification={setNotification}
        setBlogs={setBlogs}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App