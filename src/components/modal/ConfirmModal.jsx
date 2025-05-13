import { ModalOverlay, ModalBox } from './ModalWrapper'
import { CancelButton, ConfirmButton, ButtonRow } from './ModalButton'

export const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalBox>
        <h3>{message}</h3>
        <ButtonRow>
          <CancelButton>취소</CancelButton>
          <ConfirmButton>확인</ConfirmButton>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  )
}
