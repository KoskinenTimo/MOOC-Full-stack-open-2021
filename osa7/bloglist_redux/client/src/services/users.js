/* eslint-disable no-undef */
import axios from 'axios'
const localhost = process.env.REACT_APP_API_URL // 'http://localhost:3003'
const baseUrl = `${localhost}/api/users`

const getAll = () => {
  return axios(baseUrl)
    .then(res => res.data)
    .catch(err => err.response.data)
}

export default { getAll }