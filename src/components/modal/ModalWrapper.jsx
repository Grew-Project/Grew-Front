import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalBox = styled.div`
  background: var(--color-background, #fff);
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 360px;
  text-align: center;
  position: relative;
`

export const LengthCounter = styled.div`
  position: absolute;
  right: 2rem;
  font-size: var(--fs15);
  color: var(--font-color-black);
`
