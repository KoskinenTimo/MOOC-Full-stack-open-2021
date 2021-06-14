import React from 'react';


const PersonSearch = ({ searchName,handleInputChange }) => {
  return (
    <>
      <h2>Phonebook</h2>
      <div>
        search: <input name="search" value={searchName} onChange={handleInputChange} />
      </div>
    </>
  )
}

export default PersonSearch;