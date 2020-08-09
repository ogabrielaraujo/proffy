import axios from 'axios'

const api = axios.create({
  baseURL: 'http://1e5cbeced0e6.ngrok.io',
})

export default api
