import styled, { css } from 'styled-components'

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

const CollapsedTitle = styled.div`
  display: flex;
  font-weight: bold;
  color: var(--color-primary);

  img {
    width: 20px;
    height: 20px;
  }

  ${props =>
    props.primary &&
    css`
      color: var(--color-primary);
    `}
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
`

const TitleListItem = ({ onItemClick, title, icon, ...props }) => {
  return (
    <CollapsedCard onClick={onItemClick}>
      <CollapsedHeader>
        <CollapsedTitle {...props}>
          <span>{title}</span>
          {/* <img src={getEmotionIcon(post.emotion_type)} alt="감정" /> */}
        </CollapsedTitle>
        {icon && <Icon src={icon} alt="아이콘" />}
      </CollapsedHeader>
    </CollapsedCard>
  )
}

export default TitleListItem
