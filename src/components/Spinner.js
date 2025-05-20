import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: ${({ color }) => color || 'white'};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  margin: 0 auto;
`
