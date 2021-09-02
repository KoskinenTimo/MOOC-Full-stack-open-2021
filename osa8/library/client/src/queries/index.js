import { gql } from '@apollo/client'


const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author {
      name
    }
    genres,
    published,
    title
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks{
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`
export const GENRE_BOOKS = gql`
  query allBooks($genre: String){
    allBooks (genre: $genre){
      author {
        name
      }
      genres,
      published,
      title
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!,
    $author: String!,
    $published: Int!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      author {
        name
      }
      published,
      genres
    }
  }
`

export const EDIT_BIRTH = gql`
  mutation editBirth($name: String!, $SetBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $SetBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const GET_ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`