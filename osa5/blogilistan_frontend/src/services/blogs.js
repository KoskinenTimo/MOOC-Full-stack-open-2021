/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postOne = (newBlog, userToken) => {
  const config = {
    url: baseUrl,
    method: 'post',
    data: newBlog,
    headers: { 'Authorization': `Bearer ${userToken}`}
  }
  return axios(config)
    .then(res => res.data)
    .catch(err => err.response.data)
}

export default { getAll, postOne }