import React from 'react';

const InfoBanner = ({ actionCompleted }) => {
  if (actionCompleted) {
    return (
      <div className={actionCompleted.type}>
        <h3>{actionCompleted.message}</h3>
      </div>
    )
  } else {
    return null;
  }
}

export default InfoBanner;