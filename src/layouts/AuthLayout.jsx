import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const AuthLayout = () => {
  return (
    <Container>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Container>
  )
}

export default AuthLayout

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
  max-width: 480px;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  padding: 52px 24px 80px 24px;
`
