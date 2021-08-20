import React from 'react'


const Notification = ({ notification }) => {
  if (notification) {
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