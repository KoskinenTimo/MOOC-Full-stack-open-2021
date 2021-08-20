import axios from 'axios'
import { useState, useEffect } from 'react'

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const config = {
      method: 'GET',
      url: baseUrl
    }
    axios(config)
      .then(res => {
        setResources(res.data)
        return res.data
      })
      .catch(err => console.log(err.response.data))
  }, [baseUrl])
  

  const create = (resource) => {
    const config = {
      method: 'POST',
      url: baseUrl,
      data: resource
    }
    return axios(config)
      .then(res => {
        setResources(resources.concat(res.data))
        return res.data
      })
      .catch(err => err.response.data)
  }



  const service = {
    create
  }

  return [
    resources, service
  ]
}