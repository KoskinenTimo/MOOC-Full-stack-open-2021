import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {
  ALL_GENRES,
  GENRE_BOOKS
} from '../queries'


const Books = ({ booksResult }) => {
  const [ genre, setGenre ] = useState('')
  const [ books, setBooks ] = useState([])
  const [ genres, setGenres ] = useState([])
  
  const genresResult = useQuery(ALL_GENRES)
  const [ getBooks, filteredBooksResult ] = useLazyQuery(GENRE_BOOKS, {
    variables: {
      genre: genre
    },
    onError: (error) => console.log(error.message)
  })

  useEffect(() => {
    setGenre('All genres')
  }, [])

  useEffect(() => {
    if (booksResult) {
      setBooks(booksResult)
    }
  }, [booksResult])

  useEffect(() => {
    if (genresResult.data) {
      const newGenreList = []
      genresResult.data.allBooks.forEach(genreList => {
        genreList.genres.forEach(genre => {
          if (!newGenreList.includes(genre)) {
            newGenreList.push(genre)
          }
        })
      })
      setGenres(newGenreList)
    }
  }, [genresResult])

  useEffect(() => {
    console.log(genre)
    if (genre==="All genres") {
      getBooks({ variables: { genre:null } })
    } else {
      getBooks({ variables: { genre:genre } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre])

  useEffect(() => {
    if (filteredBooksResult.data) {
      setBooks(filteredBooksResult.data.allBooks)
    }
  }, [filteredBooksResult])
  if (booksResult.loading) {
    return <div className="card">Loading...</div>
  }
  return (
    <div className="card">
      <h2>Books</h2>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="All genres">All genres</option>
        {
          genres.map((genre, index) => 
            <option value={genre} key={index}>{genre}</option>)
        }
      </select>
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
}

export default Books