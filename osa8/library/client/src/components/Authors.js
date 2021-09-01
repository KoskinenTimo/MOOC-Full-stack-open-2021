import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {
  ALL_AUTHORS
} from '../queries'
import AuthorEditForm from './AuthorEditForm'


const Authors = ({
  token,
  setNotification
}) => {    
  const result = useQuery(ALL_AUTHORS)
  const [ authors, setAuthors ] = useState([])

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)      
    }
  }, [result])

  if(result.loading) {
    return <div className="card">Loading...</div>
  }
  return (
    <div className="card">
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        token
          ? <AuthorEditForm 
              authors={authors} 
              setNotification={setNotification}            
            />
          : null
      }
    </div>
  )
}

export default Authors