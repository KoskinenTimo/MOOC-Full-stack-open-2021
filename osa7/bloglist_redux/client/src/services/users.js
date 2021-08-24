import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  return axios(baseUrl)
    .then(res => res.data)
    .catch(err => err.response.data)
}

export default { getAll }