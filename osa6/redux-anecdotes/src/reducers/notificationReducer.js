const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'RESET_NOTIFICATION':
      return null
    default:
      return state
     
  }
}


let timer
export const setNotification = (text,time=2) => {
  return dispatch => {
    clearTimeout(timer)    
    dispatch({
      type: 'SET_NOTIFICATION',
      content: text
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    },time*1000)
  }
}

export default notificationReducer