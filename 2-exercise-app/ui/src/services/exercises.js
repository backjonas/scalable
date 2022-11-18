import axios from 'axios'

const baseUrl = '/api/exercise'
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

const getAll = async () => {
  const response = await axiosInstance.get('/')
  return response.data
}

const getById = async (id) => {
  const response = await axiosInstance.get(`/${id}`)
  return response.data
}
const exportedFunctions = {
  getAll,
  getById
}

export default exportedFunctions