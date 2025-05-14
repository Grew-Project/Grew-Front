import styled from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.4rem 0.7rem;
  border: 1px solid var(--color-gray);
  border-radius: 20px;
  background-color: white;
  cursor: pointer;

  img {
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }
`

export const ActionButton = ({ icon, text, onClick }) => {
  return (
    <StyledButton
      onClick={e => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      <img src={icon} alt={text} />
      <span>{text}</span>
    </StyledButton>
  )
}
