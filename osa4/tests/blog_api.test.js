const supertest = require('supertest') 
const { app,server} = require('../index') 
const api = supertest(app)
const Blog = require('../models/blog')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]


beforeAll( async() => {
    await Blog.remove({})

    for(let i=0; i<6; i++)
    {
        let blogObject = new Blog( blogs[i] )
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
        const response = await api.post('/api/blogs').send(withoutlikes).expect(404)
    })

    test("Blog without url will cause bad request", async () => {
        const response = await api.post('/api/blogs').send(withouturl).expect(404)
    })    

})

afterAll(() => {
    server.close()
})
