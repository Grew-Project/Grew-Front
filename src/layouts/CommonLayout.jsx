import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Footer } from '../components/Footer'

const CommonLayout = () => {
  return (
    <Container>
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
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
  padding: 104px 24px 80px 24px;
  background-color: var(--color-background);

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`
