const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_ANECDOTES':
      return action.content
    default:
      return state     
  }
}

export const setFilter = (input) => {
  return {
    type: 'FILTER_ANECDOTES',
    content: input
  }
}

export default filterReducer