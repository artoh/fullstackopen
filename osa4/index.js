
const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')


app.use(cors())
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then( () => {
      console.log('connected to db')
  })

app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
