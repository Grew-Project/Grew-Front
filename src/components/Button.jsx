import styled, { css } from 'styled-components'

const StyledButton = styled.button`
  border-radius: var(--radius-base);
  padding: 0.5rem 1rem;
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: ${props => props.fontSize || '15px'};
  background-color: var(--color-secondary); // 기본 배경
  color: var(--font-color-black);

  ${props =>
    props.primary &&
    css`
      background-color: var(--color-primary);
      color: white;
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;

    ${props =>
      props.primary
        ? css`
            background-color: var(--color-primary);
            color: var(--color-disabled-text);
          `
        : css`
            background-color: var(--color-secondary);
            color: var(--color-disabled-text);
          `}
  }
`

export const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}
