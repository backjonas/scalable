import axios from 'axios'

const baseUrl = ''
const createNew = async (longUrl) => {
  const object = { longUrl }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const exportedFunctions = {
  createNew,
}
export default exportedFunctions