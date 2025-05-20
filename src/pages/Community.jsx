import confusionFace from '@/assets/faces/confusion-face.svg'
import angerFace from '@/assets/faces/anger-face.svg'
import happinessFace from '@/assets/faces/happiness-face.svg'
import sadnessFace from '@/assets/faces/sadness-face.svg'
import loveFace from '@/assets/faces/love-face.svg'
import flowerIcon from '@/assets/icons/flower-icon.svg'
import leafIcon from '@/assets/icons/leaf-icon.svg'
import profileIcon from '@/assets/icons/profile-icon.svg'
import refreshIcon from '@/assets/icons/refresh-icon.svg'

import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { checkFlower, getPostList, sendFlower, sendLeaf } from '../api/community'
import { InputModal } from '../components/modal/InputModal'
import { MessageModal } from '../components/modal/MessageModal'
import { ActionButton } from '../components/ActionButton'
import { AnswerCard } from '../components/AnswerCard'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { Alarm } from '../components/Alarm'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import Empty from '../components/Empty'

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
  const [modalType, setModalType] = useState(null)
  const [expandedPost, setExpandedPost] = useState(null)
  const [targetNickname, setTargetNickname] = useState('')
  const [leafMessage, setLeafMessage] = useState('')
  const [flowerSentMap, setFlowerSentMap] = useState({}) // nickname → true/false
  const [isSentLeaf, setIsSentLeaf] = useState(false)

  const navigate = useNavigate()

  const nickname = useAuthStore(state => state.nickname)

  const fetchPostList = async () => {
    try {
      setIsLoading(true)
      const data = await getPostList()
      setPostList(data)
      setTimeout(() => {}, 500)
    } catch (error) {
      console.log(error.message) // 수정 예정
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPostList()
  }, [])

  useEffect(() => {
    const fetchFlowerStatus = async () => {
      const uniqueNicknames = [...new Set(postList.map(post => post.nickname))]
      const statusMap = {}

      for (const receiverNickname of uniqueNicknames) {
        const data = await checkFlower(receiverNickname, nickname)
        statusMap[receiverNickname] = data
      }

      setFlowerSentMap(statusMap)
      console.log(nickname)
      console.log(statusMap)
    }

    if (postList.length > 0) fetchFlowerStatus()
  }, [postList])

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

  const handleSendFlower = async targetNickname => {
    setTargetNickname(targetNickname)
    try {
      await sendFlower(targetNickname, nickname)
      setModalType('flower')
      setFlowerSentMap(prev => ({ ...prev, [targetNickname]: true }))
    } catch (error) {
      console.error(error)
    }
  }

  const handlClickLeafBtn = targetNickname => {
    setTargetNickname(targetNickname)
    setModalType('leaf')
    setLeafMessage('')
  }

  const handleSendLeaf = targetNickname => {
    sendLeaf(nickname, targetNickname, leafMessage).then(() => {
      setIsSentLeaf(true)
      setTimeout(() => {
        setIsSentLeaf(false)
      }, 3000)
    })
    setModalType(null)
  }

  return (
    <>
      <Header
        center={<span>커뮤니티</span>}
        right={
          <button onClick={fetchPostList}>
            <img src={refreshIcon} alt="새로고침" />
          </button>
        }
      />

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
      <Padding />
      {isLoading ? (
        <Loading />
      ) : filteredPosts.length === 0 ? (
        <Empty>아직 작성된 글이 없어요</Empty>
      ) : (
        filteredPosts.map(post => (
          <AnswerCard
            key={post._id}
            post={post}
            onCardClick={() => handleCardClick(post._id)}
            isExpanded={expandedPost === post._id}
            emotionIcon={getEmotionIcon(post.emotion_type)}
          >
            <Buttons>
              <ActionButton
                disabled={flowerSentMap[post.nickname]}
                icon={flowerIcon}
                text="응원꽃 보내기"
                onClick={() => handleSendFlower(post.nickname)}
              />
              <ActionButton
                icon={leafIcon}
                text="잎사귀 보내기"
                onClick={() => handlClickLeafBtn(post.nickname)}
              />
            </Buttons>
            {expandedPost === post._id && (
              <ProfileButton>
                <ActionButton
                  icon={profileIcon}
                  text="프로필 가기"
                  onClick={() => navigate(`/profile/${post.nickname}`)}
                />
              </ProfileButton>
            )}
          </AnswerCard>
        ))
      )}
      {modalType === 'flower' && (
        <MessageModal
          icon={flowerIcon}
          title={'응원꽃 보내기'}
          text={`${targetNickname} 님에게 응원꽃을 보냈습니다!`}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType === 'leaf' && (
        <InputModal
          icon={leafIcon}
          title={`${targetNickname} 님에게 잎사귀 보내기`}
          inputs={[
            { name: 'message', placeholder: '친구에게 마음을 적어 보내보세요', multiline: true },
          ]}
          action="전송"
          values={{ message: leafMessage }}
          onChange={(name, value) => setLeafMessage(value)}
          onConfirm={() => {
            handleSendLeaf(targetNickname)
          }}
          onCancel={() => setModalType(null)}
        />
      )}
      {isSentLeaf && <Alarm text={`${targetNickname} 님에게 잎사귀를 보냈어요!`} />}
    </>
  )
}

export default Community

const TabMenu = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 0.6rem;
  padding-bottom: 0.6rem;
  width: calc(100% - 48px);
  max-width: calc(480px - 48px);
  position: fixed;
  top: 104px;
  background-color: var(--color-background);
`
const Padding = styled.div`
  height: calc(40px + 1.2rem);
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
    height: 17px;
    width: 17px;
  }
`

const ProfileButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.6rem;
`
