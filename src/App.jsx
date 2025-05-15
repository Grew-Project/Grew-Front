import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './layouts/CommonLayout'
import AuthLayout from './layouts/AuthLayout'
import MyPage from './pages/MyPage'
import Community from './pages/Community'
import GlobalStyle from './styles/GlobalStyle'
import Landing from './pages/Landing'
import TodayQuestion from './pages/TodayQuestion'
import Leaves from './pages/Leaves'
import { PrivateRoute, PublicRoute } from './Routes'
import { Profile } from './pages/Profile'
import { MyAnswers } from './pages/MyAnswers'

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/mypage" element={<PrivateRoute element={<MyPage />} />} />
            <Route path="/community" element={<PrivateRoute element={<Community />} />} />
            <Route path="/question/today" element={<PrivateRoute element={<TodayQuestion />} />} />
            <Route path="/leaves" element={<PrivateRoute element={<Leaves />} />} />
            <Route
              path="/profile/:profileNickname"
              element={<PrivateRoute element={<Profile />} />}
            />
            <Route path="/my-answers" element={<PrivateRoute element={<MyAnswers />} />} />
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
