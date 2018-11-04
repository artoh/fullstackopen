let token = null

const blogs = [
  {
    comments: [],
    id: '5521145511114525',
    author: 'Leo Leijona',
    title: 'Leijonien älykkyydestä',
    likes: 3,
    user : {
      id: '87489843784',
      username: 'leo',
      name: 'Leo Leijona'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = newToken
  if( token === 'disableunusedwarning')
    console.log('')
}

export default { getAll, blogs, setToken }