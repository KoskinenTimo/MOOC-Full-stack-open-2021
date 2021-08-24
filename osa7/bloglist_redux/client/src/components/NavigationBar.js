import React from 'react'
import { Link } from 'react-router-dom'


const NavigationBar = () => {
  return (
    <div className="wrap">
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/users" className="nav-link">Users</Link>
      </nav>
    </div>
  )
}

export default NavigationBar