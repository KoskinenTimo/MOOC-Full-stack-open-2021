import React, { useState,useEffect } from 'react'
import axios from 'axios';

// Components
import Numbers from './components/Numbers';
import AddNewForm from './components/AddNewForm';
import PersonSearch from './components/PersonSearch';


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        const { data }  = response;
        setPersons(data);        
      })
      .catch(err => console.error(err));
  }, [])
  
  const handleAddPerson = (e) => {
    e.preventDefault();
    if (persons.filter(person => person.name === newName).length) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(
        { 
          name: newName,
          number: newNumber
        }))
      setNewName('');
      setNewNumber('');
    }
  }

  const handleInputChange = ({ target }) => {
    if(target.name === "name") {
      setNewName(target.value)
    } else if (target.name === "number") {
      setNewNumber(target.value)
    } else if (target.name === "search") {
      setSearchName(target.value);
    }
  }

  return (
    <div>
      <PersonSearch 
        searchName={searchName}
        handleInputChange={handleInputChange}
      />
      <AddNewForm 
        newName={newName}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
        handleAddPerson={handleAddPerson}
      />     
      <Numbers persons={persons} search={searchName} />
    </div>
  )

}

export default App