import axios from 'axios'
import useAuthStore from '../store/useAuthStore'

const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'https://port-0-grew-back-man9teqf50330ae1.sel4.cloudtype.app' // 공통 API 주소

export const getLeaves = async () => {
  const nickname = useAuthStore.getState().nickname
  try {
    const response = await axios.get(`${BASE_URL}/api/main/leaf-content`, {
      params: {
        receiver_nickname: nickname,
      },
    })
    return response
  } catch (error) {
    console.error(error)
  }
}
