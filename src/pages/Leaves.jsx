import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getLeaves } from '../api/leaf'

import LeafIcon from '../assets/icons/leaf-icon.svg'
import refreshIcon from '../assets/icons/refresh-icon.svg'
import Empty from '../components/Empty'
import { Spinner } from '../components/Spinner'
import { Header } from '../components/Header'

const Leaves = () => {
  const [leaves, setLeaves] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    fetchLeaves()
  }
  //api 연동
  const fetchLeaves = async () => {
    try {
      setIsLoading(true)
      const res = await getLeaves()
      if (res.status === 404) {
        // 받은 잎사귀 없음
      } else if (res.status === 200) {
        // 받은 잎사귀 있음
        setLeaves(res.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchLeaves()
  }, [])
  return (
    <>
      <Header
        center={
          <>
            <img src={LeafIcon} alt="LeafIcon" className="leaf" />
            잎사귀함
            <img src={LeafIcon} alt="LeafIcon" className="leaf" />
          </>
        }
        right={
          <button onClick={handleRefresh}>
            <img src={refreshIcon} alt="새로고침" />
          </button>
        }
      />
      <LeafContent>
        {isLoading ? (
          <SpinnerWrapper>
            <Spinner color={'gray'} />
          </SpinnerWrapper>
        ) : leaves.length === 0 ? (
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

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const LeafContent = styled.div`
  // height: calc(100% - 32px - 1.2rem);
  // margin-top: 52px;
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
