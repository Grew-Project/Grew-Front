import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const getPostList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/comm/answer-search`)
    return response.data
  } catch (error) {}
}
