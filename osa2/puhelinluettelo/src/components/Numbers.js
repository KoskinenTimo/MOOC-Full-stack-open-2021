import React from 'react';

// Data service
import peopleService from '../services/people';


const Numbers = ({ people,search,setPeople }) => {

  const renderPeople = () => {
      return people.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
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
      peopleService
        .destroy(deletedPerson.id)
        .then(res => {
          if (res === 200) {
            setPeople(people.filter(person => person.id !== deletedPerson.id))
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
          {renderPeople()}
        </tbody>
      </table>
    </>
  )
}

export default Numbers;