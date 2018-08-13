import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const setToken = (newToken) => {
    token = 'bearer ' + newToken
}

const createNew = (blogObject) => {
    const config = {
        headers: {'Authorization': token}
    }
    const request = axios.post(baseUrl, blogObject, config)
    return request.then(response => response.data)
}

export default { getAll, setToken, createNew }
