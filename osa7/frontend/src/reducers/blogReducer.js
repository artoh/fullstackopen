import blogService from './../services/blogService'

const blogReducer = ( store = [], action) => {
  switch(action) {
  case 'INIT': 
    return action.data
  default:
    return store
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export default blogReducer
