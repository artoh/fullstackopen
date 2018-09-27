import axios from 'axios' 

const baseUrl = "/api/persons"

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

const paivita = (henkilo) =>
{
    const request = axios.put(baseUrl + "/" + henkilo.id, henkilo)
    return request.then( response => response.data )
}

export default { getAll, create, poista, paivita }
