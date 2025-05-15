import { Card } from './Card'
import styled from 'styled-components'
import leftIcon from '@/assets/icons/goback-icon.svg'

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

export const AnswerCard = ({
  onCardClick,
  post,
  emotionIcon,
  showToggleIcon,
  isExpanded,
  children,
}) => {
  return (
    <Card onClick={onCardClick}>
      <CardHeader>
        <QuestionBlock>
          <QuestionText>{post.question_content}</QuestionText>
          {emotionIcon && <img src={emotionIcon} alt={post.emotion_type} />}
        </QuestionBlock>

        <RightSide>
          <span>{post.nickname}</span>
          {showToggleIcon && (
            <ArrowIcon src={leftIcon} style={{ transform: 'rotate(270deg)' }} alt="화살표" />
          )}
        </RightSide>
      </CardHeader>

      <AnswerPreview expanded={isExpanded}>{post.answer_content}</AnswerPreview>
      {children}
    </Card>
  )
}

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
`
