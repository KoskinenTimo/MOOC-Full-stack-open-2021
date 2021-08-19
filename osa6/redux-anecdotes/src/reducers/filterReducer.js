const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.content
    default:
      return state     
  }
}

export const setFilter = (input) => {
  return {
    type: 'FILTER',
    content: input
  }
}

export default filterReducer