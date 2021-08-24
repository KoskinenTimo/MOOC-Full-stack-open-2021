import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


/**
 * A header component with login
 */
const Header = () => {
  const currentUser = useSelector(state => state.currentUser)

  if (currentUser) {
    return (
      <header >
        <div className="wrap header--flex">
          <h1 className="site-title">Blogs</h1>
          <div>
            <ul>
              <li>{`Welcome ${currentUser.name}!`}</li>
              <li><Link to="/signout">Sign out</Link></li>
            </ul>
          </div>
        </div>
      </header>
    )
  } else {
    return (
      <header >
        <div className="wrap header--flex">
          <h1 className="site-title">Blogs</h1>
          <div>
            <ul>
              <li><Link to="/signin">Sign in</Link></li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}

export default Header