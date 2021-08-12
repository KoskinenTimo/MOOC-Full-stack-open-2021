import React, { useState } from 'react'
import blogService from '../services/blogs'


const FormBlog = ({ user, setNotification, setBlogs }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleInput = (e) => {
    setTitle(e.target.value)
  }

  const handleAuthorInput = (e) => {
    setAuthor(e.target.value)
  }

  const handleUrlInput = (e) => {
    setUrl(e.target.value)
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }    
    const res = await blogService.postOne(newBlog, user.token)
    if (res.error) {
      setNotification({ errors: [res.error] })
    } else {
      setNotification({ responses: [`A blog with a title ${newBlog.title} was created`]})
      setTitle('')
      setAuthor('')
      setUrl('')
      blogService
        .getAll()
        .then(blogs => setBlogs(blogs))
    }
  }

  if (user) {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            title:
            <input 
              type="text" 
              name="title" 
              value={title} 
              onChange={handleTitleInput}
            />            
          </div>
          <div>
            author:
            <input 
              type="text" 
              name="author" 
              value={author} 
              onChange={handleAuthorInput}
            />   
          </div>
          <div>
            url:
            <input 
              type="text" 
              name="url" 
              value={url} 
              onChange={handleUrlInput}
            />   
          </div>
          <button type="submit">Create</button>          
        </form>
      </>
    )
  } else {
    return null
  }  
}

export default FormBlog