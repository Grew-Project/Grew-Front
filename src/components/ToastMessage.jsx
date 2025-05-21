import React from 'react'
import useUIStore from '../store/useAlarmStore'
import styled, { keyframes } from 'styled-components'

const fadeSlide = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  10% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  90% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
`

export const ToastMessage = () => {
  const message = useUIStore(state => state.toastMessage)
  if (!message) return null

  return <Toast>{message}</Toast>
}

const Toast = styled.div`
  position: fixed;
  bottom: calc(56px + var(--fs12));
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-secondary);
  padding: 1rem 0;
  border-radius: var(--radius-base);
  z-index: 1000;
  font-size: 0.9rem;
  opacity: 0.8;
  width: 90%;
  max-width: 400px;
  text-align: center;
  font-weight: bold;
  animation: ${fadeSlide} 3s ease forwards;
`
