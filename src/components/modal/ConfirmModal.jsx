import { ModalOverlay, ModalBox } from './ModalWrapper'
import { CancelButton, ConfirmButton, ButtonRow } from './ModalButton'

export const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalBox>
        <h3>{message}</h3>
        <ButtonRow>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  )
}
