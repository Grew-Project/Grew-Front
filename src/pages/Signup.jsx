import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/Input'
import goback from '../assets/icons/goback-icon.svg'
import { Spinner } from '../components/Spinner'
import { signup } from '../api/auth'
import useAuthStore from '../store/useAuthStore'

const Signup = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [nickname, setNickname] = useState('')
  const [idError, setIdError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')
  const [nicknameError, setNicknameError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [welcomeName, setWelcomeName] = useState('')
  const navigate = useNavigate()
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home')
    }
  }, [isLoggedIn, navigate])

  const handleIdChange = e => {
    if (e.target.value.length <= 16) {
      setId(e.target.value)
    }
    setIdError('')
  }
  const handlePasswordChange = e => {
    if (e.target.value.length <= 16) {
      setPassword(e.target.value)
    }
    setPasswordError('')
  }
  const handlePasswordConfirmChange = e => {
    if (e.target.value.length <= 16) {
      setPasswordConfirm(e.target.value)
    }
    setPasswordConfirmError('')
  }
  const handleNicknameChange = e => {
    setNickname(e.target.value)
    setNicknameError('')
  }
  const handleLoginClick = async e => {
    e.preventDefault()
    let hasError = false

    setIdError('')
    setPasswordError('')
    setNicknameError('')

    if (!id) {
      setIdError('아이디를 입력해주세요')
      hasError = true
    }
    if (!password) {
      setPasswordError('비밀번호를 입력해주세요')
      hasError = true
    } else if (password.length < 8) {
      setPasswordError('비밀번호는 8~16자로 입력해주세요')
      hasError = true
    }
    if (!passwordConfirm) {
      setPasswordConfirmError('비밀번호를 다시 입력해주세요')
      hasError = true
    } else if (password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 일치하지 않아요')
      hasError = true
    }
    if (!nickname) {
      setNicknameError('닉네임을 입력해주세요')
      hasError = true
    } else if (!/^[가-힣]+$/.test(nickname.trim())) {
      setNicknameError('닉네임은 ‘가나다’처럼 완성된 한글만 입력할 수 있어요')
      hasError = true
    }
    if (hasError) return

    try {
      setIsLoading(true)
      const userData = { user_id: id, password, nickname }
      const response = await signup(userData)
      if (response.message === '회원가입 성공') {
        setWelcomeName(nickname)
      }
      console.log(response)
    } catch (err) {
      if (err.message === '이미 존재하는 아이디입니다.') {
        setIdError(err.message)
      } else if (err.message === '이미 사용 중인 닉네임입니다.') {
        setNicknameError(err.message)
      } else {
        setNicknameError('잠시 후 다시 시도해주세요')
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
      {welcomeName ? (
        <Welcome>
          <div>{nickname}님 안녕하세요</div>
          <GotoLogin to="/login">로그인하러가기</GotoLogin>
        </Welcome>
      ) : (
        <>
          <StyledForm onSubmit={handleLoginClick}>
            <InputContainer>
              <InputWrapper>
                <Input placeholder="아이디" value={id} onChange={handleIdChange} />
              </InputWrapper>
              <ErrorText>{idError && idError}&nbsp;</ErrorText>
              <InputWrapper>
                <Input
                  placeholder="비밀번호"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </InputWrapper>
              <ErrorText>{passwordError && passwordError}&nbsp;</ErrorText>
              <InputWrapper>
                <Input
                  placeholder="비밀번호 확인"
                  type="password"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                />
              </InputWrapper>
              <ErrorText>{passwordConfirmError && passwordConfirmError}&nbsp;</ErrorText>
              <InputWrapper>
                <Input placeholder="닉네임" value={nickname} onChange={handleNicknameChange} />
              </InputWrapper>
              <ErrorText>{nicknameError && nicknameError}&nbsp;</ErrorText>
            </InputContainer>
            <ButtonWrapper>
              <Button primary height="48px" type="submit" disabled={isLoading}>
                {isLoading ? <Spinner /> : '회원가입'}
              </Button>
            </ButtonWrapper>
          </StyledForm>
          <GotoLoginWrapper>
            <div>이미 계정이 있으신가요?</div>
            <GotoLogin to="/login">&nbsp;로그인</GotoLogin>
          </GotoLoginWrapper>
        </>
      )}
    </Container>
  )
}

export default Signup

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-primary);
  position: relative;
`
const Welcome = styled.div`
  font-size: var(--fs20);
  text-align: center;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
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
`
const InputWrapper = styled.div`
  height: 48px;
`
const ErrorText = styled.div`
  color: red;
  font-size: var(--fs12);
  margin: 0.25rem 0 0.5rem 0;
`
const ButtonWrapper = styled.div`
  display: flex;
  max-width: 320px;
  height: 48px;
  margin-bottom: 1rem;
`
const GotoLoginWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  display: flex;
  font-size: var(--fs15);
  word-break: keep-all;
  overflow-wrap: break-word;
`
const GotoLogin = styled(Link)`
  font-weight: bold;
`
