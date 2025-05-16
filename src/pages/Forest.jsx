import React, { useState } from 'react'
import styled from 'styled-components'

import goBack from '../assets/icons/goback-icon.svg'
import { Link, useNavigate } from 'react-router-dom'
import Empty from '../components/Empty'

import 사과나무 from '../assets/trees/사과나무4.png'
import 벚꽃나무 from '../assets/trees/벚꽃나무4.png'
import 단풍나무 from '../assets/trees/단풍나무4.png'
import 은행나무 from '../assets/trees/은행나무4.png'
import HappinessFace from '../assets/faces/tree-happiness-face.png'
import AngerFace from '../assets/faces/tree-anger-face.png'
import ConfusionFace from '../assets/faces/tree-confusion-face.png'
import LoveFace from '../assets/faces/tree-love-face.png'
import SadnessFace from '../assets/faces/tree-sadness-face.png'

const Forest = () => {
  const treeData = []
  // const treeData = [
  //   {
  //     treeType: '사과나무',
  //     treeName: '행복한 행복가득나무',
  //     treeEmotion: 'Happiness',
  //     startAt: '2025-05-14T07:32:03.084Z',
  //     endAt: '2025-05-14T04:32:24.484Z',
  //     emotionCount: { Love: 3, Happiness: 5, Confusion: 3, Sadness: 3, Anger: 2 },
  //   },
  //   {
  //     treeType: '벚꽃나무',
  //     treeName: '슬픈나무',
  //     treeEmotion: 'Sadness',
  //     startAt: '2025-05-14T07:32:03.084Z',
  //     endAt: '2025-05-14T04:32:24.484Z',
  //     emotionCount: { Love: 3, Happiness: 3, Confusion: 3, Sadness: 5, Anger: 2 },
  //   },
  //   {
  //     treeType: '단풍나무',
  //     treeName: '화난나무',
  //     treeEmotion: 'Anger',
  //     startAt: '2025-05-14T07:32:03.084Z',
  //     endAt: '2025-05-14T04:32:24.484Z',
  //     emotionCount: { Love: 3, Happiness: 3, Confusion: 3, Sadness: 5, Anger: 2 },
  //   },
  //   {
  //     treeType: '은행나무',
  //     treeName: '당황나무',
  //     treeEmotion: 'Confusion',
  //     startAt: '2025-05-14T07:32:03.084Z',
  //     endAt: '2025-05-14T04:32:24.484Z',
  //     emotionCount: { Love: 3, Happiness: 3, Confusion: 3, Sadness: 5, Anger: 2 },
  //   },
  //   {
  //     treeType: '단풍나무',
  //     treeName: '사랑나무',
  //     treeEmotion: 'Love',
  //     startAt: '2025-05-14T07:32:03.084Z',
  //     endAt: '2025-05-14T04:32:24.484Z',
  //     emotionCount: { Love: 3, Happiness: 3, Confusion: 3, Sadness: 5, Anger: 2 },
  //   },
  // ]

  const treeImages = {
    사과나무: 사과나무,
    벚꽃나무: 벚꽃나무,
    단풍나무: 단풍나무,
    은행나무: 은행나무,
  }
  const emotionImages = {
    Happiness: HappinessFace,
    Anger: AngerFace,
    Confusion: ConfusionFace,
    Love: LoveFace,
    Sadness: SadnessFace,
  }

  const navigate = useNavigate()
  const handlePrev = () => {
    navigate('/mypage')
  }
  console.log(treeData.length)

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
      <ForestContainer>
        {treeData.length === 0 ? (
          <Empty>아직 다 자란 나무가 없어요.</Empty>
        ) : (
          treeData.map((tree, idx) => (
            <TreeContainer to={`/report/${idx + 1}`} key={idx}>
              <TreeImgWrapper>
                <img src={treeImages[tree.treeType]} alt={tree.treeType} />
                <img src={emotionImages[tree.treeEmotion]} alt={tree.treeEmotion} />
              </TreeImgWrapper>
              <TreeName>{tree.treeName}</TreeName>
            </TreeContainer>
          ))
        )}
      </ForestContainer>
      <Padding />
    </>
  )
}

export default Forest

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

const ForestContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(90px, 1fr));
  justify-content: center;
  gap: 2rem;
  margin-top: 52px;
  padding: 0 2rem;
  font-size: var(--fs15);
  font-weight: bold;
`
const Padding = styled.div`
  height: 5rem;
`
const TreeContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`
const TreeImgWrapper = styled.div`
  background-color: var(--color-white);
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  display: flex;
  max-width: 150px;
  justify-content: center;
  align-items: center;
  position: relative;
  img:nth-of-type(1) {
    width: 55%;
  }
  img:nth-of-type(2) {
    width: 40%;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
`
const TreeName = styled.div`
  margin: 1rem 0;
  text-align: center;
  word-break: keep-all;
`
