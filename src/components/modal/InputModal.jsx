import styled from 'styled-components'
import { ModalOverlay, ModalBox } from './ModalWrapper'
import { CancelButton, ConfirmButton, ButtonRow } from './ModalButton'

export const InputWrapper = styled.div`
  margin-top: 1rem;
  text-align: left;
`

export const Input = styled.input`
  width: 100%;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
`

export const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: none;
  background-color: #fff;
  line-height: 1.5;

  &::placeholder {
    line-height: 1.5;
  }
`

export const ErrorText = styled.p`
  color: #d9534f;
  font-size: 0.85rem;
  margin-top: 0.3rem;
  padding-left: 0.2rem;
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

export const InputModal = ({
  icon,
  title,
  inputs,
  errors,
  action,
  values,
  onChange,
  onConfirm,
  onCancel,
}) => {
  return (
    <ModalOverlay onClick={onCancel}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Title>
          <img src={icon} alt="아이콘" />
          <h3>{title}</h3>
        </Title>
        {inputs.map(input => (
          <InputWrapper key={input.name}>
            {input.multiline ? (
              <Textarea
                placeholder={input.placeholder}
                value={values[input.name] || ''}
                onChange={e => onChange(input.name, e.target.value)}
              />
            ) : (
              <Input
                type={input.type || 'text'}
                placeholder={input.placeholder}
                value={values[input.name] || ''}
                onChange={e => onChange(input.name, e.target.value)}
              />
            )}
            {errors?.[input.name] && <ErrorText>{errors[input.name]}</ErrorText>}
          </InputWrapper>
        ))}
        <ButtonRow>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ConfirmButton onClick={onConfirm}>{action}</ConfirmButton>
        </ButtonRow>
      </ModalBox>
    </ModalOverlay>
  )
}
