import React from 'react'
import { connect } from 'react-redux'
import { Loader, Button, Input } from 'semantic-ui-react'
import { like, deleteBlog, commentBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'
import PropTypes from 'prop-types'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      id: props.id,
      newComment: ''
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

  addComment = () => {
    console.log(this.state.newComment)
    try {
      this.props.commentBlog( this.state.id, this.state.newComment)
      this.props.notify( 'Comment \'' + this.state.newComment + '\' added','success')
    } catch (exception) {
      console.log( exception )
    }

    this.setState({ newComment:'' })
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
          <h3>Comments</h3>
          <ul>
            {blog.comments.map(comment => <li key={Math.floor(Math.random()*99999)}> {comment} </li>)}
          </ul>
          
          <Input 
            type='text' 
            name='comment' 
            style={{width: '100%'}}
            placeholder='Write your comment here'    
            onChange={ e => this.setState({ newComment : e.target.value }) }
            value={this.state.newComment}
            action={{ content:'Add comment', onClick:this.addComment }}>              
          </Input>
        
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  id: PropTypes.string
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login  
  }
}


export default connect(mapStateToProps, { like, deleteBlog, commentBlog, notify })(Blog)