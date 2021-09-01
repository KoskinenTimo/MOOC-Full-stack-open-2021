import React, { useEffect, useRef } from 'react'


const Notification = ({ notification, setNotification }) => {
  const timer = useRef(null);

  useEffect(() => {
    if (notification) {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setNotification(null), 5000)
    }
  }, [notification]) // eslint-disable-line

  if (notification && notification.type === "error") {
    return (
      <div className="notification notification--error">
        <p><strong>{notification.message}</strong></p>
      </div>
    )
  }
  if (notification && notification.type === "normal") {
    return (
      <div className="notification notification--normal">
        <p><strong>{notification.message}</strong></p>
      </div>
    )
  }
  return (
    <div className="notification"><p></p></div>
  )

}

export default Notification