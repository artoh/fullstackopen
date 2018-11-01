import loginService from './../services/loginService'
import blogService from './../services/blogService'

const loginReducer = ( store = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return store
  }    
}

export const login = (creditentials) => {
  return async (dispatch) => {
    const user = await loginService.login(creditentials)
    console.log( user )
    if(user.username) {
      console.log("Jippii")
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const storageLogin = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if( loggedUserJSON) {
      const user = JSON.parse( loggedUserJSON )
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    }  
  }
}

export default loginReducer