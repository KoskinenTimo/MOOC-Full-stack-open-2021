import { useApolloClient } from '@apollo/client'
import React from 'react'
import { Link } from 'react-router-dom'


const Header = ({
  token,
  setToken,
  setNotification,
  setUser,
  user
}) => {  
  const client = useApolloClient()
  
  const handleLogOut = () => {
    setToken(null)
    setUser(null)
    client.clearStore()
    localStorage.clear()
    setNotification({ message:"You have logged out", type:"normal"})
  }


  return (
    <header>
    <div className="header--flex">
      <h1>Library app</h1>
      {token
        ? <p>
            Welcome {user && user.username ? user.username : ''}!
            <button onClick={handleLogOut}>Log out</button>
          </p>
        : <Link to="/login">Login</Link>
      }      
    </div>      
    <ul className="header--nav">
      <li><Link to="/">authors</Link></li>
      <li><Link to="/books">books</Link></li>
      {user
        ? <>
            <li><Link to="/addbook">add book</Link></li>
            <li><Link to="/recommendations">recommendations</Link></li>
          </>        
        : null
      }
    </ul>
    </header>
  )
}

export default Header