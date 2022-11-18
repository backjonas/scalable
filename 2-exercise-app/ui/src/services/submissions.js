import axios from 'axios'

const baseUrl = '/api/submission'
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

const createNew = async (submittedCode, user, exerciseId) => {
  const object = { submittedCode, user, exerciseId }
  const response = await axiosInstance.post('', object)
  return response.data
}

const getAll = async () => {
  const response = await axiosInstance.get('/')
  return response.data
}

const exportedFunctions = {
  createNew,
  getAll
}

export default exportedFunctions