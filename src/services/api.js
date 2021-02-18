import axios from 'axios'

const api = axios.create({
  baseURL: 'https://findcellsbackend.herokuapp.com/'
})

export default api