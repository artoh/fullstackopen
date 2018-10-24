import React from 'react'

import blogService from '../services/blogs'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      detailsVisible : false,
      blog: props.blog
    }
    this.sorter = props.sorter
    this.canDelete = (!props.blog.user)  || props.blog.user.username === props.user ? true : false

    console.log( props.user)
    
  }


  toggleDetailsVisibility = () => {
    this.setState({detailsVisible: !this.state.detailsVisible})
  }

  addLike = async (event) => {
    event.preventDefault()
    try {
      await blogService.like(this.state.blog)    
      this.state.blog.likes++
      this.setState( { blog : this.state.blog } )
      this.sorter()
    } catch (exception) {
      console.log("Can't like", exception)
    }
  }

  render() {

    const detailsStyle = { display: this.state.detailsVisible ? '' : 'none', marginLeft: '1em'}
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    
    const lisannyt = this.state.blog.user ? "added by " + this.state.blog.user.name : ""

    return (      
      <div style={blogStyle}>
        <div onClick={this.toggleDetailsVisibility}>
          {this.state.blog.title} {this.state.blog.author}
        </div>
        <div style={detailsStyle}>          
          <a href={this.state.blog.url}>{this.state.blog.url}</a><br/>
          {this.state.blog.likes} likes <button onClick={this.addLike}>like</button>
          {this.canDelete && <button>delete</button>}
          <br/>
          {lisannyt}
        </div>
      </div>  
    )
  }
}

export default Blog