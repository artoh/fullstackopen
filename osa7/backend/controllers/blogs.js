
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  console.log( request.user);	
  const blogs = await Blog
    .find({})
    .populate('user',{username:1, name:1})
  response.json( blogs.map(Blog.format) )
  
})
  
blogsRouter.post('/', async (request, response) => {
  try {
    const uusi = request.body

    if( request.user === undefined) {
      return response.status(401).json({error: 'token missing or invalid'})
    }

    if( uusi.likes === undefined)
       uusi.likes = 0
    if( uusi.title == undefined || uusi.url === undefined) 
      return response.status(400).json({error:'Title and url must not be empty'})

    const user = await User.findById( request.user)

    const blog = new Blog({
      title: uusi.title,
      author: uusi.author,
      url: uusi.url,
      likes: uusi.likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat( savedBlog._id)
    await user.save()

    response.status(201).json( Blog.format( savedBlog ) )

    } catch ( poikkeus ) {
      console.log( poikkeus )
      response.status(400).send({error: 'malformatted id'})
    }
})

blogsRouter.delete('/:id', async (request, response) => {    
    try {
      const blog = await Blog.findOne({_id: request.params.id})    
	  
	  
      if( !blog)  {
        response.status(404).end()      
      } else if( !blog.user || blog.user.toString() === request.user ) {
        await Blog.findOneAndDelete({_id: request.params.id})
        response.status(204).end()
      } else {
        console.log( blog.user + " " + request.user)
        response.status(401).json({error: 'No credits to remove'})
      }
    } catch (poikkeus ) {
        console.log(poikkeus)
        response.status(500).json({error: 'Something went wrong...'})
    }
})


blogsRouter.put('/:id', async (request, response) => { 
    try {

      const blog = await Blog.findOne({_id: request.params.id})    
      
	  if( !blog) {
        response.status(404).end()      
    } else {
		  
      const body = request.body
      const blogi = { 
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes,
        user: body.user
      }

      uusi = await Blog.
        findOneAndUpdate( {_id: request.params.id} , blogi, {new:true} )
        
      if( uusi === null)
        response.status(400).json({error: 'bad request'})
      else
        response.json(uusi)

    } 


    } catch( exception ) {
      console.log( esception )
      response.status(400).send({ error: 'malformatted id'})
    }


})

  module.exports = blogsRouter
