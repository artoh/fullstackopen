import React from 'react'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'


import { connect } from 'react-redux';
import { storageLogin } from './reducers/loginReducer'


class App extends React.Component {

  componentDidMount = async () => {
    await this.props.storageLogin()
  }


  render() {

    return (
      <Container>
        <Router>
          <div>           
            <h2>Blogs</h2>                     
            <Notification />             
            { this.props.loggedUser ? <NavBar/> : <LoginForm />}                    
            <Route path='/' exact render={ () => this.props.loggedUser && <div>Moikka</div>} />                        
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.login
  }
}
export default connect(mapStateToProps,{ storageLogin })(App)
