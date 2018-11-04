import blogService from './../services/blogService'


const blogReducer = ( store = [], action) => {
  console.log( action )
  switch(action.type) {
  case 'INIT':
    return action.data
  case 'PUT':
    return [...store.filter( blog => blog.id !== action.data.id), action.data]
  case 'DELETE':
    return store.filter( blog => blog.id !== action.id)
  case 'CREATE':
    return [...store, action.data]
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

export const like = (blog) => {
  return async (dispatch) => {
    blog.likes = blog.likes + 1
    await blogService.like(blog)
    dispatch({
      type: 'PUT',
      data: blog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE',
      id: id
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newblog = await blogService.create(blog)
    dispatch({
      type: 'CREATE',
      data: newblog
    })
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const blog = await blogService.comment(id, comment)
    console.log(blog)
    dispatch({
      type: 'PUT',
      data: blog
    })
  }
}

export default blogReducer
