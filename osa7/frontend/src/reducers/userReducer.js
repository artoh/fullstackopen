import userService from './../services/userService'

const userReducer = ( store = [], action) => {
  if( action.type === 'INITUSERS') {
    return action.data
  }
  return store
}

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INITUSERS',
      data: users
    })
  }
}

export default userReducer