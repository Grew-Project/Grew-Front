import { create } from 'zustand'

const useAuthStore = create(set => ({
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('user_id'),
  nickname: localStorage.getItem('nickname'),
  isLoggedIn: !!localStorage.getItem('token'),
  login: (token, userId, nickname) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user_id', userId)
    localStorage.setItem('nickname', nickname)
    set({ token, userId, isLoggedIn: true })
  },
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('nickname')
    set({ token: null, userId: null, nickname: null, isLoggedIn: false })
  },
}))

export default useAuthStore
