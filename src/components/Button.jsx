import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  border-radius: var(--radius-base);
  padding: 0.5rem 1rem;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: ${props => props.fontSize || '15px'};
  background-color: var(--color-secondary); // 기본 배경

  ${props =>
    props.primary &&
    css`
      color: white;
      background-color: var(--color-primary); // primary일 때 덮어쓰기
    `}
`

export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}
