import { ModalOverlay, ModalBox } from './ModalWrapper'
import { ConfirmButton, ButtonRow } from './ModalButton'
import styled from 'styled-components'

const Row = styled.div`
  margin-top: 1rem;
`

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  & > img {
    height: 22px;
    width: 22px;
  }
`

export const MessageModal = ({ icon, title, text, onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Title>
          <img src={icon} alt="아이콘" />
          <h3>{title}</h3>
        </Title>
        <span>{text}</span>
        <Row>
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </Row>
      </ModalBox>
    </ModalOverlay>
  )
}
