import { Navigate } from 'react-router-dom'
import useAuthStore from './store/useAuthStore'

export const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuthStore()
  return isLoggedIn ? element : <Navigate to="/" />
}
export const PublicRoute = ({ element }) => {
  const { isLoggedIn } = useAuthStore()
  return !isLoggedIn ? element : <Navigate to="/home" />
}
