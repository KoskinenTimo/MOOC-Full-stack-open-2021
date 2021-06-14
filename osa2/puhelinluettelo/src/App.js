import React, { useState } from 'react'

// Components
import Numbers from './components/Numbers';
import AddNewForm from './components/AddNewForm';
import PersonSearch from './components/PersonSearch';


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');

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