import React, { useState } from 'react'
import logo from '../assets/logo.svg'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/Input'
import goback from '../assets/icons/goback-icon.svg'
import { Spinner } from '../components/Spinner'
import { login } from '../api/auth'
import useAuthStore from '../store/useAuthStore'

const Login = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login: setLoginState } = useAuthStore()

  const handleIdChange = e => {
    setId(e.target.value)
    setError('')
  }
  const handlePasswordChange = e => {
    setPassword(e.target.value)
    setError('')
  }
  const handleLoginClick = async e => {
    e.preventDefault()
    setError('')
    if (!id && !password) {
      setError('아이디와 비밀번호를 입력해주세요')
      return
    }
    if (!id) {
      setError('아이디를 입력해주세요')
      return
    }
    if (!password) {
      setError('비밀번호를 입력해주세요')
      return
    }

    try {
      setIsLoading(true)
      const userData = { user_id: id, password }
      const response = await login(userData)
      if (response.status === 200) {
        navigate('/home')
        setLoginState(response.data.token, id, response.data.nickname)
      }
    } catch (err) {
      if (
        err.message === '비밀번호가 일치하지 않습니다.' ||
        err.message === '존재하지 않는 아이디입니다.'
      ) {
        setError('아이디 또는 비밀번호가 일치하지 않아요')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Back to="/">
        <img src={goback} alt="back" />
      </Back>
      <img src={logo} alt="Logo" />
      <StyledForm onSubmit={handleLoginClick}>
        <InputContainer>
          <InputWrapper>
            <Input placeholder="아이디" value={id} onChange={handleIdChange} />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="비밀번호"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </InputWrapper>
          <ErrorText>{error && error}&nbsp;</ErrorText>
        </InputContainer>
        <ButtonWrapper>
          <Button primary height="48px" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : '로그인'}
          </Button>
        </ButtonWrapper>
      </StyledForm>
      <GotoSignupWrapper>
        <div>아직 그루 회원이 아니신가요?</div>
        <GotoSignup to="/signup">&nbsp;가입하기</GotoSignup>
      </GotoSignupWrapper>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-primary);
  position: relative;
`
const Back = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
`
const StyledForm = styled.form`
  width: 100%;
  max-width: 320px;
`
const InputContainer = styled.div`
  margin: 2rem 0 0.5rem 0;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  div:nth-child(2) {
    margin-bottom: 0.5rem;
  }
`
const InputWrapper = styled.div`
  height: 48px;
  margin-bottom: 1rem;
`
const ErrorText = styled.div`
  color: red;
  font-size: var(--fs12);
`
const ButtonWrapper = styled.div`
  display: flex;
  max-width: 320px;
  height: 48px;
  margin-bottom: 1rem;
`
const GotoSignupWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  font-size: var(--fs15);
  word-break: keep-all;
  overflow-wrap: break-word;
`
const GotoSignup = styled(Link)`
  font-weight: bold;
`
