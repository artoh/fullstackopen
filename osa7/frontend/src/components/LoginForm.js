import React from 'react'
import { connect } from 'react-redux'
import { login } from './../reducers/loginReducer'
import { Form, Input, Button } from 'semantic-ui-react'
import { notify } from './../reducers/notificationReducer'


class LoginForm extends React.Component {

  doLogin = async (event) => {
    console.log('login ', event.target.username.value)
    event.preventDefault()
    try { 
      await this.props.login({
        username: event.target.username.value,
        password: event.target.password.value
      })
      notify('Welcome','success')
    } catch (e) {
      await this.props.notify('Login fail','error')
      console.log(e)
    }
    
  }

  render() {
    return (
      <Form onSubmit={this.doLogin}>
        <Form.Field>
          <label>Username</label>
          <Input type='text' name='username'></Input>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input type='password' name='password'></Input>
        </Form.Field>
        <Button type='submit'>Login</Button>
      </Form>
    )
  }
}

export default connect(null, { login, notify })(LoginForm)