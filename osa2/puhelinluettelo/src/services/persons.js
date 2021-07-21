import axios from 'axios';
const url = '/api/persons';


const getAll = () => {  
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => {
      console.error(err);
      return [];
    });
}

const create = (newPerson) => {
  return axios
    .post(url,newPerson)
    .then(res => res.data)
    .catch(err => {
      throw err;
    })
}

const update = (id,newPerson) => {
  return axios
    .put(`${url}/${id}`,newPerson)
    .then(res => res.data)
    .catch(err => {
      throw err;
    })
}

const destroy = id => {
  return axios
    .delete(`${url}/${id}`)
    .then(res => res.status)
    .catch(err => {
      console.log(err.status);
      return err.response.status;
    })
}

const personsService = {
  getAll,
  create,
  update,
  destroy
}

export default personsService;

