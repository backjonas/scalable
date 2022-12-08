import axios from 'axios'

let token = null
const api_host = process.env.GATSBY_API_HOST || 'localhost'
const api_port = process.env.GATSBY_API_PORT || '5000'
const baseUrl = `http://${api_host}:${api_port}/api/post`

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const createNew = async (content) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, { content }, config)
  return response.data
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getById = async (postId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(`${baseUrl}/${postId}`, config)
  return response.data
}

const exportedFunctions = {
  createNew,
  getAll,
  setToken,
  getById
}

export default exportedFunctions