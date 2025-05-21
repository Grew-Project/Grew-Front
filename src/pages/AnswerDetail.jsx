import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import useAuthStore from '../store/useAuthStore'
import { getMyAnswerDetail, updateMyAnswer } from '../api/mypage'
import {
  AnswerTitle,
  ButtonWrapper,
  CheckBoxIconWrapper,
  CheckBoxWrapper,
  HiddenCheckBox,
  LengthCheck,
  StyledAnswerForm,
  TextareaWrapper,
  UncheckedBox,
} from '../components/Question'
import { Spinner } from '../components/Spinner'
import { Button } from '../components/Button'
import { Textarea } from '../components/Textarea.jsx'
import angerFace from '../assets/faces/anger-face.svg'
import confusionFace from '../assets/faces/confusion-face.svg'
import happinessFace from '../assets/faces/happiness-face.svg'
import loveFace from '../assets/faces/love-face.svg'
import sadnessFace from '../assets/faces/sadness-face.svg'
import checkBoxIcon from '@/assets/icons/checkbox-icon.svg'
import lockIcon from '@/assets/icons/lock-icon.svg'
import penIcon from '@/assets/icons/pen-icon.svg'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import useUIStore from '../store/useAlarmStore.js'

const AnswerDetail = () => {
  const showToast = useUIStore(state => state.showToast)

  const { answerId } = useParams()
  const nickname = useAuthStore(state => state.nickname)
  const [isEdit, setIsEdit] = useState(false)
  const [post, setPost] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    answerId: 0,
    emotionType: '',
    answerContent: ``,
    isPrivate: false,
  })

  const emotions = ['Confusion', 'Anger', 'Happiness', 'Sadness', 'Love']

  const emotionIcons = {
    Confusion: confusionFace,
    Anger: angerFace,
    Happiness: happinessFace,
    Sadness: sadnessFace,
    Love: loveFace,
  }

  const fetchPostDetail = async () => {
    try {
      setIsLoading(true)
      const data = await getMyAnswerDetail(nickname)
      const matchedPost = data.find(post => {
        return post.answer_id === Number(answerId)
      })
      setPost(matchedPost)
      setFormData(prev => ({
        ...prev,
        answerContent: matchedPost.answer_content,
        isPrivate: !matchedPost.is_public,
        emotionType: matchedPost.emotion_type,
      }))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPostDetail()
  }, [])

  const handleNext = async e => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const response = await updateMyAnswer(
        nickname,
        post.answer_id,
        formData.answerContent,
        !formData.isPrivate
      )

      if (response.status === 200) {
        setPost(prev => ({
          ...prev,
          answer_content: formData.answerContent,
          is_public: !formData.isPrivate,
        }))
        setIsEdit(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      showToast('답변 수정이 완료되었습니다')
    }
  }

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const editAnswer = () => {
    return (
      <StyledAnswerForm onSubmit={handleNext}>
        <AnswerTitle>{post.question_content}</AnswerTitle>
        <LengthCheck>{formData.answerContent.length} / 500</LengthCheck>
        <TextareaWrapper>
          <Textarea
            type="text"
            name="answerContent"
            value={formData.answerContent}
            onChange={handleChange}
            maxLength={500}
          />
        </TextareaWrapper>
        <CheckBoxWrapper>
          <label>
            비공개
            <HiddenCheckBox
              type="checkbox"
              name="isPrivate"
              checked={formData.isPrivate}
              onChange={e =>
                setFormData(prev => ({
                  ...prev,
                  isPrivate: e.target.checked,
                }))
              }
            />
            <CheckBoxIconWrapper>
              {formData.isPrivate ? (
                <img src={checkBoxIcon} alt="checkBoxIcon" />
              ) : (
                <UncheckedBox />
              )}
            </CheckBoxIconWrapper>
          </label>
        </CheckBoxWrapper>
        <ButtonWrapper>
          <Button type="submit" disabled={formData.answerContent === '' || isLoading}>
            {isLoading ? <Spinner /> : '오늘의 나 기록하기'}
          </Button>
        </ButtonWrapper>
      </StyledAnswerForm>
    )
  }

  const handleEditBtn = () => {
    setIsEdit(true)
  }

  const viewAnswer = () => {
    return (
      <ViewContainer>
        <EmotionDisplayGroup>
          {emotions.map(emotion => (
            <EmotionDisplayItem key={emotion} selected={formData.emotionType === emotion}>
              <img src={emotionIcons[emotion]} alt={emotion} />
            </EmotionDisplayItem>
          ))}
        </EmotionDisplayGroup>
        <AnswerTitle>{post.question_content}</AnswerTitle>
        <ContentWrapper>
          <ContentArea>{post.answer_content}</ContentArea>
        </ContentWrapper>
        <UpdateBtn>
          <button onClick={handleEditBtn}>
            수정하기 <img src={penIcon} alt="수정" />
          </button>
        </UpdateBtn>
      </ViewContainer>
    )
  }

  const formattedDate = postDate => {
    const date = new Date(postDate)

    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  }

  return (
    <>
      {isLoading ? (
        <>
          <Header />
          <Loading />
        </>
      ) : (
        <>
          <Header
            left={
              <span>
                #{post.answer_id} <strong>번째 답변</strong>{' '}
                <span className="date">{formattedDate(post.created_at)}</span>
                {!post.is_public && <img src={lockIcon} alt="비공개" className="lock-icon" />}
              </span>
            }
          />
          {isEdit ? editAnswer() : viewAnswer()}
        </>
      )}
    </>
  )
}

export default AnswerDetail

const ViewContainer = styled.div`
  height: calc(100% - 55px);
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
`

const ContentArea = styled.div`
  border: 1px solid var(--color-secondary);
  border-radius: var(--radius-base);
  padding: 1rem;
  width: 100%;
  height: 100%;
  font-size: ${props => props.fontSize || 'var(--fs15)'};
  transition: 0.2s;
  white-space: pre-wrap;
  word-break: break-word;
`

const UpdateBtn = styled.div`
  display: flex;
  margin-top: 0.8rem;
  justify-content: flex-end;

  button {
    font-size: var(--fs15);
  }

  img {
    margin-left: 0.3rem;
    width: 0.85rem;
  }
`
const EmotionDisplayGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin: 2rem 0;
`

const EmotionDisplayItem = styled.div`
  img {
    width: 29px;
    filter: grayscale(${props => (props.selected ? '0%' : '100%')});
    opacity: ${props => (props.selected ? 1 : 0.5)};
  }
`
