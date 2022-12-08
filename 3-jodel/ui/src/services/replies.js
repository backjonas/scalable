import axios from 'axios'

let token = null

let baseUrl = '/api/reply'
if (!process.env.GATSBY_DOCKER){
  const api_host = process.env.GATSBY_API_HOST || 'localhost'
  const api_port = process.env.GATSBY_API_PORT || '5000'
  baseUrl = `http://${api_host}:${api_port}/api/reply`  
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const createNew = async (content, postId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, { content, postId }, config)
  return response.data
}


const exportedFunctions = {
  createNew,
  setToken
}

export default exportedFunctions