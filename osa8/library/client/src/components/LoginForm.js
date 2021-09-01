import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { LOGIN } from '../queries'


const LoginForm = ({
  setNotification,
  setToken,
  user
}) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const [ login, { data,error} ] = useMutation(LOGIN, {
    errorPolicy: 'all',
    variables: {
      username,
      password
    }    
  })

  useEffect(() => {
    if (data && data.login) {
      setNotification({ message:"You have logged in", type: "normal" })
      setToken(data.login.value)
      localStorage.setItem('library-user-token', data.login.value)
    }
    if (error) {
      setNotification({ message:error.message, type: "error" })
    }
  }, [data,error]) // eslint-disable-line

  const onSubmit = async(e) => {
    e.preventDefault()
    await login()
  }

  if (user) {
    return <Redirect to="/" />
  }
  
  return (
    <div className="card">
      <h2>Login Details</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input   
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default LoginForm