import React from 'react'

import Filter from './Filter'
import { connect } from 'react-redux'

import { voteAnecdote } from './../reducers/anecdoteReducer'
import { notify, clear } from '../reducers/notificationReducer'


class AnecdoteList extends React.Component {

    voter = (anecdote) => async () => {
        console.log('vote ' + anecdote.content)

        await this.props.voteAnecdote(anecdote)
        this.props.notify('you voted ' + anecdote.content , 5)
                    
    }

    render() {             
        return (
            <div>
                <h2>Anecdotes</h2>
                <Filter />
                {this.props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = (anecdotes, filter) => {    
    console.log( anecdotes )
    return  anecdotes.filter( anecdote => anecdote.content.toLowerCase().indexOf(
        filter.toLowerCase()) > -1 ).sort((a, b) => b.votes - a.votes) 
}


const mapStateToProps = (state) => {
    return {
        visibleAnecdotes : anecdotesToShow( state.anecdotes, state.filter )
    }
}

export default connect( mapStateToProps, { voteAnecdote, notify, clear })(AnecdoteList)
