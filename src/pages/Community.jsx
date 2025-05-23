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
import { useCallback, useEffect, useState } from 'react'
import { checkFlower, getPostList, sendFlower, sendLeaf } from '../api/community'
import { InputModal } from '../components/modal/InputModal'
import { MessageModal } from '../components/modal/MessageModal'
import { ActionButton } from '../components/ActionButton'
import { AnswerCard } from '../components/AnswerCard'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import Empty from '../components/Empty'
import useUIStore from '../store/useAlarmStore'

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
  const [modalType, setModalType] = useState(null)
  const [expandedPost, setExpandedPost] = useState(null)
  const [targetNickname, setTargetNickname] = useState('')
  const [leafMessage, setLeafMessage] = useState('')
  const [flowerSentMap, setFlowerSentMap] = useState({})
  const [isLoadingPostList, setIsLoadingPostList] = useState(true)
  const [isLoadingFlowerStatus, setIsLoadingFlowerStatus] = useState(true)

  const navigate = useNavigate()
  const nickname = useAuthStore(state => state.nickname)
  const showToast = useUIStore(state => state.showToast)

  useEffect(() => {
    handleRefresh()
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

  const handleSendFlower = useCallback(
    async targetNickname => {
      setTargetNickname(targetNickname)
      try {
        await sendFlower(targetNickname, nickname)
        setModalType('flower')
        setFlowerSentMap(prev => ({ ...prev, [targetNickname]: true }))
      } catch (error) {
        console.error(error)
      }
    },
    [nickname]
  )

  const handlClickLeafBtn = targetNickname => {
    setTargetNickname(targetNickname)
    setModalType('leaf')
    setLeafMessage('')
  }

  const handleSendLeaf = async targetNickname => {
    try {
      await sendLeaf(nickname, targetNickname, leafMessage)
      setModalType(null)
      showToast(`${targetNickname} 님에게 잎사귀를 보냈어요!`)
    } catch (error) {
      showToast(`잎사귀 보내기에 실패했어요`)
    }
  }

  const handleRefresh = async () => {
    setIsLoadingPostList(true)
    setIsLoadingFlowerStatus(true)

    try {
      const postData = await getPostList()
      setPostList(postData)

      const uniqueNicknames = [...new Set(postData.map(post => post.nickname))]

      const results = await Promise.all(
        uniqueNicknames.map(receiverNickname =>
          checkFlower(receiverNickname, nickname).then(data => ({
            receiverNickname,
            data,
          }))
        )
      )

      const statusMap = results.reduce((acc, { receiverNickname, data }) => {
        acc[receiverNickname] = data
        return acc
      }, {})

      setFlowerSentMap(statusMap)
    } catch (error) {
      console.error('새로고침 중 오류:', error)
    } finally {
      setIsLoadingPostList(false)
      setIsLoadingFlowerStatus(false)
    }
  }

  const isLoading = isLoadingPostList || isLoadingFlowerStatus

  return (
    <>
      <Header
        center={<span>커뮤니티</span>}
        right={
          <button onClick={handleRefresh}>
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
