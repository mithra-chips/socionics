import axios from 'axios'

const BASE_URL = 'https://chat-server-r7lx.onrender.com/'
axios.defaults.baseURL = BASE_URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Content-Type'] = 'application/json'
export default axios
