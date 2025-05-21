import { create } from 'zustand'

const useUIStore = create(set => ({
  toastMessage: '',

  showToast: msg => {
    set({ toastMessage: msg })
    setTimeout(() => set({ toastMessage: '' }), 3000)
  },
}))

export default useUIStore
