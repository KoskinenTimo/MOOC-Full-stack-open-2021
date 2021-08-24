/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

// Hooks
import { useField } from '../hooks'
// Reducers
import { displayNotification } from '../reducers/notificationReducer'
import { addUser, removeUser } from '../reducers/currentUserReducer'
import { useSelector } from 'react-redux'


const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text','username')
  const password = useField('password','password')
  const noResetProperty = ({ reset, ...rest }) => rest
  const resetFields = () => {
    username.reset()
    password.reset()
  }

  const handleLogin = async(e) => {
    e.preventDefault()
    const res = await dispatch(addUser({ username: username.value, password: password.value }))
    if (res) {
      resetFields()
    }
  }

  const handleLogOut = () => {
    dispatch(displayNotification({ messages: ['You logged out'] },5))
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogListUser')
  }

  return (
    <div className="form--centered">
      <h1>Sign in</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username:</label>
        <input {...noResetProperty(username)}/>
        <label htmlFor='password'>Password:</label>
        <input {...noResetProperty(password)}/>
        <button type='submit'>Log in</button>
        <button>Cancel</button>
      </form>

    </div>
  )
}

LoginForm.propTypes = {
  toggleVisibility: PropTypes.func
}

export default LoginForm