import axios from 'axios'

const api = axios.create({
    baseURL: process.REACT_APP_API_URL
})


export default api