import noteService from '../services/anecdotes'


const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE_ANECDOTE':
      const { id } = action.data   
      console.log(action.data); 
      return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }  
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    anecdote.votes += 1
    const updatedAnecdote = await noteService.updateOne(anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: updatedAnecdote
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await noteService.createOne(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await noteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }

}

export default anecdoteReducer