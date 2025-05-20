import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Loading = () => <LargeSpinner />

const LargeSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top-color: rgba(255, 255, 255, 0);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 3rem auto;
`
