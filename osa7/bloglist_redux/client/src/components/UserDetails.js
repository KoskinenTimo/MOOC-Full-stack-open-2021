import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const UserDetails = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const [ user, setUser ] = useState('')

  useEffect(() => {
    if (users.length && id) {
      const search = users.find(user => user.id === id)
      setUser(search)
    }
  })

  const renderTitles = () => {
    return user.blogs.map(blog =>
      <li key={blog.id}>
        <a href={blog.url}>{blog.title}</a>
      </li>)
  }

  if (user) {
    return (
      <div className="wrap">
        <h1>{user.name}</h1>
        <h3>Added blogs</h3>
        <ul className="user--bloglist">{renderTitles()}</ul>
      </div>
    )
  } else if (user === undefined){
    return (
      <div className="wrap">
        <h1>Not found!</h1>
      </div>
    )
  } else {
    return null
  }
}


export default UserDetails