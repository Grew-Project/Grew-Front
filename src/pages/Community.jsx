import confusionFace from '@/assets/faces/confusion-face.svg'
import angerFace from '@/assets/faces/anger-face.svg'
import happinessFace from '@/assets/faces/happiness-face.svg'
import sadnessFace from '@/assets/faces/sadness-face.svg'
import loveFace from '@/assets/faces/love-face.svg'
import styled from 'styled-components'
import { useState } from 'react'

const TabMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
`

const TabButton = styled.button`
  width: 70px;
  height: 40px;
  display: flex;
  padding: 0;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;

  &.active {
    border-radius: 20px;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray);
    font-weight: bold;
  }

  img {
    width: 26px;
    height: 26px;
    object-fit: contain;
    display: block;
  }
`

const menuItems = [
  { id: 'all', label: '전체' },
  { id: 'confusion', icon: confusionFace, label: '당황' },
  { id: 'anger', icon: angerFace, label: '화남' },
  { id: 'happiness', icon: happinessFace, label: '행복' },
  { id: 'sadness', icon: sadnessFace, label: '슬픔' },
  { id: 'love', icon: loveFace, label: '사랑' },
]

const Community = () => {
  const [selectedFace, setSelectedFace] = useState('all')

  return (
    <TabMenu>
      {menuItems.map(item => (
        <TabButton
          key={item.id}
          onClick={() => setSelectedFace(item.id)}
          className={selectedFace === item.id ? 'active' : ''}
        >
          {item.icon ? <img src={item.icon} alt={item.label} /> : <span>{item.label}</span>}
        </TabButton>
      ))}
    </TabMenu>
  )
}

export default Community
