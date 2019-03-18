import reducer from './blogReducer'
import deepFreeze from 'deep-freeze'


describe('Blog reducer', () => {

  const blog1 =   {
    comments: [
      'Tosi hyvä juttu',
      'ihan huono kirjoitus'
    ],
    id: '5521145511114525',
    author: 'Leo Leijona',
    title: 'Leijonien älykkyydestä',
    likes: 3,
    url: 'www.dot',
    user : {
      id: '87489843784',
      username: 'leo',
      name: 'Leo Leijona'
    }
  }

  const blog2 =   {
    comments: [
    ],
    id: '5521142511314521',
    author: 'Tikke Tiikeri',
    title: 'Tiikereiden ylistys',
    likes: 3,
    url: 'tiger.dot',
    user : {
      id: '87489843755',
      username: 'tikru',
      name: 'Tikru Tiikeri'
    }
  }


  it('should return the initial state', () => {
    expect( reducer( undefined, {} )).toEqual([])
    expect( reducer( [blog1, blog2], {} )).toEqual([blog1, blog2])
  })


  it('should be initialised', () => {
    expect( reducer(undefined, { type:'INIT', data: [blog1, blog2] })).toEqual([blog1, blog2])
  })

  it('blog can be created', () => {
    expect( reducer([blog1], { type:'CREATE', data: blog2 })).toEqual([blog1, blog2])
  })

  it('blog can be deleted', () => {
    expect( reducer([blog1,blog2],{ type:'DELETE', id: blog1.id })).toEqual([blog2])
  })

  it('blog can be liked', () => {
    const liked2 = blog2
    liked2.likes = liked2.likes + 1
    expect( reducer([blog1,blog2],{ type:'LIKE', data:blog2 })).toEqual([blog1, liked2])
  })

  it('blog can be putted', () => {

    const blog2putted =   {
      comments: [
        'A new comment'
      ],
      id: '5521142511314521',
      author: 'Tikke Tiikeri',
      title: 'Tiikereiden pidempi ylistys',
      likes: 4,
      url: 'newurl.fi',
      user : {
        id: '87489843755',
        username: 'tikru',
        name: 'Tikru Tiikeri'
      }
    }

    expect(reducer([blog1,blog2], { type:'PUT', data:blog2putted })).toEqual([blog1, blog2putted])

  })

})