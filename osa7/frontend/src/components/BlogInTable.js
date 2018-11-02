import React from 'react'

import { Table } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

class BlogInTable extends React.Component {

  constructor( props ) {
    super(props)
    this.state = {
      blog: props.blog,
      details: false
    }
  }

  details = (event) => {
    event.preventDefault()
    this.setState({details: true})
  }

  render() {

    if( this.state.details) {
      return (
        <Redirect to={`/blogs/${this.state.blog.id}`} />
      )
    }

    return (
      <Table.Row onClick={this.details}>       
        <Table.Cell>
          {this.state.blog.author}
        </Table.Cell>
        <Table.Cell>
          {this.state.blog.title}
        </Table.Cell>
        <Table.Cell>
          {this.state.blog.likes}
        </Table.Cell>        
      </Table.Row>
    )
  }
}

export default BlogInTable