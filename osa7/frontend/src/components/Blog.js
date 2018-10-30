import React from 'react'

import blogService from '../services/blogs'

import PropTypes from 'prop-types'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      detailsVisible : false,
      blog: props.blog
    }
    this.refresher = props.refresher
    this.canDelete = (!props.blog.user)  || props.blog.user.username === props.user ? true : false


  }


  toggleDetailsVisibility = () => {
    this.setState({ detailsVisible: !this.state.detailsVisible })
  }

  addLike = async (event) => {
    event.preventDefault()
    try {
      await blogService.like(this.state.blog)
      this.state.blog.likes++
      this.setState( { blog : this.state.blog } )
      await this.refresher()
    } catch (exception) {
      console.log('Can\'t like', exception)
    }
  }

  deleteThis = async (event) => {
    if( !window.confirm('delete \'' + this.state.blog.title + '\' by ' + this.state.blog.author))
      return

    try {
      await blogService.deleteBlog(this.state.blog.id)
      await this.refresher()
    } catch (exception) {
      console.log('Can\'t delete ', exception)
    }

  }

  render() {

    const detailsStyle = { display: this.state.detailsVisible ? '' : 'none', marginLeft: '1em' }
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const lisannyt = this.state.blog.user ? 'added by ' + this.state.blog.user.name : ''

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleDetailsVisibility} className="title">
          {this.state.blog.title} {this.state.blog.author}
        </div>
        <div style={detailsStyle} className="details">
          <a href={this.state.blog.url}>{this.state.blog.url}</a><br/>
          {this.state.blog.likes} likes <button onClick={this.addLike}>like</button>
          {this.canDelete && <button onClick={this.deleteThis}>delete</button>}
          <br/>
          {lisannyt}
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog : PropTypes.object.isRequired
  // tatapropsiieioo : PropTypes.bool.isRequired
}

export default Blog