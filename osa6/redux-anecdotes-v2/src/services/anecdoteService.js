import axios from 'axios'

const url = 'http://localhost:3001/anecdotes/'

const getAll = async() => {
    const response = await axios.get(url)
    return response.data
}

const createNew = async(content) => {
    const response = await axios.post( url, {content, id: Math.floor(Math.random() * 99999)})
    return response.data
}

const patchVote = async(anecdote) => {
    const response = await axios.patch(url + anecdote.id, { votes: anecdote.votes})
    return response.data
}

export default { getAll, createNew, patchVote }