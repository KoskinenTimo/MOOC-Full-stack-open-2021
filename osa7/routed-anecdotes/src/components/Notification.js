import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.content)
  if (notification !== '') {
    return (
      <div>
        <h2>
          {notification}
        </h2>
      </div>
    )
  } else {
    return null
  }
}

export default Notification