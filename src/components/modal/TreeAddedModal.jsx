import { ModalOverlay, ModalBox } from './ModalWrapper'
import { ConfirmButton, ButtonRow } from './ModalButton'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Row = styled.div`
  margin-top: 1rem;
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: var(--fs15);
  font-weight: bold;
  & > img {
    height: 22px;
    width: 22px;
  }
`

export const TreeAddedModal = ({ text }) => {
  const navigate = useNavigate()
  return (
    <ModalOverlay>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Title>{text}</Title>
        <Row>
          <ConfirmButton onClick={() => navigate('/forest')}>마음숲</ConfirmButton>
        </Row>
      </ModalBox>
    </ModalOverlay>
  )
}
