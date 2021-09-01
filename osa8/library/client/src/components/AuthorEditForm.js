import { useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  EDIT_BIRTH
} from '../queries'

const AuthorEditForm = ({
  authors,
  setNotification
}) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')

  const [ editAuthor, { data,error } ] = useMutation(EDIT_BIRTH, {
    errorPolicy: 'all',
    refetchQueries: [
      { query:ALL_BOOKS },
      { query:ALL_AUTHORS }
    ],
    variables: {
      name, SetBornTo:born
    },
    onError: (err) => console.log(err)
  })

  useEffect(() => {
    if (authors.length) {
      setName(authors[0].name)
    }
  }, [authors])

  useEffect(() => {
    if (data && data.editAuthor) {
      setNotification({ message:"Author 'born' field updated", type:"normal" })
    }
    if (error) {
      setNotification({ message:error.message, type:"error" })
    }
  }, [data,error]) // eslint-disable-line

  const updateAuthor = async(e) => {
    e.preventDefault()
    const result = await editAuthor()
    if (result.data && result.data.editAuthor) {
      setName(authors[0].name)
      setBorn('')
    }
  }

  return (
    <>
      <h2>Set Birthyear</h2>
      <form onSubmit={updateAuthor}>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          {authors.map((a,i) => 
            <option value={a.name} key={i}>{a.name}</option>)}
        </select>
        <label htmlFor="born">Born:</label>
        <input id="born" type="number" onChange={(e) => setBorn(Number(e.target.value))} value={born}/>
        <button type="submit">Update Author</button>
      </form>
    </>
  )
}

export default AuthorEditForm