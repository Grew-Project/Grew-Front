import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useAuthStore from '../store/useAuthStore'
import { checkFlower, getUserAnswers, sendFlower, sendLeaf } from '../api/community'
import flowerIcon from '@/assets/icons/flower-icon.svg'
import leafIcon from '@/assets/icons/leaf-icon.svg'
import nextIcon from '@/assets/icons/next-icon.svg'
import { InputModal } from '../components/modal/InputModal'
import { MessageModal } from '../components/modal/MessageModal'
import { ActionButton } from '../components/ActionButton'
import TitleListItem from '../components/TitleListItem'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import useUIStore from '../store/useAlarmStore'
import { ProfileCard } from '../components/ProfileCard'

const Profile = () => {
  const nickname = useAuthStore(state => state.nickname)
  const showToast = useUIStore(state => state.showToast)

  const { profileNickname } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [leafMessage, setLeafMessage] = useState('')
  const [modalType, setModalType] = useState(null)
  const [postList, setPostList] = useState([])
  const [expandedPost, setExpandedPost] = useState(null)
  const [flowerSent, setFlowerSent] = useState(false)

  const fetchUserAnswers = async () => {
    try {
      setIsLoading(true)
      const data = await getUserAnswers(profileNickname)
      setPostList(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchUserAnswers()
  }, [])

  useEffect(() => {
    const fetchFlowerStatus = async () => {
      try {
        const data = await checkFlower(profileNickname, nickname)
        setFlowerSent(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchFlowerStatus()
  }, [])

  const handleSendFlower = () => {
    setModalType('flower')
    setFlowerSent(true)
    sendFlower(profileNickname, nickname)
  }

  const handleSendLeaf = async () => {
    try {
      await sendLeaf(nickname, profileNickname, leafMessage)
      setModalType(null)
      showToast(`${profileNickname} 님에게 잎사귀를 보냈어요!`)
    } catch (error) {
      showToast(`잎사귀 보내기에 실패했어요`)
    }
  }

  const handlClickLeafBtn = () => {
    setModalType('leaf')
    setLeafMessage('')
  }

  return (
    <>
      <Header />

      <Name>{profileNickname}</Name>
      <Buttons>
        <ActionButton
          icon={flowerIcon}
          text="응원꽃 보내기"
          disabled={flowerSent}
          onClick={() => handleSendFlower()}
        />
        <ActionButton icon={leafIcon} text="잎사귀 보내기" onClick={() => handlClickLeafBtn()} />
      </Buttons>
      {isLoading ? (
        <Loading />
      ) : (
        postList.map(post => {
          const isExpanded = expandedPost === post.answer_id

          if (isExpanded) {
            return (
              <ProfileCard
                key={post.answer_id}
                post={post}
                showToggleIcon
                isExpanded
                onCardClick={() => setExpandedPost(null)}
              ></ProfileCard>
            )
          }

          return (
            <TitleListItem
              primary
              key={post.answer_id}
              onItemClick={() => setExpandedPost(post.answer_id)}
              title={post.question_content}
              icon={nextIcon}
            />
          )
        })
      )}

      {modalType === 'flower' && (
        <MessageModal
          icon={flowerIcon}
          title={'응원꽃 보내기'}
          text={`${profileNickname} 님에게 응원꽃을 보냈습니다!`}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType === 'leaf' && (
        <InputModal
          icon={leafIcon}
          title={`${profileNickname} 님에게 잎사귀 보내기`}
          inputs={[
            { name: 'message', placeholder: '친구에게 마음을 적어 보내보세요', multiline: true },
          ]}
          action="전송"
          values={{ message: leafMessage }}
          onChange={(name, value) => setLeafMessage(value)}
          onConfirm={() => {
            handleSendLeaf(leafMessage)
          }}
          onCancel={() => setModalType(null)}
        />
      )}
    </>
  )
}

export default Profile

const Name = styled.h2`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--fs15);
  margin-bottom: 2rem;

  button > img {
    margin-right: 5px;
    height: 17px;
    width: 17px;
  }
`
