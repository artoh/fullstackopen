import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'


describe('<Blog />', () => {
    let blogComponent
    
    const blog = {
        author: "Artikkelin Tekija",
        title: "Artikkelin Otsikko",
        url: "artikkelin.osoite",
        likes: 8
    }

    beforeEach( () => {
        blogComponent = shallow(
            <Blog blog={blog} />
        )
    })

    it("reders title", () => {
        expect( blogComponent.text()).toContain(blog.title)
    })

    it("details hidden before click", () => {
        const div = blogComponent.find(".details")
        expect( div.getElement().props.style ).toEqual({ display: 'none', marginLeft: '1em'})
    })

    it("details show after click", () => {
        const title = blogComponent.find('.title')
        title.simulate('click')

        const div = blogComponent.find(".details")
        expect( div.getElement().props.style ).toEqual({ display: '', marginLeft: '1em'})
    })    

})

