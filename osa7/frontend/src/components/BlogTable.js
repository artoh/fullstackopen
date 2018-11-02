import React from 'react'
import { connect } from 'react-redux'
import BlogInTable from './BlogInTable'

import { Table } from 'semantic-ui-react'

class BlogTable extends React.Component {

  render() {
    const blogs = this.props.blogs
    blogs.sort(function(a,b) { return b.likes - a.likes})

    return (
      <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            Author
          </Table.HeaderCell>
          <Table.HeaderCell>
            Title
          </Table.HeaderCell>
          <Table.HeaderCell>
            Likes
          </Table.HeaderCell>          
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { blogs.map(blog =>
          <BlogInTable key={blog.id} blog={blog}/>
        )}
      </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect( mapStateToProps, {})(BlogTable)