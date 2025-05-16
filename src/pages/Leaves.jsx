import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getLeaves } from '../api/leaf'

import goBack from '../assets/icons/goback-icon.svg'
import LeafIcon from '../assets/icons/leaf-icon.svg'
import refreshIcon from '../assets/icons/refresh-icon.svg'
import Empty from '../components/Empty'

const Leaves = () => {
  const [leaves, setLeaves] = useState([])

  const navigate = useNavigate()
  const handlePrev = () => {
    navigate('/home')
  }

  //api 연동
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await getLeaves()
        if (res.status === 404) {
          // 받은 잎사귀 없음
        } else if (res.status === 200) {
          // 받은 잎사귀 있음
          // setLeaves(res.data)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchLeaves()
  }, [])
  return (
    <>
      <HeaderContainer>
        <Header>
          <Back onClick={handlePrev}>
            <img src={goBack} alt="back" />
          </Back>
          <HeaderTitle>
            <LeafIconWrapper>
              <img src={LeafIcon} alt="LeafIcon" />
            </LeafIconWrapper>
            잎사귀함
            <LeafIconWrapper>
              <img src={LeafIcon} alt="LeafIcon" />
            </LeafIconWrapper>
          </HeaderTitle>
          <Refresh>
            <img src={refreshIcon} alt="refreshIcon" />
          </Refresh>
        </Header>
      </HeaderContainer>
      <LeafContent>
        {leaves.length === 0 ? (
          <Empty>아직 받은 잎사귀가 없어요</Empty>
        ) : (
          leaves.map((leaf, idx) => (
            <LeafCard key={idx}>
              <Nickname>{leaf.sender_nickname}</Nickname>
              <Message>{leaf.leaf_content}</Message>
            </LeafCard>
          ))
        )}

        <Padding />
      </LeafContent>
    </>
  )
}

export default Leaves

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  padding: 52px 24px 1.2rem 24px;
  background-color: var(--color-background);
  width: 100%;
  max-width: 480px;
  left: 50%;
  transform: translateX(-50%);
`
const Header = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`
const Back = styled.div`
  position: absolute;
  left: 0;
  width: 32px;
  height: 32px;
  &:hover {
    cursor: pointer;
  }
`
const HeaderTitle = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.5rem;
  font-size: var(--fs20);
  font-weight: bold;
  word-break: keep-all;
`
const LeafIconWrapper = styled.div`
  img {
    width: 19px;
  }
`
const Refresh = styled.div`
  position: absolute;
  right: 0;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`

const LeafContent = styled.div`
  height: calc(100% - 32px - 1.2rem);
  margin-top: 52px;
`
const Padding = styled.div`
  height: 5rem;
`
const LeafCard = styled.div`
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: var(--radius-base);
  padding: 1rem;
  margin-bottom: 0.8rem;
`
const Nickname = styled.div`
  font-size: var(--fs15);
  font-weight: bold;
  margin-bottom: 0.75rem;
`
const Message = styled.div``
