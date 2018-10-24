import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization' : token }
  }

  const response = await axios.post( baseUrl, newObject, config)
  return response.data
}

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const like = async (blog) => {
  const uusi = {
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.title
  }
  if(blog.user) {
    uusi.user = blog.user._id
  }
  
  const putResponse = await axios.put(baseUrl + blog.id, uusi)
  return putResponse

}

export default { getAll, setToken, create, like}
