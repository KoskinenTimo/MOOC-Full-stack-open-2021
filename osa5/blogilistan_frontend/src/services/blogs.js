import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = () => {
  return axios(baseUrl)
    .then(response => response.data)
}

const create = (newBlog, userToken) => {
  const config = {
    url: baseUrl,
    method: 'post',
    data: newBlog,
    headers: { Authorization: `Bearer ${userToken}` }
  }
  return axios(config)
    .then(res => res.data)
    .catch(err => err.response.data)
}

const update = (id, updateDetails, userToken) => {
  const config = {
    url: `${baseUrl}/${id}`,
    method: 'put',
    data: updateDetails,
    headers: { Authorization: `Bearer ${userToken}` }
  }
  return axios(config)
    .then(res => res.data)
    .catch(err => err.response.data)
}

const remove = (id, userToken) => {
  const config = {
    url: `${baseUrl}/${id}`,
    method: 'delete',
    headers: { Authorization: `Bearer ${userToken}` }
  }
  return axios(config)
    .then(res => res.data)
    .catch(err => err.response.data)
}

export default { getAll, create, update, remove }