import React, { useState,useEffect } from 'react'

// Data service
import personsService from './services/persons';

// Components
import Numbers from './components/Numbers';
import AddNewForm from './components/AddNewForm';
import PersonSearch from './components/PersonSearch';
import InfoBanner from './components/InfoBanner';


const App = () => {
  const [ persons, setpersons] = useState([]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');
  const [ actionCompleted, setActionCompleted ] = useState(null);

  useEffect(() => {
    personsService
      .getAll()
      .then(res => {
        setpersons(res)
      })
  }, [])
  
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
      <InfoBanner 
        actionCompleted={actionCompleted}
      />
      <PersonSearch 
        searchName={searchName}
        handleInputChange={handleInputChange}
      />
      <AddNewForm 
        newName={newName}
        persons={persons}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
        setpersons={setpersons}
        setNewNumber={setNewNumber}
        setNewName={setNewName}
        setActionCompleted={setActionCompleted}
        actionCompleted={actionCompleted}    
      />     
      <Numbers 
        persons={persons} 
        search={searchName}
        setpersons={setpersons}   
        setActionCompleted={setActionCompleted} 
        actionCompleted={actionCompleted}       
      />
    </div>
  )

}

export default App