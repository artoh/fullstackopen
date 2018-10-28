import React from 'react'

import Filter from './Filter'
import { connect } from 'react-redux'

import { anecdoteVote } from './../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {

    voter = (anecdote) => () => {
        console.log('vote ' + anecdote.content)

        this.props.anecdoteVote(anecdote)
        this.props.notify('you voted ' + anecdote.content )
        setTimeout( () => this.props.clear(), 5000 )                      
    }

    render() {
        const { anecdotes, filter } = this.props        
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

export default connect( mapStateToProps, {anecdoteVote, notify, clear})(AnecdoteList)
