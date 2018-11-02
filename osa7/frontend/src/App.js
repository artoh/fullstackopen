import React from 'react'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogTable from './components/BlogTable'
import Blog from './components/Blog'
import CreateModal from './components/CreateModal'
import UserTable from './components/UserTable'
import User from './components/User'

import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'


import { connect } from 'react-redux';
import { storageLogin } from './reducers/loginReducer'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'


class App extends React.Component {

  componentDidMount = async () => {
    await this.props.storageLogin()
    await this.props.initBlogs()
    await this.props.initUsers()
  }


  render() {

    return (
      <Container>
        <Router>
          <div>         
            <h2>Blogs</h2>                     
            <Notification />             
            { this.props.loggedUser ? <div><NavBar/><CreateModal /></div> : <LoginForm />}                    
            <Route path='/' exact render={ () => this.props.loggedUser && <BlogTable />} />                        
            <Route path='/blogs/:id' render={ ({ match }) => <Blog id={match.params.id} /> } />
            <Route path='/users' exact render={ () => this.props.loggedUser && <UserTable />} />
            <Route path='/users/:id' render={ ({match}) => <User id={match.params.id} />} />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.login,
    blogs: state.blogs,
  }
}
export default connect(mapStateToProps,{ storageLogin, initBlogs, initUsers })(App)
