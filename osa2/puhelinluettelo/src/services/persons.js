import axios from 'axios' 

const baseUrl = "http://localhost:3008/persons"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then( response => response.data)
}

const create = (uusiHenkilo) => {
    const request = axios.post(baseUrl, uusiHenkilo)
    return request.then( response => response.data)
}

const poista = (id) => {
    return axios.delete(baseUrl + "/" + id  )    
}

export default { getAll, create, poista }