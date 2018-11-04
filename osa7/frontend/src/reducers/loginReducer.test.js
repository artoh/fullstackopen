import reducer, {login, logout, storageLogin} from './loginReducer'
import deepFreeze from 'deep-freeze'

jest.mock('./../services/loginService')
jest.mock('./../services/blogService')
import loginService from './../services/loginService'
import blogService from './../services/blogService'

const user = {
  name: 'Dummy Tester',  
  token: '123456',  
  username: 'tester'
}

describe('Login reducer', () => {

  it('Reducer login', () => {
    expect( reducer(null, {type:'LOGIN', data:user})).toEqual(user)
  })

  it('Reducer logout', () => {
    expect( reducer(user, {type:'LOGOUT'})).toBeNull()
  })

})

describe('User login from storage', () => {

  it('Login from storage', () => {    
    window.localStorage.setItem('loggedBlogappUser', user)
    storageLogin()
    expect( window.localStorage.getItem('loggedBlogappUser') ).toEqual( user )
  })

})
