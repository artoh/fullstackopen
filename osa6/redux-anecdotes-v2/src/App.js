import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdoteService'
import { anecdoteInitialization } from './reducers/anecdoteReducer'
import { connect } from 'react-redux'

class App extends React.Component {

    componentDidMount = async () => {
        const anecdotes = await anecdoteService.getAll()
        this.props.anecdoteInitialization( anecdotes )
    }

    render() {
        // const anecdotes = this.props.store.getState()
        return (
            <div>
                <h1>Programming anecdotes</h1>
                <Notification/>
                <AnecdoteList/>
                <AnecdoteForm/>
            </div>
        )
    }
}

export default connect(
    null,
    { anecdoteInitialization }
)(App)