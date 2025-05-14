import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './layouts/CommonLayout'
import AuthLayout from './layouts/AuthLayout'
import MyPage from './pages/MyPage'
import GlobalStyle from './styles/GlobalStyle'
import Landing from './pages/Landing'
import { PrivateRoute, PublicRoute } from './Routes'

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/mypage" element={<PrivateRoute element={<MyPage />} />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<PublicRoute element={<Landing />} />} />
            <Route path="/login" element={<PublicRoute element={<Login />} />} />
            <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
