import logo from '../assets/logo.svg'
import styled from 'styled-components'
import { Button } from '../components/Button'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Container>
      <img src={logo} alt="Logo" />
      <Title>하루 한 잎, 나를 키우는 시간</Title>
      <Desc>
        매일의 질문을 통해 나를 찾고, <br />
        마음의 나무를 가꿔요
      </Desc>
      <ButtonWrapper to="/login">
        <Button primary height="48px">
          로그인
        </Button>
      </ButtonWrapper>
      <ButtonWrapper to="signup">
        <Button primary>회원가입</Button>
      </ButtonWrapper>
    </Container>
  )
}

export default Landing

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
  color: var(--color-primary);
`
const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
`
const Desc = styled.div`
  text-align: center;
  word-break: keep-all;
  overflow-wrap: break-word;
`
const ButtonWrapper = styled(Link)`
  width: 95%;
  max-width: 320px;
  height: 48px;
`
