import axios from 'axios'
import useAuthStore from '../store/useAuthStore'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getForest = async () => {
  const nickname = useAuthStore.getState().nickname
  try {
    const response = await axios.get(`${BASE_URL}/api/for/forest`, {
      params: {
        nickname,
      },
    })
    return response
  } catch (error) {
    console.error(error)
  }
}
