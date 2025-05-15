import axios from 'axios'

const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'https://port-0-grew-back-man9teqf50330ae1.sel4.cloudtype.app' // 공통 API 주소

export const signup = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/signup`, userData)

    return response
  } catch (error) {
    const message = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
    throw new Error(message)
  }
}

export const login = async userData => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, userData)

    return response
  } catch (error) {
    const message = error.response?.data?.message || '로그인 중 오류가 발생했습니다.'
    throw new Error(message)
  }
}
