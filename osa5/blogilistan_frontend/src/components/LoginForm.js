import React, { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'


const LoginForm = ({
  user,
  setUser,
  setNotification,
  toggleVisibility
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUserNameInput = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async(e) => {
    e.preventDefault()
    const res = await loginService.login({ username: username, password: password })
    if (res.error) {
      setNotification({ errors: [res.error] })
    } else {
      setNotification({ responses: ['Login Succesful'] })
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(res))
      setUser(res)
      setUsername('')
      setPassword('')
    }
  }

  const handleLogOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogListUser')
  }

  if (user) {
    return (
      <>
        <p>
          {user.name + ' logged in '}
          <button onClick={handleLogOut}>Log out</button>
        </p>

      </>
    )
  } else {
    return (
      <>
        <form onSubmit={handleLogin}>
          <div>Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUserNameInput}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordInput}
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        <button onClick={toggleVisibility}>Cancel</button>
      </>
    )
  }
}

LoginForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  toggleVisibility: PropTypes.func
}

export default LoginForm