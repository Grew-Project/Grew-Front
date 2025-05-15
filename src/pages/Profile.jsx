import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ActionButton } from '../components/ActionButton'
import flowerIcon from '@/assets/icons/flower-icon.svg'
import leafIcon from '@/assets/icons/leaf-icon.svg'
import { getUserAnswers, sendFlower, sendLeaf } from '../api/community'
import { InputModal } from '../components/modal/InputModal'
import { MessageModal } from '../components/modal/MessageModal'
import styled from 'styled-components'
import { AnswerCard } from '../components/AnswerCard'
import leftIcon from '@/assets/icons/goback-icon.svg'
import { Spinner } from '../components/Spinner'

export const Profile = () => {
  const { nickname } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [leafMessage, setLeafMessage] = useState('')
  const [modalType, setModalType] = useState(null)
  const [postList, setPostList] = useState([])
  const [expandedPost, setExpandedPost] = useState(null)

  const fetchUserAnswers = async () => {
    try {
      setIsLoading(true)
      const data = await getUserAnswers(nickname)
      setPostList(data)
      console.log(data)
      setTimeout(() => {
        setIsLoading(false)
      }, 100)
    } catch (error) {
      console.log(error.message) // 수정 예정
    }
  }

  useEffect(() => {
    fetchUserAnswers(nickname)
  }, [])

  const handleSendFlower = () => {
    setModalType('flower')
    sendFlower(nickname, '정서윤') // 수정 예정
  }

  const handleSendLeaf = () => {
    setModalType('leaf')
    setLeafMessage('')
  }

  useEffect(() => {}, [nickname])

  return (
    <div>
      <Name>{nickname}</Name>
      <Buttons>
        <ActionButton
          icon={flowerIcon}
          text="응원꽃 보내기"
          onClick={() => handleSendFlower(nickname)}
        />
        <ActionButton
          icon={leafIcon}
          text="잎사귀 보내기"
          onClick={() => handleSendLeaf(nickname)}
        />
      </Buttons>
      {isLoading ? (
        <Spinner /> // 수정 예정
      ) : (
        postList.map(post => {
          const isExpanded = expandedPost === post.created_at

          if (isExpanded) {
            return (
              <AnswerCard
                key={post.created_at}
                post={post}
                showToggleIcon
                // emotionIcon={getEmotionIcon(post.emotion_type)}
                isExpanded
                onCardClick={() => setExpandedPost(null)}
              ></AnswerCard>
            )
          }

          return (
            <CollapsedCard key={post.created_at} onClick={() => setExpandedPost(post.created_at)}>
              <CollapsedHeader>
                <CollapsedQuestion>
                  <span>{post.question_content}</span>
                  {/* <img src={getEmotionIcon(post.emotion_type)} alt="감정" /> */}
                </CollapsedQuestion>
                <ArrowIcon src={leftIcon} style={{ transform: 'rotate(180deg)' }} alt="화살표" />
              </CollapsedHeader>
            </CollapsedCard>
          )
        })
      )}

      {modalType === 'flower' && (
        <MessageModal
          icon={flowerIcon}
          title={'응원꽃 보내기'}
          text={`${nickname} 님에게 응원꽃을 보냈습니다!`}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType === 'leaf' && (
        <InputModal
          icon={leafIcon}
          title={`${nickname} 님에게 잎사귀 보내기`}
          inputs={[
            { name: 'message', placeholder: '친구에게 마음을 적어 보내보세요', multiline: true },
          ]}
          action="전송"
          values={{ message: leafMessage }}
          onChange={(name, value) => setLeafMessage(value)}
          onConfirm={() => {
            sendLeaf(nickname, '정서윤', leafMessage) // 수정 예정
            setModalType(null)
          }}
          onCancel={() => setModalType(null)}
        />
      )}
    </div>
  )
}

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

const CollapsedCard = styled.div`
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
`

const CollapsedHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CollapsedQuestion = styled.div`
  display: flex;
  font-weight: bold;
  color: var(--color-primary);

  img {
    width: 20px;
    height: 20px;
  }
`

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
`
