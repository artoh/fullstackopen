import React from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({message, className}) => {
  if (message === null) {
    return null
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
      success: null,
      newtitle: '',
      newauthor: '',
      newurl: ''
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name] : event.target.value})
  }

  componentDidMount = async () => {

    const blogs = await blogService.getAll()
    this.setState({blogs})

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

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: this.state.newtitle,
        author: this.state.newauthor,
        url: this.state.newurl
      }

      await blogService.create(blogObject)

      this.setState({ success: `A new blog ${blogObject.title} by ${blogObject.author} added`})
      setTimeout( () => { this.setState({success: null})}, 5000)      

      this.setState({newtitle:'',newauthor:'',newurl:''})
      const blogs = await blogService.getAll()
      console.log(blogs)
      this.setState({ blogs })
      this.newForm.toggleVisibility()
      
    } catch (exception) {
      this.setState({ error: 'Something went wrong'})
      setTimeout( () => { this.setState({error: null})}, 5000)
    }
  }


  render() {
    const loginForm = () => (
      <div><Notification message={this.state.error} className='error'/><h2>Log into application</h2>
      <form onSubmit={this.login}>  
       <div>username:<input type='text' name='username' value={this.state.username} onChange={this.handleFieldChange}/></div>
       <div>password:<input type='password' name='password' value={this.state.password} onChange={this.handleFieldChange}/></div>
       <button type='submit'>login</button>
      </form>
      </div>
    )

    const blogs = () => (
      <div>
        <h2>blogs</h2>
        <Notification message={this.state.error} className='error'/>
        <Notification message={this.state.success} className='success'/>
        <div>
          {this.state.user.name} logged in <button onClick={this.logout}>logout</button> 
        </div>
        <div>
          <Togglable buttonLabel="new blog" ref={component => this.newForm = component}>
            <div><h3>create new</h3>
              <form onSubmit={this.addBlog}>
                <div>title<input type='text' name='newtitle' value={this.state.newtitle} onChange={this.handleFieldChange}/></div>
                <div>author<input type='text' name='newauthor' value={this.state.newauthor} onChange={this.handleFieldChange}/></div>
                <div>url<input type='text' name='newurl' value={this.state.newurl} onChange={this.handleFieldChange}/></div>
                <button type='submit'>create</button>
              </form>
            </div>
          </Togglable>
        </div>
        {this.state.blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
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
