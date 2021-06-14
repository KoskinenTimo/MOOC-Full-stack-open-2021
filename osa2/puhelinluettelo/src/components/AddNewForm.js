import React from 'react';


const AddNewForm = ({ newName,newNumber,handleInputChange,handleAddPerson }) => {
  return (
    <>
      <h2>Add new</h2>
      <form>
        <div>
          name: <input name="name" value={newName} onChange={handleInputChange} />          
        </div>
        <div>
          number: <input name="number" value={newNumber} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddPerson}>add</button>
        </div>
      </form> 
    </>
  )
}

export default AddNewForm;