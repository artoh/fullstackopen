import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    const blogi = {
      author : 'Teppo Tekija',
      title: 'Artikkelin nimi',
      likes: 3
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blogi} onClick={mockHandler}/>)

    const titleDiv = blogComponent.find('.blogtitle')
    const contentDiv = blogComponent.find('.content')

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect( titleDiv.text() ).toContain( blogi.author )
    expect( titleDiv.text() ).toContain( blogi.title )
    expect( contentDiv.text() ).toContain( blogi.likes )

    expect( mockHandler.mock.calls.length).toBe(2)
  } )
})