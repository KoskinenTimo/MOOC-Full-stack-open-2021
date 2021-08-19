import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios(url)
    .then(res => res.data)
    .catch(err => err.response.data)
}

const createOne = (content) => {
  const config = {
    method: 'POST',
    url: url,
    data: {
      content: content,
      votes: 0
    }
  }
  return axios(config)
    .then(res => res.data)
    .catch(err => err.response.data)  
}

const updateOne = (update) => {
  const config = {
    method: 'PUT',
    url: `${url}/${update.id}`,
    data: {
      ...update
    }
  }
  return axios(config)
    .then(res => res.data)
    .catch(err => err.response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  createOne,
  updateOne
}