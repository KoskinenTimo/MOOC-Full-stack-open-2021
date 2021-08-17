import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Togglable = (props) => {

  const [isVisible, setIsVisible] = useState(props.visible || false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const hideIfVisible = { display: isVisible ? 'none' : '' }
  const showIfVisible = { display: isVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideIfVisible}>
        <p>
          <button onClick={toggleVisibility}>{props.label}</button>
        </p>
      </div>
      <div style={showIfVisible}>
        {React.cloneElement(props.children, { toggleVisibility: toggleVisibility })}
      </div>
    </div>
  )
}

Togglable.propTypes = {
  children: PropTypes.object,
  visible: PropTypes.bool,
  label: PropTypes.string.isRequired
}

export default Togglable