import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { createTodayAnswer, getQuestionCount, getTodayQuestion } from '../api/today_question'
import { Button } from '../components/Button'
import { Textarea } from '../components/TextArea'

import angerFace from '../assets/faces/anger-face.svg'
import confusionFace from '../assets/faces/confusion-face.svg'
import happinessFace from '../assets/faces/happiness-face.svg'
import loveFace from '../assets/faces/love-face.svg'
import sadnessFace from '../assets/faces/sadness-face.svg'
import goBack from '../assets/icons/goback-icon.svg'
import checkBoxIcon from '../assets/icons/checkbox-icon.svg'
import { Spinner } from '../components/Spinner'
import { useQueryClient } from '@tanstack/react-query'

const TodayQuestion = () => {
  const queryClient = useQueryClient()

  const [currentStep, setCurrentStep] = useState('selectEmotion') //enterQuestion
  const [formData, setFormData] = useState({
    questionId: 0,
    emotionType: '',
    answerContent: '',
    isPrivate: false,
  })
  const [todayQuestion, setTodayQuestion] = useState('')
  const [questionCount, setQuestionCount] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const today = new Date()
  const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`

  const handlePrev = () => {
    if (currentStep === 'selectEmotion') {
      navigate('/home')
    }
    setCurrentStep('selectEmotion')
  }
  const handleNext = async e => {
    e.preventDefault()
    if (currentStep === 'selectEmotion') {
      try {
        const response = await getTodayQuestion(formData.emotionType)
        setTodayQuestion(response.question_content)
        setFormData(prev => ({
          ...prev,
          questionId: response.question_id,
        }))
      } catch (err) {
        console.error(err)
      }
      setCurrentStep('enterQuestion')
    } else if (currentStep === 'enterQuestion') {
      try {
        setIsLoading(true)
        const response = await createTodayAnswer(
          formData.questionId,
          formData.answerContent,
          formData.emotionType,
          !formData.isPrivate
        )
        if (response.status === 201) {
          queryClient.invalidateQueries(['homeInfo'])
          navigate('/home')
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const emotions = ['Confusion', 'Anger', 'Happiness', 'Sadness', 'Love']
  const emotionImages = {
    Happiness: happinessFace,
    Sadness: sadnessFace,
    Anger: angerFace,
    Confusion: confusionFace,
    Love: loveFace,
  }
  const handleEmotionChange = emotion => {
    setFormData(prev => ({
      ...prev,
      emotionType: emotion,
    }))
  }

  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const res = await getQuestionCount()
        if (res.status === 200) {
          setQuestionCount(res.data.length + 1)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchQuestionCount()
  }, [])

  const renderInput = () => {
    switch (currentStep) {
      case 'selectEmotion':
        return (
          <>
            <StyledEmotionForm onSubmit={handleNext}>
              <EmotionTitle>오늘의 내 기분을 골라주세요</EmotionTitle>
              <EmotionContainer>
                {emotions.map(emotion => (
                  <Emotion
                    key={emotion}
                    onClick={() => handleEmotionChange(emotion)}
                    type="button"
                    selected={formData.emotionType === emotion ? 'selected' : ''}
                  >
                    <img src={emotionImages[emotion]} alt={emotion} />
                  </Emotion>
                ))}
              </EmotionContainer>
              <ButtonWrapper>
                <Button type="submit" disabled={formData.emotionType === ''}>
                  다음으로
                </Button>
              </ButtonWrapper>
            </StyledEmotionForm>
          </>
        )
      case 'enterQuestion':
        return (
          <>
            <StyledAnswerForm onSubmit={handleNext}>
              <AnswerTitle>{todayQuestion}</AnswerTitle>
              <LengthCheck>{formData.answerContent.length} / 500</LengthCheck>
              <TextareaWrapper>
                <Textarea
                  type="text"
                  name="answerContent"
                  value={formData.answerContent}
                  onChange={handleChange}
                  placeholder="답변을 입력해 주세요"
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
                      <UncheckedBox></UncheckedBox>
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
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Back onClick={handlePrev}>
        <img src={goBack} alt="back" />
      </Back>
      <PageTitle>
        <div>#{questionCount}</div>
        <div>번째 질문</div>
        <div>{formattedDate}</div>
      </PageTitle>
      {renderInput()}
    </>
  )
}

export default TodayQuestion

const Back = styled.div`
  position: absolute;
  top: 52px;
  width: 32px;
  height: 32px;
  &:hover {
    cursor: pointer;
  }
`
const PageTitle = styled.div`
  display: flex;
  position: absolute;
  top: 52px;
  left: 70px;
  height: 32px;
  align-items: center;
  font-weight: 100;
  font-size: var(--fs15);
  color: var(--font-color-gray);
  div:nth-of-type(2) {
    font-weight: bold;
    color: var(--font-color-black);
  }
  div:nth-of-type(3) {
    margin-left: 0.5rem;
  }
`
const ButtonWrapper = styled.div`
  height: 65px;
`

const StyledEmotionForm = styled.form`
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-base);
  background-color: var(--color-white);
  width: calc(100% - 24px - 24px);
  height: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const EmotionTitle = styled.div`
  font-size: var(--fs15);
  font-weight: bold;
  display: flex;
  justify-content: center;
`
const EmotionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const Emotion = styled.button`
  background-color: ${({ selected }) => (selected ? '#eeeeee' : '')};
  border: 1px solid ${({ selected }) => (selected ? 'var(--color-gray)' : 'var(--color-white)')};

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2% 4%;
  border-radius: var(--radius-base);
  &:hover {
    cursor: pointer;
  }
`
const StyledAnswerForm = styled.form`
  height: calc(100% - 32px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`
const AnswerTitle = styled.div`
  font-size: var(--fs20);
  font-weight: bold;
  padding: 0 0 1rem 0;
  word-break: keep-all;
`
const LengthCheck = styled.div`
  color: var(--font-color-gray);
  text-align: end;
  font-size: var(--fs15);
  margin-bottom: 0.2rem;
`
const TextareaWrapper = styled.div`
  width: 100%;
  flex: 1;
`
const CheckBoxWrapper = styled.div`
  height: 36px;
  font-size: var(--fs15);
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: end;
  label {
    padding: 0.5rem 0 0.5rem 0.5rem;
    display: flex;
    &:hover {
      cursor: pointer;
    }
  }
`
const HiddenCheckBox = styled.input`
  display: none;
`
const CheckBoxIconWrapper = styled.div`
  width: 21px;
  height: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.2rem;
  img {
    width: 21px;
    height: 21px;
  }
`
const UncheckedBox = styled.div`
  width: 21px;
  height: 21px;
  background-color: var(--color-secondary);
  /* border: 1px solid var(--color-secondary); */
  border-radius: 2px;
`
