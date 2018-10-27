import React from 'react'

import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer';

class AnecdoteList extends React.Component {

    voter = (anecdote) => () => {
        console.log('vote ' + anecdote.content)

        this.props.store.dispatch(anecdoteVote(anecdote))
        this.props.store.dispatch(notify('you voted ' + anecdote.content ))
        setTimeout( () => this.props.store.dispatch( clear()), 5000 )                      
    }

    render() {
        const anecdotes = this.props.store.getState().anecdotes
        return (
            <div>
                <h2>Anecdotes</h2>
                {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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
