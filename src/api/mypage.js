import axios from 'axios'

const BASE_URL = 'https://port-0-grew-back-man9teqf50330ae1.sel4.cloudtype.app' // 공통 API 주소

export const getMyAnswers = async nickname => {
  try {
    const body = { nickname: nickname }
    console.log(body)
    const response = await axios.get(`${BASE_URL}/api/mypage/my-answer-search?nickname=${nickname}`)
    return response.data.filter(post => {
      return post.is_public
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const changePassword = async (currentPw, newPw, id) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/auth/login`, {
      user_id: id,
      password: newPw,
    })
    return response
  } catch (error) {
    const message = error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.'
    throw new Error(message)
  }
}
