import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import goBack from '../assets/icons/goback-icon.svg'

const Report = () => {
  const treeData = [
    {
      treeType: '사과나무',
      treeName: '행복한 행복가득나무',
      treeEmotion: 'Happiness',
      startAt: '2025-05-14T07:32:03.084Z',
      endAt: '2025-05-14T04:32:24.484Z',
      emotionCount: { Love: 1, Happiness: 5, Confusion: 3, Sadness: 3, Anger: 2 },
    },
    {
      treeType: '벚꽃나무',
      treeName: '슬픈나무',
      treeEmotion: 'Sadness',
      startAt: '2025-05-14T07:32:03.084Z',
      endAt: '2025-05-14T04:32:24.484Z',
      emotionCount: { Love: 2, Happiness: 3, Confusion: 3, Sadness: 5, Anger: 2 },
    },
    {
      treeType: '단풍나무',
      treeName: '화난나무',
      treeEmotion: 'Anger',
      startAt: '2025-05-14T07:32:03.084Z',
      endAt: '2025-05-14T04:32:24.484Z',
      emotionCount: { Love: 3, Happiness: 3, Confusion: 3, Sadness: 5, Anger: 2 },
    },
    {
      treeType: '은행나무',
      treeName: '당황나무',
      treeEmotion: 'Confusion',
      startAt: '2025-05-14T07:32:03.084Z',
      endAt: '2025-05-14T04:32:24.484Z',
      emotionCount: { Love: 4, Happiness: 3, Confusion: 3, Sadness: 5, Anger: 2 },
    },
    {
      treeType: '단풍나무',
      treeName: '사랑나무',
      treeEmotion: 'Love',
      startAt: '2025-05-14T07:32:03.084Z',
      endAt: '2025-05-14T04:32:24.484Z',
      emotionCount: { Love: 5, Happiness: 3, Confusion: 3, Sadness: 5, Anger: 2 },
    },
  ]
  const { treeId } = useParams()
  const tree = treeData[parseInt(treeId) - 1]

  const navigate = useNavigate()
  const handlePrev = () => {
    navigate('/forest')
  }
  return (
    <>
      <HeaderContainer>
        <Header>
          <Back onClick={handlePrev}>
            <img src={goBack} alt="back" />
          </Back>
          <HeaderTitle>마음숲</HeaderTitle>
        </Header>
      </HeaderContainer>
      <ReportContainer>
        {tree.treeType}
        <br />
        {tree.treeName}
        <br />
        {tree.treeEmotion}
        <br />
        {tree.startAt}
        <br />
        {tree.endAt}
        <br />
        {tree.emotionCount.Love}
        <br />
        {tree.emotionCount.Happiness}
        <br />
        {tree.emotionCount.Confusion}
        <br />
        {tree.emotionCount.Sadness}
        <br />
        {tree.emotionCount.Anger}
        <br />
      </ReportContainer>
    </>
  )
}

export default Report

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  padding: 52px 24px 1.2rem 24px;
  background-color: var(--color-background);
  width: 100%;
  max-width: 480px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 1px solid red;
  border-right: 1px solid red;
  z-index: 999;
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

const ReportContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`
