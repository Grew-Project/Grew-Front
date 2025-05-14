import confusionFace from '@/assets/faces/confusion-face.svg'
import angerFace from '@/assets/faces/anger-face.svg'
import happinessFace from '@/assets/faces/happiness-face.svg'
import sadnessFace from '@/assets/faces/sadness-face.svg'
import loveFace from '@/assets/faces/love-face.svg'
import flowerIcon from '@/assets/icons/flower-icon.svg'
import leafIcon from '@/assets/icons/leaf-icon.svg'
import profileIcon from '@/assets/icons/profile-icon.svg'
import refreshIcon from '@/assets/icons/refresh-icon.svg'
import gobackIcon from '@/assets/icons/goback-icon.svg'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Card } from '../components/Card'
import { getPostList } from '../api/community'
import { Spinner } from '../components/Spinner'

const menuItems = [
  { id: 'all', label: '전체' },
  { id: 'confusion', icon: confusionFace, label: '당황' },
  { id: 'anger', icon: angerFace, label: '화남' },
  { id: 'happiness', icon: happinessFace, label: '행복' },
  { id: 'sadness', icon: sadnessFace, label: '슬픔' },
  { id: 'love', icon: loveFace, label: '사랑' },
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
  const [postList, setPostList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [expandedPost, setExpandedPost] = useState(null)

  const fetchPostList = async () => {
    try {
      setIsLoading(true)
      const data = await getPostList()
      setPostList(data)
      setTimeout(() => {
        setIsLoading(false)
      }, 100)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchPostList()
  }, [])

  const filteredPosts = postList.filter(post => {
    const emotion = post.emotion_type.toLowerCase()
    return selectedFace === 'all' || emotion === selectedFace
  })

  const getEmotionIcon = emotionType => {
    return emotionIcons[emotionType.toLowerCase()]
  }

  const handleCardClick = id => {
    setExpandedPost(prev => (prev === id ? null : id))
  }

  return (
    <>
      <Header>
        <button>
          <img src={gobackIcon} alt="뒤로가기" />
        </button>
        <h2>커뮤니티</h2>
        <button onClick={fetchPostList}>
          <img src={refreshIcon} alt="새로고침" />
        </button>
      </Header>
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
      {isLoading ? (
        <Spinner /> // 수정 예정
      ) : (
        filteredPosts.map(post => (
          <Card key={post.id} onClick={() => handleCardClick(post._id)}>
            <CardHeader>
              <QuestionBlock>
                <QuestionText>{post.question_content}</QuestionText>
                <img src={getEmotionIcon(post.emotion_type)} alt="당황" />
              </QuestionBlock>
              <span>{post.nickname}</span>
            </CardHeader>
            <AnswerPreview expanded={expandedPost === post._id}>
              {post.answer_content}
            </AnswerPreview>
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
            {expandedPost === post._id && (
              <ProfileButton>
                <img src={profileIcon} alt="프로필" />
                <span>프로필 가기</span>
              </ProfileButton>
            )}
          </Card>
        ))
      )}
    </>
  )
}

export default Community

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
  margin-bottom: 0.6rem;

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
  font-weight: bold;
`

const QuestionBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`

const QuestionText = styled.div`
  color: var(--color-primary);
  margin-right: 0.3rem;
`

const AnswerPreview = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ expanded }) => (expanded ? '' : '-webkit-line-clamp: 2;')}
`

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-gray);
  background-color: white;
  border-radius: 999px;
  padding: 0.4rem 1rem;
  margin: auto;
  font-size: 0.85rem;
  color: #333;
  gap: 0.5rem;

  img {
    width: 18px;
    height: 18px;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--fs20);
`
