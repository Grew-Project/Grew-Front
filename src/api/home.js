import axios from 'axios'
import useAuthStore from '../store/useAuthStore'

const BASE_URL = 'http://localhost:3000'
// const BASE_URL = 'https://port-0-grew-back-man9teqf50330ae1.sel4.cloudtype.app'

const getAnswerCount = async () => {
  const userId = useAuthStore.getState().userId
  try {
    const response = await axios.get(`${BASE_URL}/api/main/answer-count`, {
      params: {
        user_id: userId,
      },
    })
    return response.data.answer_count
  } catch (error) {
    console.error(error)
  }
}
const getTreeInfo = async () => {
  const userId = useAuthStore.getState().userId
  try {
    const response = await axios.get(`${BASE_URL}/api/main/tree-info`, {
      params: {
        user_id: userId,
      },
    })
    return response.data.tree_type
  } catch (error) {
    console.error(error)
  }
}
const getFlowerCount = async () => {
  const userId = useAuthStore.getState().userId
  try {
    const response = await axios.get(`${BASE_URL}/api/main/flower-count`, {
      params: {
        user_id: userId,
      },
    })
    return response.data.flower_count
  } catch (error) {
    console.error(error)
  }
}
const getLeafCount = async () => {
  const userId = useAuthStore.getState().userId
  try {
    const response = await axios.get(`${BASE_URL}/api/main/leaf-count`, {
      params: {
        user_id: userId,
      },
    })
    return response.data.leaf_count
  } catch (error) {
    console.error(error)
  }
}
const getTreeName = async () => {
  const userId = useAuthStore.getState().userId
  try {
    const response = await axios.get(`${BASE_URL}/api/main/tree-name`, {
      params: {
        user_id: userId,
      },
    })
    return response.data.tree_name
  } catch (error) {
    console.error(error)
  }
}
const getIsAnswered = async () => {
  const nickname = useAuthStore.getState().nickname
  try {
    const response = await axios.get(`${BASE_URL}/api/main/answer-or-not`, {
      params: {
        nickname,
      },
    })
    return response.data.answered
  } catch (error) {
    console.error(error)
  }
}

const apiHandlers = {
  answerCount: getAnswerCount,
  treeType: getTreeInfo,
  flowerCount: getFlowerCount,
  leafCount: getLeafCount,
  treeName: getTreeName,
  isAnswered: getIsAnswered,
}

export const getHomeInfo = async () => {
  const entries = Object.entries(apiHandlers)

  try {
    const results = await Promise.all(entries.map(([, fn]) => fn()))
    const merged = Object.fromEntries(entries.map(([key], index) => [key, results[index]]))

    return merged
  } catch (error) {
    console.error('getHomeInfo 에러:', error)
    throw error
  }
}

export const updateTreeName = async treeName => {
  const userId = useAuthStore.getState().userId
  try {
    const response = await axios.put(`${BASE_URL}/api/main/tree-name-update`, {
      user_id: userId,
      tree_name: treeName,
    })

    return response
  } catch (error) {
    console.error(error)
  }
}
