import { create } from 'zustand'

const useAuthStore = create(set => ({
  token: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
  login: token => {
    localStorage.setItem('token', token)
    set({ token, isLoggedIn: true })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, isLoggedIn: false })
  },
}))

export default useAuthStore
