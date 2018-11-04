import React from 'react'
import { connect } from 'react-redux'

import { Menu, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { logout } from './../reducers/loginReducer'

class NavBar extends React.Component {

  doLogout = async () => {
    this.props.logout()
  }

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Item as={ NavLink } name='/'  to='/' exact>Blogs</Menu.Item>
        <Menu.Item as={ NavLink } name='/users' to='/users'>Users</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>{this.props.loggedUser.name} logged in </Menu.Item>
          <Button onClick={this.doLogout}>Logout</Button>
        </Menu.Menu>
      </Menu>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    loggedUser: state.login
  }
}
export default connect(mapStateToProps,{ logout })(NavBar)