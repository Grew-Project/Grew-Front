import styled from 'styled-components'
import nextIcon from '@/assets/icons/next-icon.svg'

export const AnswerCard = ({
  onCardClick,
  post,
  emotionIcon,
  showToggleIcon,
  isExpanded,
  children,
}) => {
  return (
    <CommunityCard onClick={onCardClick}>
      <CardHeader>
        <TopRow>
          <QuestionText expanded={isExpanded}>{post.question_content}</QuestionText>
          {emotionIcon && <EmotionIcon src={emotionIcon} alt={post.emotion_type} />}
        </TopRow>
        <BottomRow>
          <Nickname>
            by <strong>{post.nickname}</strong>
          </Nickname>
          {showToggleIcon && <ArrowIcon src={nextIcon} alt="화살표" />}
        </BottomRow>
        <AnswerPreview expanded={isExpanded}>{post.answer_content}</AnswerPreview>
      </CardHeader>

      {children}
    </CommunityCard>
  )
}

const CommunityCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  max-width: 100%;
  cursor: pointer;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`

const QuestionText = styled.div`
  font-weight: bold;
  color: var(--color-primary);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ expanded }) =>
    expanded
      ? `
    white-space: normal;
    word-break: keep-all;
  `
      : `
    white-space: nowrap;
    word-break: break-word;
  `};
`

const EmotionIcon = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`

const AnswerPreview = styled.p`
  margin: 0;
  line-height: 1.5;
  color: #444;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;

  ${({ expanded }) =>
    expanded
      ? ''
      : `
    -webkit-line-clamp: 2;
  `}
`

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #666;
`

const Nickname = styled.span`
  word-break: break-word;
  max-width: 100%;
`

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
`
