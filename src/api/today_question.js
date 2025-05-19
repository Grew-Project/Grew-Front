import axios from 'axios'
import useAuthStore from '../store/useAuthStore'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getTodayQuestion = async emotionType => {
  //   const userId = useAuthStore.getState().userId
  try {
    const response = await axios.get(`${BASE_URL}/api/today/question-search`, {
      params: {
        emotion_type: emotionType,
      },
    })
    return response.data[0]
  } catch (error) {
    console.error(error)
  }
}

export const createTodayAnswer = async (question_id, answer_content, emotion_type, is_public) => {
  const nickname = useAuthStore.getState().nickname
  try {
    const response = await axios.post(`${BASE_URL}/api/today/answer-write`, {
      nickname,
      question_id,
      answer_content,
      emotion_type,
      is_public,
    })

    return response
  } catch (error) {
    console.error(error)
  }
}

export const getQuestionCount = async () => {
  const nickname = useAuthStore.getState().nickname
  try {
    const response = await axios.get(`${BASE_URL}/api/mypage/my-answer-list`, {
      params: {
        nickname,
      },
    })
    // console.log(response.data)

    return response
  } catch (error) {
    console.error(error)
  }
}
