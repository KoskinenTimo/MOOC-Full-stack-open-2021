import React, { useEffect } from 'react'


const Notification = ({ notifications, setNotification }) => {

  const resetNotifications = () => {
    const timer = setTimeout(() => {
      setNotification(null)
    }, 5000)
    return timer
  }
  
  useEffect(() => {
    const timer = resetNotifications()
    return () => clearTimeout(timer);
  });
  
  if (notifications &&  notifications.errors) {
    return (
      <div>
        {notifications.errors.map((error,index) => 
          <h3 key={index} className="error">{error}</h3>)}
      </div>
    )
  } else if (notifications && notifications.responses){
    return (
      <div>
        {notifications.responses.map((response,index) => 
          <h3 key={index} className="response">{response}</h3>)}
      </div>
    )
  } else {
    return null
  }

}

export default Notification