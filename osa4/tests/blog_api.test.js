const supertest = require('supertest') 
const { app,server} = require('../index') 
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const {initBlogs, blogsInDb, usersInDb} = require('./test_helper')

beforeAll( async() => {
    await Blog.remove({})

    for(let i=0; i<initBlogs.length; i++)
    {
        let blogObject = new Blog( initBlogs[i] )
        await blogObject.save()
    }
})


describe('GET', () => {

    test('there are six notes', async () => {

        const response = await api.get("/api/blogs")        
        expect( response.body.length).toBe(6)

    })
     
    test('a specific blog is within returned blogs', async() => {
        const response = await api.get("/api/blogs")
        const titles = response.body.map( r => r.title)
        expect(titles).toContain( "First class tests")        
    })
 })

describe('POST', () => {

    const newblog = {
        title: "Tiikereiden erinomaisesta älykkyydestä",
        author: "Tikke Tiikeri",
        url: "tikke.com/kehut",
        likes : 5
    }
    
    const withoutlikes = {
        title: "Tiikereiden suuresta viisaudesta",
        author: "Tikke Tiikeri",
        url: "tikke.com/kehut"
    }

    const withouttitle = {
        author: "Tikke Tiikeri",
        url: "tikke.com/kehut",
        likes: 525
    }

    const withouturl =     {
        title: "Tiikereiden erinomaisesta älykkyydestä",
        author: "Tikke Tiikeri",
        likes: 5
    }
    

    test('Posted blog includes in get', async () => {
        await api.post('/api/blogs').send(newblog).expect(201)

        const response = await api.get('/api/blogs')
        
        const titles = response.body.map( r => r.title)
        expect(titles).toContain( "Tiikereiden erinomaisesta älykkyydestä")        
    })

    test('Posted blog without likes will has 0 likes', async () => {
        const response = await api.post('/api/blogs').send(withoutlikes).expect(201)

        expect( response.body.likes).toBe(0)
    })

    test("Blog without title will cause bad request", async () => {
        const response = await api.post('/api/blogs').send(withouttitle).expect(400)
    })

    test("Blog without url will cause bad request", async () => {
        const response = await api.post('/api/blogs').send(withouturl).expect(400)
    })    

})

afterAll(() => {
    server.close()
})

describe('when there is initially one user at db', async () => {
    beforeAll(async () => {
      await User.remove({})
      const user = new User({ username: 'root', password: 'sekret', name:"Root User" })
      await user.save()
    })
  
    test('POST /api/users succeeds with a fresh username', async () => {
      const usersBeforeOperation = await usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAfterOperation = await usersInDb()
      expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
      const usernames = usersAfterOperation.map(u=>u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('POST /api/users fails with proper statuscode and message if username already taken', async () => {
        const usersBeforeOperation = await usersInDb()
      
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen'
        }
      
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      
        expect(result.body).toEqual({ error: 'username must be unique'})
      
        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
      })    

      test('POST /api/users fails with short password', async () => {
        const usersBeforeOperation = await usersInDb()
      
        const newUser = {
          username: 'uusinimi',
          name: 'Lyhyt Salasana',
          password: 'k2'
        }
      
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      
        expect(result.body).toEqual({ error: 'password must be at least three characters'})
      
        const usersAfterOperation = await usersInDb()
        expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
      })        
  })
