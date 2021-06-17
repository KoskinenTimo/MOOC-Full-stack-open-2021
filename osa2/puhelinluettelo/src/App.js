import React, { useState,useEffect } from 'react'

// Data service
import peopleService from './services/people';

// Components
import Numbers from './components/Numbers';
import AddNewForm from './components/AddNewForm';
import PersonSearch from './components/PersonSearch';
import InfoBanner from './components/InfoBanner';


const App = () => {
  const [ people, setPeople] = useState([]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');
  const [ actionCompleted, setActionCompleted ] = useState(null);

  useEffect(() => {
    peopleService
      .getAll()
      .then(res => {
        setPeople(res)
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
        people={people}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
        setPeople={setPeople}
        setNewNumber={setNewNumber}
        setNewName={setNewName}
        setActionCompleted={setActionCompleted}
      />     
      <Numbers 
        people={people} 
        search={searchName}
        setPeople={setPeople}   
        setActionCompleted={setActionCompleted}        
      />
    </div>
  )

}

export default App