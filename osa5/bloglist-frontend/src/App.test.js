import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'


describe("<App />", () => {
    let app 

    describe("When user is not logged", () => {
        beforeAll( () => {
            app = mount(<App />)
        })

        it("Only login form without login", () => {
            app.update()
            const blogComponents = app.find(Blog)
            expect( blogComponents.length).toBe(0)
        })
    })

    describe("When user logged", () => {
        beforeAll( () => {
            const user = {
                username: 'test',
                token: 'abc123',
                name: 'Timppa Testaaja'
            }

            localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            app = mount(<App />)

        })

        it("Blogs are rendered", () => {
            app.update()
            
            // console.log( app.html())

            const blogComponents = app.find(Blog)            

            expect( blogComponents.length).toBe( 1 )
        })
    })    

})