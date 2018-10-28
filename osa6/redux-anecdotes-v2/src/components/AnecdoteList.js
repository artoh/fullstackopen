import React from 'react'

import Filter from './Filter'

import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {

    voter = (anecdote) => () => {
        console.log('vote ' + anecdote.content)

        this.props.store.dispatch(anecdoteVote(anecdote))
        this.props.store.dispatch(notify('you voted ' + anecdote.content ))
        setTimeout( () => this.props.store.dispatch( clear()), 5000 )                      
    }

    render() {
        const { anecdotes, filter } = this.props.store.getState()        
        const filtered = filter.length > 0 ? anecdotes.filter( anecdote => anecdote.content.toLowerCase().indexOf(
            filter.toLowerCase()) > -1 ) : anecdotes
        
        return (
            <div>
                <h2>Anecdotes</h2>
                <Filter />
                {filtered.sort((a, b) => b.votes - a.votes).map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
              has {anecdote.votes}
                            <button onClick={this.voter(anecdote)}>
                vote
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default AnecdoteList
