import styled from 'styled-components'

export const Back = styled.div`
  width: 32px;
  height: 32px;
  &:hover {
    cursor: pointer;
  }
`
export const PageTitle = styled.div`
  display: flex;
  position: absolute;
  top: 52px;
  left: 70px;
  height: 32px;
  align-items: center;
  font-weight: 100;
  font-size: var(--fs15);
  color: var(--font-color-gray);
  div:nth-of-type(2) {
    font-weight: bold;
    color: var(--font-color-black);
  }
  div:nth-of-type(3) {
    margin: 0 0.5rem;
  }
`
export const ButtonWrapper = styled.div`
  height: 65px;
`

export const EmotionTitle = styled.div`
  font-size: var(--fs15);
  font-weight: 100;
  display: flex;
  justify-content: center;
`
export const EmotionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
export const Emotion = styled.button`
  background-color: ${({ selected }) => (selected ? '#eeeeee' : '')};
  border: 1px solid ${({ selected }) => (selected ? 'var(--color-gray)' : 'var(--color-white)')};

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2% 4%;
  border-radius: var(--radius-base);
  &:hover {
    cursor: pointer;
  }
`

export const StyledAnswerForm = styled.form`
  height: calc(100% - 32px);
  display: flex;
  flex-direction: column;
`
export const AnswerTitle = styled.div`
  font-size: var(--fs20);
  font-weight: bold;
  padding-bottom: 1rem;
  word-break: keep-all;
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: center;
`
export const LengthCheck = styled.div`
  color: var(--font-color-gray);
  text-align: end;
  font-size: var(--fs15);
  margin-bottom: 0.2rem;
`
export const TextareaWrapper = styled.div`
  width: 100%;
  flex: 1;
`
export const CheckBoxWrapper = styled.div`
  height: 36px;
  font-size: var(--fs15);
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: end;
  label {
    padding: 0.5rem 0 0.5rem 0.5rem;
    display: flex;
    &:hover {
      cursor: pointer;
    }
  }
`
export const HiddenCheckBox = styled.input`
  display: none;
`
export const CheckBoxIconWrapper = styled.div`
  width: 21px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.2rem;
  img {
    width: 21px;
    height: 21px;
  }
`
export const UncheckedBox = styled.div`
  width: 21px;
  height: 21px;
  background-color: var(--color-secondary);
  /* border: 1px solid var(--color-secondary); */
  border-radius: 2px;
`
