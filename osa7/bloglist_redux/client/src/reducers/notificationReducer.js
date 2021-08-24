const notificationReducer = (state='', action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
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

let timer
export const displayNotification = (message,seconds=5) => {
  return dispatch => {
    clearTimeout(timer)
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(setNotification(''))
    },seconds*1000)
  }
}


export default notificationReducer