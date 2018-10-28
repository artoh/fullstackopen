
const getId = () => (100000*Math.random()).toFixed(0)

const anecdoteReducer = (store = [], action) => {
    if (action.type==='VOTE') {
        const old = store.filter(a => a.id !==action.id)
        const voted = store.find(a => a.id === action.id)

        return [...old, { ...voted, votes: voted.votes+1 } ]
    }
    else if (action.type === 'CREATE') {

        return [...store, { content: action.content, id: getId(), votes:0 }]
    }
    else if( action.type === 'INIT') {
        return action.data    
    }

    return store
}

export const anecdoteCreation = (content) => {
    return {
        type: 'CREATE',
        content
    }
}

export const anecdoteVote = (anecdote) => {
    return {
        type: 'VOTE',
        id: anecdote.id
    }
}

export const anecdoteInitialization = (data) => {
    return {
        type: 'INIT',
        data
    }
}

export default anecdoteReducer