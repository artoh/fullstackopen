import React from 'react';


const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const actionFor = {
  vote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  },
  create(content) {
    return {
      type: 'NEW',
      data: {
        content,
        votes: 0,
        id: generateId()
      }
    }
  }

}

class App extends React.Component {

  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.uusi.value
    this.props.store.dispatch(
      actionFor.create(content)
    )
    event.target.uusi.value = ''
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes} 
              <button onClick={e => this.props.store.dispatch( actionFor.vote(anecdote.id) ) }>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="uusi" /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App