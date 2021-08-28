import { gql } from '@apollo/client'


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
  query {
    allBooks {
      author,
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
    author,
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