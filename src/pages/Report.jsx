import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import goBack from '../assets/icons/goback-icon.svg'

import 사과나무 from '../assets/trees/사과나무4.png'
import 벚꽃나무 from '../assets/trees/벚꽃나무4.png'
import 단풍나무 from '../assets/trees/단풍나무4.png'
import 은행나무 from '../assets/trees/은행나무4.png'
import TreeHappinessFace from '../assets/faces/tree-happiness-face.png'
import TreeAngerFace from '../assets/faces/tree-anger-face.png'
import TreeConfusionFace from '../assets/faces/tree-confusion-face.png'
import TreeLoveFace from '../assets/faces/tree-love-face.png'
import TreeSadnessFace from '../assets/faces/tree-sadness-face.png'
import HappinessFace from '../assets/faces/happiness-face.svg'
import AngerFace from '../assets/faces/anger-face.svg'
import ConfusionFace from '../assets/faces/confusion-face.svg'
import LoveFace from '../assets/faces/love-face.svg'
import SadnessFace from '../assets/faces/sadness-face.svg'
import { getForest } from '../api/forest'
import { Spinner } from '../components/Spinner'
import EmotionPieChart from '../components/EmotionPieChart'

const Report = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [treeData, setTreeData] = useState([])
  const { treeId } = useParams()

  const treeImages = {
    사과나무: 사과나무,
    벚꽃나무: 벚꽃나무,
    단풍나무: 단풍나무,
    은행나무: 은행나무,
  }
  const TreeEmotionImages = {
    Happiness: TreeHappinessFace,
    Anger: TreeAngerFace,
    Confusion: TreeConfusionFace,
    Love: TreeLoveFace,
    Sadness: TreeSadnessFace,
  }

  const navigate = useNavigate()
  const handlePrev = () => {
    navigate('/forest')
  }

  useEffect(() => {
    const fetchForest = async () => {
      try {
        setIsLoading(true)
        const res = await getForest()
        if (res.status === 200) {
          setTreeData(res.data.groups)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchForest()
  }, [])

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
        {isLoading ? (
          <SpinnerWrapper>
            <Spinner color="gray" />
          </SpinnerWrapper>
        ) : (
          treeData.length > 0 &&
          treeData[parseInt(treeId) - 1] && (
            <TreeContainer>
              <TreeImgWrapper>
                <img
                  src={treeImages[treeData[parseInt(treeId - 1)].tree_type]}
                  alt={treeData[parseInt(treeId - 1)].tree_type}
                />
                <img
                  src={TreeEmotionImages[treeData[parseInt(treeId - 1)].dominant_emotion]}
                  alt={treeData[parseInt(treeId - 1)].tree_emotion}
                />
              </TreeImgWrapper>
              <TreeName>{treeData[parseInt(treeId - 1)].tree_name}</TreeName>
              <Duration>
                {treeData[parseInt(treeId - 1)].start_at.slice(0, 10).replace(/-/g, '.')} ~{' '}
                {treeData[parseInt(treeId - 1)].end_at.slice(0, 10).replace(/-/g, '.')}
              </Duration>
              <EmotionsContainer>
                <Emotion>
                  <img src={ConfusionFace} alt="당황" />
                  {treeData[parseInt(treeId - 1)].emotion_counts.Confusion}
                </Emotion>
                <Emotion>
                  <img src={AngerFace} alt="화남" />
                  {treeData[parseInt(treeId - 1)].emotion_counts.Anger}
                </Emotion>
                <Emotion>
                  <img src={HappinessFace} alt="행복" />
                  {treeData[parseInt(treeId - 1)].emotion_counts.Happiness}
                </Emotion>
                <Emotion>
                  <img src={SadnessFace} alt="슬픔" />
                  {treeData[parseInt(treeId - 1)].emotion_counts.Sadness}
                </Emotion>
                <Emotion>
                  <img src={LoveFace} alt="사랑" />
                  {treeData[parseInt(treeId - 1)].emotion_counts.Love}
                </Emotion>
              </EmotionsContainer>
              <EmotionPieChartWrapper>
                <EmotionPieChart emotion_counts={treeData[parseInt(treeId - 1)].emotion_counts} />
              </EmotionPieChartWrapper>
            </TreeContainer>
          )
        )}
      </ReportContainer>
    </>
  )
}

export default Report

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
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
  width: 100%;
`

const TreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--fs15);
  font-weight: bold;
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
  margin-top: 0.5rem;
  font-size: var(--fs15);
  text-align: center;
  word-break: keep-all;
`
const Duration = styled.div``
const EmotionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10%;
  margin: 2rem 0;
`
const Emotion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const EmotionPieChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`
