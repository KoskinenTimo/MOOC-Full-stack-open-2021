import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { GENRE_BOOKS } from '../queries'


const Recommendations = ({ user }) => {
  const [ books, setBooks ] = useState([])
  const [ getBooks, booksResult ] = useLazyQuery(GENRE_BOOKS, {
    onError: (error) => console.log(error),
    variables: {
      genre: user ? user.favoriteGenre : null
    }
  })

  useEffect(() => {
    if (user && user.favoriteGenre) {
      getBooks()
    }  
  }, [user]) // eslint-disable-line

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult])

  if (!user) {
    return <Redirect to="/" />
  }
  if (booksResult.loading) {
    return (
      <div className="card">
        <h2>Recommendations</h2>
        <h2>Loading...</h2>
      </div>
    )
  }
  if (books.length) {
    return (
      <div className="card">
        <h2>Recommendations</h2>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    )
  } else {
    return (
      <div className="card">
        <h2>Recommendations</h2>
        <h2>Sorry, could not find any recommendations for your favorite genre...</h2>
      </div>
    )
  }
}

export default Recommendations