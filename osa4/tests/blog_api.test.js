const supertest = require('supertest') 
const { app,server} = require('../index') 
const api = supertest(app)
const Blog = require('../models/blog')
const {initBlogs, nonExistingId, blogsInDb, format} = require('./test_helper')

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
