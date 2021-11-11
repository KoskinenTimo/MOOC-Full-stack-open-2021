import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  ADD_BOOK
} from '../queries'
import { Redirect } from 'react-router-dom'


const NewBook = ({
  setNotification,
  user,
  updateCacheWith
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook, {data,error} ] = useMutation(ADD_BOOK, {
    errorPolicy: 'all',
    variables: {
      title,
      author,
      published,
      genres
    },
    onError: (err) => console.log(err),
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    },
  })

  useEffect(() => {
    if (data) {
      setNotification({ message:"A book added", type:"normal"})
    }
    if (error) {
      setNotification({ message:error.message, type:"error"})
    }
  }, [data,error]) // eslint-disable-line
  
  const submit = async(event) => {
    event.preventDefault()
    const result = await createBook()     
    if (result.data) {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }

  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!user) {
    return <Redirect to="/" />
  }
  return (
    <div className="card">
      <h2>Add Book</h2>
      <form onSubmit={submit}>      
        <label htmlFor="title">Title</label>
        <input
          value={title}
          id="title"
          type="text"
          onChange={({ target }) => setTitle(target.value)}
        />        
        <label htmlFor="author">Author</label>
        <input
          value={author}
          type="text"
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />     
        <label htmlFor="published">Published</label>
        <input            
          value={published}
          id="published"
          type='number'
          onChange={({ target }) => setPublished(Number(target.value))}
        />        
        <div>
        <label htmlFor="genre">Genre</label>
          <input          
            value={genre}
            id="genre"
            type="text"
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={() => addGenre()} type="button">add genre</button>
        </div>
        <label>
          genres: {genres.join(' ')}
        </label>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
