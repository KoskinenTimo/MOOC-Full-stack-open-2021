/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/login'

const login = (loginDetails) => {
  return axios
    .post(baseUrl, loginDetails)
    .then(res => res.data)
    .catch(err => err.response.data)
}

export default { login }