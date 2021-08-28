import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  EDIT_BIRTH
} from './queries'


const Authors = (props) => {
  if (!props.show) {
    return null
  }
    
  const result = useQuery(ALL_AUTHORS)
  const [ authors, setAuthors ] = useState([])
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const [ editAuthor ] = useMutation(EDIT_BIRTH, {
    refetchQueries: [
      { query:ALL_BOOKS },
      { query:ALL_AUTHORS }
    ],
    onError: (err) => console.log(err)
  })

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
      
    }
  }, [result])

  useEffect(() => {
    if (authors.length) {
      setName(authors[0].name)
    }
  }, [authors])
  const updateAuthor = (e) => {
    e.preventDefault()
    editAuthor({ variables: { name, SetBornTo:born } })
    setName(authors[0].name)
    setBorn('')
  }

  if(result.loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h2>authors</h2>
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
      <h2>set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          {authors.map((a,i) => 
            <option value={a.name} key={i}>{a.name}</option>)}
        </select>
        <div>
          born:
          <input type="number" onChange={(e) => setBorn(Number(e.target.value))} value={born}/>
        </div>        
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors