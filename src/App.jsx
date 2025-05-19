import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import GlobalStyle from './styles/GlobalStyle'
import Layout from './layouts/CommonLayout'
import AuthLayout from './layouts/AuthLayout'
import { PrivateRoute, PublicRoute } from './Routes'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const MyPage = lazy(() => import('./pages/MyPage'))
const Community = lazy(() => import('./pages/Community'))
const Landing = lazy(() => import('./pages/Landing'))
const TodayQuestion = lazy(() => import('./pages/TodayQuestion'))
const Leaves = lazy(() => import('./pages/Leaves'))
const Profile = lazy(() => import('./pages/Profile'))
const MyAnswers = lazy(() => import('./pages/MyAnswers'))
const AnswerDetail = lazy(() => import('./pages/AnswerDetail'))
const Forest = lazy(() => import('./pages/Forest'))
const Report = lazy(() => import('./pages/Report'))

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Suspense>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/home" element={<PrivateRoute element={<Home />} />} />
              <Route path="/mypage" element={<PrivateRoute element={<MyPage />} />} />
              <Route path="/community" element={<PrivateRoute element={<Community />} />} />
              <Route
                path="/question/today"
                element={<PrivateRoute element={<TodayQuestion />} />}
              />
              <Route path="/leaves" element={<PrivateRoute element={<Leaves />} />} />
              <Route
                path="/profile/:profileNickname"
                element={<PrivateRoute element={<Profile />} />}
              />
              <Route path="/my-answers" element={<PrivateRoute element={<MyAnswers />} />} />
              <Route
                path="/my-answers/:answerId"
                element={<PrivateRoute element={<AnswerDetail />} />}
              />
              <Route path="/forest" element={<PrivateRoute element={<Forest />} />} />
              <Route path="/report/:treeId" element={<PrivateRoute element={<Report />} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<PublicRoute element={<Landing />} />} />
              <Route path="/login" element={<PublicRoute element={<Login />} />} />
              <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
