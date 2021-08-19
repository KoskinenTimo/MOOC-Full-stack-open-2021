const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.content
    case 'RESET':
      return null
    default:
      return state
     
  }
}

export const setText = (content) => {
  return {
    type: 'SET',
    content
  }
}

export const resetText = () => {
  return {
    type: 'RESET'    
  }
}

export default notificationReducer