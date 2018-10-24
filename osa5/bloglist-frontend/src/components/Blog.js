import React from 'react'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      detailsVisible : false,
      blog: props.blog
    }
  }


  toggleDetailsVisibility = () => {
    this.setState({detailsVisible: !this.state.detailsVisible})
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
      <div onClick={this.toggleDetailsVisibility} style={blogStyle}>
        {this.state.blog.title} {this.state.blog.author}
        <div style={detailsStyle}>          
          <a href={this.state.blog.url}>{this.state.blog.url}</a><br/>
          {this.state.blog.likes} likes <button>like</button><br/>
          {lisannyt}
        </div>
      </div>  
    )
  }
}

export default Blog