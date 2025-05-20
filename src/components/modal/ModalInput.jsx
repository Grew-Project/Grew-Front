import styled from 'styled-components'

export const ModalInput = styled.input`
  all: unset;

  border: 1px solid var(--color-secondary);
  border-radius: var(--radius-base);
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  width: 100%;
  height: 100%;
  font-size: ${props => props.fontSize || 'var(--fs15)'};
  background-color: white;
  transition: 0.2s;
  margin-top: 24px;

  &:focus {
    border-color: #8d8d8d;
  }
`
