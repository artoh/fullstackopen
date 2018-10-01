const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const formatUser = (user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      adult: user.adult,
      blogs: user.blogs
    }
  }
  
  usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(formatUser))
  })


usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const aiempiKayttaja = await User.find({username: body.username})
    if( aiempiKayttaja.length > 0) {
      return response.status(400).json({error : "username must be unique"})      
    }

    if( body.password.length < 3)  {
      return response.status(400).json({error: "password must be at least three characters"})
    }
    

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    let aikuinen = request.body.adult
    if( aikuinen === undefined) {
        aikuinen = true
    }

    const user = new User({
      username: body.username,
      name: body.name,
      adult: aikuinen,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(formatUser(savedUser))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter 
