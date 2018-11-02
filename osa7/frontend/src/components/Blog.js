import React from 'react'
import { connect } from 'react-redux'
import { Loader, Button } from 'semantic-ui-react'
import { like, deleteBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      id: props.id
    }


  }

  like = (e) => {
    e.preventDefault()
    this.props.like( this.props.blogs.find( blog => blog.id === this.state.id) )
    notify('Liked','success')
  }

  deleteBlog = (e) => {
    e.preventDefault()
    if( !window.confirm('Do you really want to delete this blog?')) {
      return
    }
    this.props.deleteBlog( this.state.id)
    window.location.replace('/')    
  }

  render() {
   
    const blog = this.props.blogs.find( blog => blog.id === this.state.id)
    
    if( !blog) {
      return ( <Loader active inline />)
    }

    return (
      <div>
        <div>
          <h2>{blog.title}</h2>
          <p>by <b>{blog.author}</b></p>
          <a href={blog.url}>{blog.url}</a><br/>
          {blog.likes} likes <Button onClick={this.like}>Like</Button>
          {(!blog.user || blog.user.username === this.props.user.username) && <Button onClick={this.deleteBlog}>Delete</Button>}
          <br/>
          {blog.user && <span><span>added by </span>{blog.user.name}</span>}
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login    
  }
}


export default connect(mapStateToProps, { like, deleteBlog, notify })(Blog)