import styled from 'styled-components'
import nextIcon from '@/assets/icons/next-icon.svg'

export const Card = styled.div`
  border: 1px var(--color-gray) solid;
  border-radius: var(--radius-base);
  background-color: var(--color-white);
  padding: 1rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
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

const AnswerPreview = styled.p`
  line-height: 1.5;
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
  ${({ expanded }) => (expanded ? '' : '-webkit-line-clamp: 2;')}
`

export const ProfileCard = ({ onCardClick, post, isExpanded, children }) => {
  return (
    <Card onClick={onCardClick}>
      <CardHeader>
        <QuestionBlock>
          <QuestionText expanded={isExpanded}>{post.question_content}</QuestionText>
        </QuestionBlock>

        <RightSide>
          <ArrowIcon src={nextIcon} style={{ transform: 'rotate(90deg)' }} alt="화살표" />
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
