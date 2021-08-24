import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

// Reducers
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogReducer'
import currentUserReducer from './reducers/currentUserReducer'
import usersReducer from './reducers/usersReducer'


const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  currentUser: currentUserReducer,
  users: usersReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk))

export default store