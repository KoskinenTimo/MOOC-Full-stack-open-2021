import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notifications = useSelector(state => state.notification.content)
  if (notifications &&  notifications.errors) {
    return (
      <div className="wrap">
        {notifications.errors.map((error,index) =>
          <h3 key={index} className="error">{error}</h3>)}
      </div>
    )
  } else if (notifications && notifications.messages){
    return (
      <div className="wrap">
        {notifications.messages.map((response,index) =>
          <h3 key={index} className="response">{response}</h3>)}
      </div>
    )
  } else {
    return null
  }

}

export default Notification