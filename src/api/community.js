import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

export const getPostList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/comm/answer-search`)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendFlower = async (senderNickname, receiverNickname) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/comm/send-flower`, {
      sender_nickname: senderNickname,
      receiver_nickname: receiverNickname,
    })
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

export const sendLeaf = async (senderNickname, receiverNickname, content) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/comm/send-leaf`, {
      sender_nickname: senderNickname,
      receiver_nickname: receiverNickname,
      leaf_content: content,
    })

    console.log(response)
    return response.data
  } catch (error) {
    // throw new Error(error.message)
    console.log(error.message)
  }
}

export const getUserAnswers = async nickname => {
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
