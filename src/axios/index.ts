import axios from 'axios'

const BASE_URL = 'http://localhost:8081'
axios.defaults.baseURL = BASE_URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Content-Type'] = 'application/json'
export default axios
