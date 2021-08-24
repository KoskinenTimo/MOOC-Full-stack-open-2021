import notificationReducer, { 
    setNotification, 
    resetNotification 
  } from './notificationReducer'
import deepFreeze from 'deep-freeze'


describe('notificationReducer', () => {
  test('notificationReducer returns new notification content', () => {
    const action = {
      type: 'SET_NOTIFICATION',
      data: {
        content: 'new notification'
      }
    }
    const state = ''
    deepFreeze(state)
    const newState = notificationReducer(state,action)
    expect(newState.content).toEqual('new notification')
  })

  test('setNotification return the correct notification from notificationReducer', () => {
    const state = ''
    deepFreeze(state)
    const newState = notificationReducer(state, setNotification('new notification'))
    expect(newState.content).toEqual('new notification')
  })

  test('resetNotification return the correct notification from notificationReducer', () => {
    const state = ''
    deepFreeze(state)
    const newState = notificationReducer(state, setNotification(''))
    expect(newState.content).toEqual('')
  })
})