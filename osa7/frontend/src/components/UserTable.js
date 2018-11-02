import React from 'react'
import { connect } from 'react-redux'

import { Table } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class UserTable extends React.Component {
  state = { redirect: false }

  redirect = (id) => { 
    return () => {
      this.setState({ redirect: id }) 
    }
  }

  render() {
    const users = this.props.users

    if( this.state.redirect ) {
      return (
        <Redirect to={`/users/${this.state.redirect}`} />
      )
    }

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Name
            </Table.HeaderCell>
            <Table.HeaderCell>
              Blogs
            </Table.HeaderCell>         
          </Table.Row>
        </Table.Header>
        <Table.Body>
          { users.map(user =>
            <Table.Row key={user.id} onClick={this.redirect(user.id)}>
              <Table.Cell>
                {user.name}
              </Table.Cell>
              <Table.Cell>
                {user.blogs.length}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, {})(UserTable)
