import axios from 'axios'

let token = null

const baseUrl = '/api/submission'
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

const setToken = (newToken) => {
  console.log(newToken)
  token = `bearer ${newToken}`
}

const createNew = async (submittedCode, user, exerciseId) => {
  const config = {
    headers: { Authorization: token },
  }
  const object = { submittedCode, user, exerciseId }
  const response = await axiosInstance.post('', object, config)
  return response.data
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axiosInstance.get('/', config)
  return response.data
}

const getByExerciseId = async (exerciseId) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axiosInstance.get(`/exercise/${exerciseId}`, config)
  return response.data
}

const exportedFunctions = {
  createNew,
  getAll,
  setToken,
  getByExerciseId
}

export default exportedFunctions