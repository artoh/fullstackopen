import React from 'react'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { notify, clear } from './../reducers/notificationReducer'
import anecdoteService from './../services/anecdoteService'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
      e.preventDefault()
      const content = e.target.anecdote.value
      e.target.anecdote.value = ''      
      const newAnecdote = await anecdoteService.createNew(content)

      console.log( newAnecdote )

      this.props.anecdoteCreation( newAnecdote )       
      this.props.notify('Anecdote ' + content + ' added' ) 
      setTimeout( () => this.props.clear(),5000 )



  }
  render() {
      return (
          <div>
              <h2>create new</h2>
              <form onSubmit={this.handleSubmit}>
                  <div><input name='anecdote'/></div>
                  <button>create</button>
              </form>
          </div>
      )
  }
}

export default connect(null, { anecdoteCreation, notify, clear })(AnecdoteForm)
