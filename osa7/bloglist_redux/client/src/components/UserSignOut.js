import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { removeUser } from '../reducers/currentUserReducer'
import { displayNotification } from '../reducers/notificationReducer'


const UserSignOut = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(displayNotification({ messages: ['You logged out'] },5))
    dispatch(removeUser())
    window.localStorage.removeItem('loggedBlogListUser')
  })

  return (
    <Redirect to="/" />
  )
}

export default UserSignOut