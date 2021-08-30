const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config();
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'SEKRET_KII'

// Models
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  });


/**
 * Reset IIFE to keep DB clean
 */
(async () => {
  const authors = [
    {
      name: 'Robert Martin',
      _id: '612c06fbc2c5a32080606c20',
      born: 1952,
    },
    {
      name: 'Martin Fowler',
      _id: '612c06fbc2c5a32080606c21',
      born: 1963
    },
    {
      name: 'Fyodor Dostoevsky',
      _id: '612c06fbc2c5a32080606c22',
      born: 1821
    },
    { 
      name: 'Joshua Kerievsky',
      _id: '612c06fbc2c5a32080606c23'
    },
    { 
      name: 'Sandi Metz',
      _id: '612c06fbc2c5a32080606c24'
    },
  ]
  const books = [
    {
      title: 'Clean Code',
      published: 2008,
      author: '612c06fbc2c5a32080606c20',
      genres: ['refactoring']
    },
    {
      title: 'Agile software development',
      published: 2002,
      author: '612c06fbc2c5a32080606c20',
      genres: ['agile', 'patterns', 'design']
    },
    {
      title: 'Refactoring, edition 2',
      published: 2018,
      author: '612c06fbc2c5a32080606c21',
      genres: ['refactoring']
    },
    {
      title: 'Refactoring to patterns',
      published: 2008,
      author: '612c06fbc2c5a32080606c23',
      genres: ['refactoring', 'patterns']
    },  
    {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: '612c06fbc2c5a32080606c24',
      genres: ['refactoring', 'design']
    },
    {
      title: 'Crime and punishment',
      published: 1866,
      author: '612c06fbc2c5a32080606c22',
      genres: ['classic', 'crime']
    },
    {
      title: 'The Demon ',
      published: 1872,
      author: '612c06fbc2c5a32080606c22',
      id: "afa5de04-344d-11e9-a414-719c6709cf3e",
      genres: ['classic', 'revolution']
    },
  ]

  console.log("Resetting DB");
  await Book.deleteMany({})
  await Author.deleteMany({})
  console.log("Inserting hardcoded data into DB");
  await Book.insertMany(books)
  await Author.insertMany(authors)
})()




const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async() => (await Book.find({})).length,
    authorCount: async() => (await Author.find({})).length,
    allBooks: async(root, args) => {
      if (args.author) {
        const id = await Author.find({ name:args.author })
        args.author = id
        if (!id) {
         return [] 
        }
      }
      if (!args.author && !args.genre) {
        return await Book
          .find({})
          .populate('author', { name: 1, born : 1 })
      } else if (args.author && args.genre) {        
        return await Book
          .find({ genres:{ $in:args.genre }, author:args.author })
          .populate('author', { name: 1, born : 1 })
      } else if (!args.author && args.genre) {
        return await Book
          .find({ genres:{ $in:args.genre } })
          .populate('author', { name: 1, born : 1 })
      } else if (args.author && !args.genre) {
        return await Book
          .find({ author:args.author })
          .populate('author', { name: 1, born : 1 })
      }
    },    
    allAuthors: async() => await Author.find({}),
    me: (root,args,{ currentUser }) => currentUser
  },

  Mutation: {
    addBook: async(root,args,{ currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated!")
      }
      let authorInDb = await Author.findOne({ name:args.author })
      if(!authorInDb) {
        const newAuthor  = new Author({ name:args.author })
        authorInDb = await newAuthor.save()
      }
      const newBook = new Book({ ...args, author:authorInDb._id })
      try {
        const postedBook = await newBook
        .save()
        .then(book => book
          .populate('author', { name: 1, born : 1 })
          .execPopulate())
        return postedBook
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }

    },
    editAuthor: async(root,args,{ currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated!")
      }
      try {
        const updatedAuthor = await Author
        .findOneAndUpdate(
          { name:args.name },
          { born: args.setBornTo },
          { new:true, runValidators:true })
      return updatedAuthor
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async(root,args) => {
      try {
        const user = new User({
          username:args.username,
          favoriteGenre:args.favoriteGenre
        })
        return await user.save()
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        })
      }
    },
    login: async(root,args) => {
      const user = await User.findOne({ username:args.username })
      if (!user || args.password !== 'password') {
        throw new UserInputError("Wrong credentials!")
      }
      const userObject = {
        username: user.username,
        id: user._id
      }
      return { value:jwt.sign(userObject, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})