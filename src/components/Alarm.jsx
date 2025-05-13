import styled from 'styled-components'

const AlarmWrapper = styled.div`
  position: absolute;
  bottom: calc(56px + var(--fs12));
  width: 90%;
  padding: 1rem 0;
  background: var(--color-secondary);
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: var(--radius-base);
`

const AlarmText = styled.div`
  font-size: var(--fs15);
  font-weight: bold;
  color: var(--color-black);
`

const AlarmSubText = styled.div`
  font-size: var(--fs12, 12px);
  color: var(--color-dark-gray);
  margin-top: 0.25rem;
`

export const Alarm = ({ text, subtext }) => {
  return (
    <AlarmWrapper>
      <AlarmText>{text}</AlarmText>
      <AlarmSubText>{subtext}</AlarmSubText>
    </AlarmWrapper>
  )
}
