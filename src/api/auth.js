import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

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
