import React, { useState,useEffect } from 'react'

// Data service
import peopleService from './services/people';

// Components
import Numbers from './components/Numbers';
import AddNewForm from './components/AddNewForm';
import PersonSearch from './components/PersonSearch';


const App = () => {
  const [ people, setPeople] = useState([]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');

  useEffect(() => {
    peopleService
      .getAll()
      .then(res => {
        setPeople(res)
      })
  }, [])
  
  const handleAddPerson = (e) => {
    e.preventDefault();
    const personExist = people.filter(person => person.name === newName)[0];
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (personExist) {
      if (window.confirm(`${personExist.name} already exists. Do you want to replace the old number?`)) {
        peopleService
        .update(personExist.id,newPerson)
        .then(res => {
          if (res) {
            setPeople(people.map(person => person.id !== res.id ? person : res))
            setNewName('');
            setNewNumber('');
          }
        })
      }    
    } else {        
      peopleService
        .create(newPerson)
        .then(person => {
          if(person) {
            setPeople(people.concat(person))
            setNewName('');
            setNewNumber('');
          }
        })
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
      <Numbers 
        people={people} 
        search={searchName}
        setPeople={setPeople}           
      />
    </div>
  )

}

export default App