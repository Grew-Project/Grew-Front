import axios from 'axios'
import useAuthStore from '../store/useAuthStore'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

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
export const getFlowerCount = async () => {
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
export const getLeafCount = async () => {
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

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// 현재 위치 날씨 정보 가져오기
export const getCurrentWeather = async () => {
  return new Promise((resolve, reject) => {
    // 현재 좌표 가져오기
    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords
          const response = await getWeatherByCoords(latitude, longitude)
          resolve(response)
        } catch (error) {
          console.log(error)
        }
      },
      err => {
        console.log('좌표 가져오기 실패', err)
        reject(err)
      }
    )
  })
}
