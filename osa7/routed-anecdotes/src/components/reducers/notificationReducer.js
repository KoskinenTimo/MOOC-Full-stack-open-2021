// Timer for 'timeout' function
let timer

const notificationReducer = (state='', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      content: notification
    }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export const displayNotification = (notification,seconds=3) => {
  return dispatch => {
    clearTimeout(timer)
    dispatch(setNotification(notification))
    timer = setTimeout(() => {
      dispatch(resetNotification())
    },seconds*1000)
  }
}

export default notificationReducer