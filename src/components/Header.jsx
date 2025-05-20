import styled from 'styled-components'
import goBackIcon from '@/assets/icons/left-arrow-icon.svg'
import { useNavigate } from 'react-router-dom'

export const Header = ({ left, center, right, onBackClick }) => {
  const navigate = useNavigate()
  return (
    <HeaderWrapper>
      <LeftContent>
        <button onClick={onBackClick || (() => navigate(-1))}>
          <img src={goBackIcon} alt="뒤로가기" className="back" />
        </button>
        {left}
      </LeftContent>
      <CenterContent>{center}</CenterContent>
      <RightContent>{right}</RightContent>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  padding: 52px 0 2rem 0;
  width: calc(100% - 48px);
  max-width: calc(480px - 48px);
  background-color: var(--color-background);
  img {
    height: 20px;
  }

  .back {
    height: 20px;
  }

  span {
    line-height: 1.2;
  }
`

const LeftContent = styled.header`
  display: flex;
  align-items: center;

  img {
    display: block;
  }

  span {
    margin-left: 1rem;
    font-weight: 100;
    display: flex;
  }

  .date,
  .lock-icon {
    margin-left: 0.5rem;
  }
`

const CenterContent = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--fs20);
  font-weight: bold;

  .leaf {
    margin: 0 0.5rem;
  }
`

const RightContent = styled.div`
  display: flex;
  align-items: center;

  img {
    display: block;
  }
`
