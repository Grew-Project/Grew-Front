import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const getMyAnswerDetail = async nickname => {
  try {
    const body = { nickname: nickname }
    const response = await axios.get(`${BASE_URL}/api/mypage/my-answer-search?nickname=${nickname}`)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getMyAnswerList = async nickname => {
  try {
    const response = await axios.get(`${BASE_URL}/api/mypage/my-answer-list?nickname=${nickname}`)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

export const changePassword = async (currentPw, newPw, id) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/mypage/my-password-update`, {
      user_id: id,
      password: newPw,
    })
    return response
  } catch (error) {
    const message = error.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다.'
    throw new Error(message)
  }
}

export const updateMyAnswer = async (nickname, answerId, content, isPublic) => {
  const body = {
    nickname,
    answer_id: answerId,
    content,
    is_public: isPublic,
  }
  try {
    const response = await axios.put(`${BASE_URL}/api/mypage/my-answer-update`, body)
    return response
  } catch (error) {
    const message = error.response?.data?.message || '답변 수정 중 오류가 발생했습니다.'
    throw new Error(message)
  }
}
