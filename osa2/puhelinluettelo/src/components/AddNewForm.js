import React from 'react';

// Data service
import personsService from '../services/persons';


const AddNewForm = ({ newName,newNumber,handleInputChange,persons,setpersons,setNewName,setNewNumber,setActionCompleted }) => {

  const handleAddPerson = (e) => {
    e.preventDefault();
    const oldPerson = persons.filter(person => person.name === newName)[0];
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (oldPerson) {
      if (window.confirm(`${oldPerson.name} already exists. Do you want to replace the old number?`)) {
        handleUpdate(oldPerson,newPerson);
      }    
    } else {        
      handleCreate(newPerson);
    }
  }

  const handleUpdate = (oldPerson,newPerson) => {
    personsService
    .update(oldPerson.id,newPerson)
    .then(res => {
      if (res) {
        setpersons(persons.map(person => person.id !== res.id ? person : res))
        setNewName('');
        setNewNumber('');            
        setActionCompleted({
          message:`${newPerson.name} updated.`,
          type:"valid"
        })
        setTimeout(() => {
          setActionCompleted(null);
        },4000)
      }
    })
    .catch(err => {      
      setActionCompleted({
        message:err.response.data.message,
        type:'error'
      });
      setTimeout(() => {
        setActionCompleted(null);
      },4000)
    });
  }

  const handleCreate = (newPerson) => {
    personsService
    .create(newPerson)
    .then(person => {
      if(person) {
        setpersons(persons.concat(person))
        setNewName('');
        setNewNumber('');
        setActionCompleted({
          message:`${newPerson.name} added.`,
          type:"valid"
        })
        setTimeout(() => {
          setActionCompleted(null);
        },4000)
      }
    })
    .catch(err => {      
      setActionCompleted({
        message:err.response.data.message,
        type:'error'
      });
      setTimeout(() => {
        setActionCompleted(null);
      },4000)
    });
  }

  return (
    <>
      <h2>Add new</h2>
      <form>
        <div>
          Name: <input name="name" value={newName} onChange={handleInputChange} />          
        </div>
        <div>
          Number: <input name="number" value={newNumber} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddPerson}>Add</button>
        </div>
      </form> 
    </>
  )
}

export default AddNewForm;