import styled from 'styled-components'

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

const Icon = styled.img`
  width: 20px;
  height: 20px;
`

const QuestionListItem = ({ onItemClick, question, icon }) => {
  return (
    <CollapsedCard onClick={onItemClick}>
      <CollapsedHeader>
        <CollapsedQuestion>
          <span>{question}</span>
          {/* <img src={getEmotionIcon(post.emotion_type)} alt="감정" /> */}
        </CollapsedQuestion>
        <Icon src={icon} alt="아이콘" />
      </CollapsedHeader>
    </CollapsedCard>
  )
}

export default QuestionListItem
