import styled from 'styled-components'

const StyledEmpty = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: var(--font-color-gray);
`

export const Empty = ({ children }) => {
  return <StyledEmpty>{children}</StyledEmpty>
}

export default Empty
