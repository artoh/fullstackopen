import React from 'react'
import { connect } from 'react-redux'
import { List, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

class User extends React.Component {
  constructor( props ) {
    super(props)
    this.state = {
      id: props.id,
      redirect: false
    }
  }

  redirect = (id) => {
    return () => {
      this.setState({ redirect: id })
    }
  }

  render() {
    const user = this.props.users.find( user => user.id === this.state.id)

    if( this.state.redirect ) {
      return (
        <Redirect to={`/blogs/${this.state.redirect}`} />
      )
    }

    if( !user) {
      return ( <Loader active inline />)
    }

    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <List bulleted>
          {user.blogs.map( blog =>
            <List.Item key={blog._id} onClick={this.redirect(blog._id)}>
              {blog.title} by {blog.author}
            </List.Item>
          )}
        </List>
      </div>


    )

  }

}

User.propTypes = {
  id: PropTypes.string
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, {})(User)