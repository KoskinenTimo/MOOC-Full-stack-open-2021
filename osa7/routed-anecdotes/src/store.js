import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

// Reducers
import notificationReducer from './components/reducers/notificationReducer'


const store = createStore(
  notificationReducer,
  applyMiddleware(thunk)
)

export default store