import loginService from '../services/login'
import { displayNotification } from './notificationReducer'

const currentUserReducer = (state=null,action) => {
  switch (action.type) {
  case 'ADD_USER':
    return action.data
  case 'GET_USER':
    return JSON.parse(window.localStorage.getItem('loggedBlogListUser')) || null
  case 'REMOVE_USER':
    return null
  default:
    return state
  }
}

export const addUser = (credentials) => {
  return async dispatch => {
    const res = await loginService.login(credentials)
    if (res.error) {
      dispatch(displayNotification({ errors: [res.error] },6))
      return false
    } else {
      dispatch({
        type: 'ADD_USER',
        data: res
      })
      dispatch(displayNotification({ messages: [`${credentials.username} logged in`] },5))
      window.localStorage.setItem('loggedBlogListUser', JSON.stringify(res))
      return true
    }
  }
}

export const getUser = () => {
  return {
    type: 'GET_USER'
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER'
  }
}

export default currentUserReducer