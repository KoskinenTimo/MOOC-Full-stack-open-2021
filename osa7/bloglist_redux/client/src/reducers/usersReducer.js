import userService from '../services/users'
import { displayNotification } from './notificationReducer'


const usersReducer = (state=[],action) => {
  switch (action.type) {
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    const res = await userService.getAll()
    if (res.error) {
      dispatch(displayNotification({ errors: [res.error] }),5)
    } else {
      dispatch({
        type: 'GET_USERS',
        data: res
      })
    }
  }
}

export default usersReducer