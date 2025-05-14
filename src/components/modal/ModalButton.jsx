import styled from 'styled-components'

export const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`

export const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--radius-base);
  background: var(--color-gray);
  font-weight: bold;
`

export const ConfirmButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--radius-base);
  background: var(--color-primary);
  color: white;
  font-weight: bold;
`
