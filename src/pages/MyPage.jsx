import React from 'react'
import useAuthStore from '../store/useAuthStore'

const MyPage = () => {
  const logout = useAuthStore(state => state.logout)
  const handleLogoutClick = () => {
    logout()
  }
  return (
    <div>
      MyPage
      <button onClick={handleLogoutClick}>로그아웃</button>
    </div>
  )
}

export default MyPage
