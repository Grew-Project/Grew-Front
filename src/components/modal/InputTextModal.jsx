import { ModalOverlay, ModalBox, LengthCounter } from './ModalWrapper'
import { CancelButton, ConfirmButton, ButtonRow } from './ModalButton'
import { ModalInput } from './ModalInput'
import { useState } from 'react'

export const InputTextModal = ({ title, inputText, onChange, onConfirm, onCancel, maxLength }) => {
  return (
    <ModalOverlay>
      <ModalBox>
        <form onSubmit={onConfirm}>
          <h3>{title}</h3>
          {maxLength && (
            <LengthCounter>
              {inputText.length}/{maxLength}
            </LengthCounter>
          )}
          <ModalInput value={inputText} onChange={onChange} />
          <ButtonRow>
            <CancelButton onClick={onCancel} type="button">
              취소
            </CancelButton>
            <ConfirmButton type="submit">확인</ConfirmButton>
          </ButtonRow>
        </form>
      </ModalBox>
    </ModalOverlay>
  )
}
