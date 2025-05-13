import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import mainIcon from '@/assets/icons/main-icon.svg'
import communityIcon from '@/assets/icons/community-icon.svg'
import listIcon from '@/assets/icons/list-icon.svg'
import mypageIcon from '@/assets/icons/mypage-icon.svg'

const FooterWrapper = styled.nav`
  background-color: var(--color-footer);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  height: 56px;
  border-radius: var(--fs20) var(--fs20) 0 0;
`

const StyledNavLink = styled(NavLink)`
  &.active img {
    opacity: 1;
  }

  &:hover img {
    opacity: 1;
  }
  padding: 0 1rem;
`

const FooterIcon = styled.img`
  width: 30px;
  height: 30px;
  opacity: 0.7;
  transition: opacity 0.2s;
  margin-top: 0.5rem;
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <StyledNavLink to="/">
        <FooterIcon src={mainIcon} alt="메인" />
      </StyledNavLink>
      <StyledNavLink to="/community">
        <FooterIcon src={communityIcon} alt="커뮤니티" />
      </StyledNavLink>
      <StyledNavLink to="/answers">
        <FooterIcon src={listIcon} alt="답변리스트" />
      </StyledNavLink>
      <StyledNavLink to="/mypage">
        <FooterIcon src={mypageIcon} alt="마이페이지" />
      </StyledNavLink>
    </FooterWrapper>
  )
}
