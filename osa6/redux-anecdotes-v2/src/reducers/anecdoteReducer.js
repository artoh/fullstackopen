
import anecdoteService from './../services/anecdoteService'

const anecdoteReducer = (store = [], action) => {
    if (action.type==='VOTE') {
        const old = store.filter(a => a.id !==action.id)
        const voted = store.find(a => a.id === action.id)

        return [...old, { ...voted, votes: voted.votes+1 } ]
    }
    else if (action.type === 'CREATE') {

        return [...store, action.data]
    }
    else if( action.type === 'INIT') {
        return action.data    
    }

    return store
}

export const anecdoteCreation = (data) => {
    return {
        type: 'CREATE',
        data
    }
}

export const anecdoteVote = (anecdote) => {
    return {
        type: 'VOTE',
        id: anecdote.id
    }
}

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'CREATE',
            data: newAnecdote
        })
    }
}

export const voteAnecdote = (anecdote) => {
    return async (dispatch) => {
        await anecdoteService.patchVote(anecdote)
        dispatch({
            type: 'VOTE',
            id: anecdote.id
        })
    }
}


export const initAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT',
            data: anecdotes
        })
    }

}

export default anecdoteReducer