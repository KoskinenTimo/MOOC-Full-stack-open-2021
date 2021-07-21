import React from 'react';

// Data service
import personsService from '../services/persons';


const Numbers = ({ persons,search,setpersons,setActionCompleted,actionCompleted }) => {

  const renderpersons = () => {
      return persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
      .map(person => 
        <tr key={person.id}>
          <td>{person.name}</td>
          <td>{person.number}</td>
          <td><button onClick={() => deletePerson(person)}>Delete</button></td>
        </tr>
      )
  }

  const deletePerson = (deletedPerson) => {
    if (window.confirm(`Delete ${deletedPerson.name}?`)) {
      personsService
        .destroy(deletedPerson.id)
        .then(res => {
          if (res === 204) {
            setpersons(persons.filter(person => person.id !== deletedPerson.id))
            setActionCompleted({
              message:`${deletedPerson.name} deleted.`,
              type:"valid"
            })
            setTimeout(() => {
              setActionCompleted(null);
            },4000)
          } else if (res === 404) {
            setActionCompleted({
              message:`${deletedPerson.name} has been deleted already.`,
              type:"error"
            })
            setTimeout(() => {
              setActionCompleted(null);
            },4000)
          }
        })
    }
  }

  return (
    <>
      <h2>Numbers</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
          </tr>
        </thead>
        <tbody>
          {renderpersons()}
        </tbody>
      </table>
    </>
  )
}

export default Numbers;