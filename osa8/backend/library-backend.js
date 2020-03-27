const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError
} = require("apollo-server")

const uuid = require("uuid/v1")

const mongoose = require("mongoose")
const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const jwt = require("jsonwebtoken")
const JWT_SECRET = "SUPER_SECRET_KEY"

mongoose.set("useFindAndModify", false)
const MONGODB_URI =
  "mongodb+srv://fullstack:J7JKS6XmbVA3Fqzo@cluster0-szvej.mongodb.net/test?retryWrites=true&w=majority"

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to MongoDB")
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
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
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filter["author"] = author._id
      }
      if (args.genre) {
        filter["genres"] = args.genre
      }
      return Book.find(filter)
    },
    allAuthors: () => Author.find(),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    id: root => root._id,
    name: async root => {
      const author = await Author.findById(root._id)
      return author.name
    },
    born: async root => {
      const author = await Author.findById(root._id)
      return author.born
    },
    bookCount: async root => {
      const author = await Author.findOne({ name: root.name })
      console.log("Author ", author)
      return await Book.collection.countDocuments({ author: author._id })
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      console.log("Add book ", args)
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }
      console.log("Author is ", author)

      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      console.log("Book is ", book)
      return book
    },
    editAuthor: async (root, args) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== "1234") {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    console.log("Auth ", auth)
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
