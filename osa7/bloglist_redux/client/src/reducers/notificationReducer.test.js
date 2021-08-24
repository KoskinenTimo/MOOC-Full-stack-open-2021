import deepFreeze from 'deep-freeze'
import notificationReducer, {
  setNotification
} from './notificationReducer'


describe('notificationReducer', () => {
  test('notificationReducer return corrent data', () => {
    const state = ''
    deepFreeze(state)
    const action = {
      type: 'SET_NOTIFICATION',
      data: {
        content: 'new notification'
      }
    }
    const newState = notificationReducer(state,action)
    expect(newState.content).toEqual('new notification')
  })

  test('setNotification set correct value', () => {
    const state = ''
    deepFreeze(state)
    const newState = notificationReducer(state, setNotification('new notification'))
    expect(newState.content).toEqual('new notification')
  })
})