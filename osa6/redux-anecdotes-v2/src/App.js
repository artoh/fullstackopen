import React from 'react'
import ConnectedNotification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

class App extends React.Component {

    render() {
        // const anecdotes = this.props.store.getState()
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <ConnectedNotification/>
                <AnecdoteList store={this.props.store} />
                <AnecdoteForm store={this.props.store} />
            </div>
        )
    }
}

export default App