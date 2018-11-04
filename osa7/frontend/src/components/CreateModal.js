import React from 'react'
import { Button, Modal, Form, Input, Label, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { createBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'

class CreateModal extends React.Component {
  state = { open: false }

  onOpen = () => this.setState({ open: true })
  onClose = () => this.setState({ open: false })

  create = async (e) => {    
    e.preventDefault()
    this.onClose()
    try {
      const newBlog = {
        title: e.target.title.value,
        author: e.target.author.value,
        url: e.target.url.value,
        likes: 0
      }
      await this.props.createBlog( newBlog )
      this.props.notify( `A new blog ${newBlog.title} by ${newBlog.author} added`, 'success' )
    } catch (e) {
      this.props.notify( 'Unable to add a blog', 'error')
    }
  }



  render() {

    return (
      <Modal 
        trigger={<Button style={{ float: 'right', marginBottom: 20 }}>Create blog</Button>}
        centered={false} 
        open={this.state.open}       
        onOpen={this.onOpen}
        onClose={this.onClose}
      >
        <Form onSubmit={this.create}>
          <Modal.Header><Header>Create blog</Header></Modal.Header>
          <Modal.Content>
            <Form.Field>
              <Label>
                Title
              </Label>
              <Input type='text' name='title'></Input>
            </Form.Field>
            <Form.Field>
              <Label>
                Author
              </Label>
              <Input type='text' name='author'></Input>
            </Form.Field>
            <Form.Field>
              <Label>
                Url
              </Label>
              <Input type='text' name='url'></Input>
            </Form.Field>
          </Modal.Content>
          <Modal.Actions>
            <Button type='submit'>Create</Button>
          </Modal.Actions>
        </Form>
      </Modal>
    )
  }
}

export default connect(null, { createBlog, notify })(CreateModal)