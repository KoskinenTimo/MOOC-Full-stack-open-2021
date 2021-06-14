import React from 'react';
import { v4 as uuidv4 } from 'uuid';


const Numbers = ({ persons,search }) => {
  
  const renderPersons = () => {
    return persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
                  .map(person => 
      <tr key={uuidv4()}>
        <td>{person.name}</td>
        <td>{person.number}</td>
      </tr>
      )
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
          {renderPersons()}
        </tbody>
      </table>
    </>
  )
}

export default Numbers;