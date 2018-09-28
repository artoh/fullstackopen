
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {

    const uusi = request.body

    if( uusi.likes === undefined)
       uusi.likes = 0
    if( uusi.title == undefined || uusi.url === undefined) 
      response.status(400).json({error:'Title and url must not be empty'})

    const blog = new Blog(uusi)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findOneAndDelete({_id: request.params.id})
    response.status(204).end()
  })


  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blogi = { 
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes
    }

    uusi = await Blog.
      findOneAndUpdate( {_id: request.params.id} , blogi, {new:true} )
    

    if( uusi === null)
      response.status(400).json({error: 'bad request'})
    else
      response.json(uusi)


  })

  module.exports = blogsRouter