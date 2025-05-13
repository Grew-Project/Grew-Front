import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const CommonLayout = () => {
  return (
    <Container>
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Nav>내비게이션바</Nav>
    </Container>
  )
}

export default CommonLayout

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
  border: 1px solid red;
`
const Nav = styled.div`
  border: 1px solid blue;
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 480px;
  height: 56px;
`
