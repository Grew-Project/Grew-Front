import confusionFace from '@/assets/faces/confusion-face.svg'
import angerFace from '@/assets/faces/anger-face.svg'
import happinessFace from '@/assets/faces/happiness-face.svg'
import sadnessFace from '@/assets/faces/sadness-face.svg'
import loveFace from '@/assets/faces/love-face.svg'
import flowerIcon from '@/assets/icons/flower-icon.svg'
import leafIcon from '@/assets/icons/leaf-icon.svg'
import styled from 'styled-components'
import { useState } from 'react'
import { Card } from '../components/Card'

const TabMenu = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 1.2rem;
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

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--fs15);
  margin-top: var(--fs15);

  button {
    display: flex;
    border: 1px solid var(--color-gray);
    align-items: center;
    padding: 0.4rem 0.7rem;
    border-radius: 20px;
  }

  button > img {
    margin-right: 5px;
  }
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`

const QuestionBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

const QuestionText = styled.div`
  color: var(--color-primary);
  font-weight: bold;
  flex: 1;
  font-size: 0.95rem;
`

const EmotionIcon = styled.img`
  width: 24px;
  height: 24px;
`

const UserName = styled.div`
  font-weight: bold;
  color: black;
  white-space: nowrap;
`

const AnswerPreview = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`

const menuItems = [
  { id: 'all', label: '전체' },
  { id: 'confusion', icon: confusionFace, label: '당황' },
  { id: 'anger', icon: angerFace, label: '화남' },
  { id: 'happiness', icon: happinessFace, label: '행복' },
  { id: 'sadness', icon: sadnessFace, label: '슬픔' },
  { id: 'love', icon: loveFace, label: '사랑' },
]

const posts = [
  {
    _id: '6823000d699e4e33dd48cece',
    nickname: 'user2',
    question_id: 1,
    content:
      '오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.오늘은 좀 슬펐어요.',
    emotion_type: 'Sadness',
    created_at: '2025-05-13T17:00:00.000Z',
  },
  {
    _id: '6823000d699e4e33dd48cecd',
    nickname: 'user1',
    question_id: 1,
    content: '오늘은 기분이 좋아요!',
    emotion_type: 'Happiness',
    created_at: '2025-05-13T09:00:00.000Z',
  },
  {
    _id: '6823000d699e4e33dd48cecf',
    nickname: 'user3',
    question_id: 2,
    content: '사랑하는 사람과 시간을 보냈어요.',
    emotion_type: 'Love',
    created_at: '2025-05-13T00:00:00.000Z',
  },
  {
    _id: '6823000d699e4e33dd48ced0',
    nickname: 'user4',
    question_id: 2,
    content: '오늘은 좀 화가 났어요.',
    emotion_type: 'Anger',
    created_at: '2025-05-13T00:00:00.000Z',
  },
]

const emotionIcons = {
  confusion: confusionFace,
  anger: angerFace,
  happiness: happinessFace,
  sadness: sadnessFace,
  love: loveFace,
}

const Community = () => {
  const [selectedFace, setSelectedFace] = useState('all')

  const filteredPosts = posts.filter(post => {
    const emotion = post.emotion_type.toLowerCase()
    return selectedFace === 'all' || emotion === selectedFace
  })

  const getEmotionIcon = emotionType => {
    return emotionIcons[emotionType.toLowerCase()]
  }

  return (
    <>
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
      {filteredPosts.map(post => (
        <Card>
          <CardHeader>
            <QuestionBlock>
              <QuestionText>가장 나답다고 느꼈던 순간은?</QuestionText>
              <EmotionIcon src={getEmotionIcon(post.emotion_type)} alt="당황" />
            </QuestionBlock>
            <UserName>{post.nickname}</UserName>
          </CardHeader>
          <AnswerPreview>{post.content}</AnswerPreview>
          <Buttons>
            <button>
              <img src={flowerIcon} alt="응원꽃" />
              <span>응원꽃 보내기</span>
            </button>
            <button>
              <img src={leafIcon} alt="잎사귀" />
              <span>잎사귀 보내기</span>
            </button>
          </Buttons>
        </Card>
      ))}
    </>
  )
}

export default Community
