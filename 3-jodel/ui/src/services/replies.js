import axios from 'axios'

let token = null

const baseUrl = '/api/reply'

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