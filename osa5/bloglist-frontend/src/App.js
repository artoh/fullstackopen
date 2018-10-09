import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name] : event.target.value})
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if( loggedUserJSON) {
      const user = JSON.parse( loggedUserJSON )  
      this.setState({user})
      blogService.setToken(user.token)
    }
  } 

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username : '', password:'', user})    
    } catch (exception) {
      this.setState({ error: 'Invalid username or password'})
      setTimeout( () => { this.setState({error: null})}, 5000)
    }
  }

  logout = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState( {user: null})
  }


  render() {
    const loginForm = () => (
      <div><h2>Log into application</h2>
      <form onSubmit={this.login}>  
       <div>username:<input type='text' name='username' value={this.state.username} onChange={this.handleLoginFieldChange}/></div>
       <div>password:<input type='password' name='password' value={this.state.password} onChange={this.handleLoginFieldChange}/></div>
       <button type='submit'>login</button>
      </form>
      </div>
    )

    const blogs = () => (
      <div>
        <h2>blogs</h2>
        <div>{this.state.user.name} logged in <button onClick={this.logout}>logout</button> </div>
        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    )
    
    if (this.state.user === null) {
      return loginForm()
    } else {
      return blogs()
    }    
    
  }
}

export default App;
