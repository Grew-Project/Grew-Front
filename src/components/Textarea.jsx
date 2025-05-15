import styled from 'styled-components'

const StyledTextarea = styled.textarea`
  all: unset;

  border: 1px solid var(--color-secondary);
  border-radius: var(--radius-base);
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  height: 100%;
  font-size: ${props => props.fontSize || 'var(--fs15)'};
  background-color: white;
  transition: 0.2s;

  &:focus {
    border-color: #8d8d8d;
  }
`

export const Textarea = ({ children, ...props }) => {
  return <StyledTextarea {...props}>{children}</StyledTextarea>
}
