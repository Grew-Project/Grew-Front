import styled from 'styled-components'
import grass from '../assets/main-grass.svg'
import cloud from '../assets/main-cloud.png'
import help from '../assets/icons/main-help.svg'
import leaf from '../assets/icons/leaf-icon.svg'
import flower from '../assets/icons/flower-icon.svg'
import sign from '../assets/main-sign.png'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputTextModal } from '../components/modal/InputTextModal'
import { getHomeInfo, updateTreeName } from '../api/home'
import TutorialModal from '../components/modal/TutorialModal'
import { TreeAddedModal } from '../components/modal/TreeAddedModal'
import { calculateRemainingToNextStage, calculateStage } from '../utils/treeState'
import getSortedTreeImages from '../utils/getSortedTreeImages'

const Home = () => {
  const [isAnswered, setIsAnswered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [treeName, setTreeName] = useState('')
  const [treeNameChange, setTreeNameChange] = useState(treeName)
  const [leafCount, setLeafCount] = useState(0)
  const [flowerCount, setFlowerCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [treeType, setTreeType] = useState('사과나무')
  const [isLoading, setIsLoading] = useState(true)
  const [showTutorial, setShowTutorial] = useState(false)
  const navigate = useNavigate()

  const sortedTreeImages = getSortedTreeImages(treeType)

  const TOTAL_QUESTIONS = 16
  const MAX_STAGE = 4

  const currentStage = calculateStage(answeredCount, TOTAL_QUESTIONS, MAX_STAGE) - 1
  const remaining = calculateRemainingToNextStage(answeredCount, TOTAL_QUESTIONS, MAX_STAGE)

  const handleSignClick = () => {
    setIsModalOpen(true)
  }

  const maxLength = 4
  const handleConfirm = async e => {
    e.preventDefault()

    if (treeNameChange.length > maxLength || treeNameChange.length <= 0) {
      return
    }

    try {
      const response = await updateTreeName(treeNameChange)
      if (response.status === 200) {
        setTreeName(treeNameChange)
        setIsModalOpen(false)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleModalClose = () => {
    setIsModalOpen(false)
    setTreeNameChange(treeName)
  }
  const handleTreeClick = () => {
    navigate('/question/today')
  }
  const handleTreeNameChange = e => {
    if (e.target.value.length <= maxLength) {
      setTreeNameChange(e.target.value)
    }
  }
  const handleLeafClick = () => {
    navigate('/Leaves')
  }
  const openTutorialModal = () => {
    setShowTutorial(true)
  }

  //api 연동
  useEffect(() => {
    const fetchHomeInfo = async () => {
      try {
        const res = await getHomeInfo()
        setAnsweredCount(res.answerCount)
        setLeafCount(res.leafCount)
        setFlowerCount(res.flowerCount)
        setTreeType(res.treeType)
        setTreeName(res.treeName)
        setTreeNameChange(res.treeName)
        setIsAnswered(res.isAnswered)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHomeInfo()
  }, [])

  return (
    <>
      <Background>
        <Cloud src={cloud} alt="cloud" />
        <GrassWrapper>
          <Grass src={grass} alt="grass" />
          <Ground />
        </GrassWrapper>
      </Background>
      <Container>
        <Help onClick={openTutorialModal}>
          <img src={help} alt="help" />
        </Help>
        <ProgressWrapper>
          <ProgressBarWrapper>
            <Level>{!isLoading && <img src={sortedTreeImages[currentStage]} alt="" />}</Level>
            <ProgressBar $remaining={remaining}></ProgressBar>
            <Level>
              {answeredCount < 12 && <img src={sortedTreeImages[currentStage + 1]} alt="" />}
            </Level>
          </ProgressBarWrapper>
          {!isLoading && (
            <ProgressDesc>
              {answeredCount === 16
                ? '나무가 다 자랐어요!'
                : answeredCount >= 12
                  ? `나무 완성까지 ${remaining}개의 질문이 남았어요`
                  : `다음 단계까지 ${remaining}개의 질문이 남았어요`}
            </ProgressDesc>
          )}
        </ProgressWrapper>
        <Notification>
          <NotificationIcon onClick={handleLeafClick}>
            <img src={leaf} alt="잎사귀" />
            {!isLoading && leafCount > 0 && <Counter>{leafCount}</Counter>}
          </NotificationIcon>
          <NotificationIcon>
            <img src={flower} alt="응원꽃" />
            {!isLoading && flowerCount > 0 && <Counter>{flowerCount}</Counter>}
          </NotificationIcon>
        </Notification>
        {!isLoading && (
          <Tree onClick={isAnswered ? undefined : handleTreeClick} $isAnswered={isAnswered}>
            <img src={sortedTreeImages[currentStage]} alt="나무 이미지" />
          </Tree>
        )}
        <SignWrapper onClick={handleSignClick}>
          <Sign>
            <img src={sign} alt="표지판" />
            <div>{treeName}</div>
          </Sign>
        </SignWrapper>
        {!isLoading && (
          <TodayQuestion>
            {isAnswered ? (
              <>
                <div>오늘의 답변을 작성했어요</div>
                <div>오늘의 기록이 내일의 나를 만들어요</div>
              </>
            ) : (
              <>
                <div>오늘의 질문이 도착했어요</div>
                <div>나무를 클릭해서 확인하세요</div>
              </>
            )}
          </TodayQuestion>
        )}
      </Container>
      {isModalOpen && (
        <InputTextModal
          title={'나무 이름을 입력하세요'}
          inputText={treeNameChange}
          onChange={handleTreeNameChange}
          onConfirm={handleConfirm}
          onCancel={handleModalClose}
          maxLength={maxLength}
        />
      )}
      {answeredCount === 16 && (
        <TreeAddedModal text={`${treeType}가 마음숲에 추가됐어요!`}></TreeAddedModal>
      )}
      <TutorialModal visible={showTutorial} onClose={() => setShowTutorial(false)} />
    </>
  )
}

export default Home

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #d1f3ff 10%, #ffffff 23%, #a9e8ff 99%);
  overflow: hidden;
`
const GrassWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 215px;
  object-fit: fill;
`
const Grass = styled.img`
  width: 100%;
`
const Ground = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  background-color: #96c93c;
`
const Cloud = styled.img`
  position: absolute;
  width: 100%;
  height: 215px;
  object-fit: cover;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const Help = styled.div`
  position: absolute;
  right: 0;
  padding: 0.5rem;
  z-index: 999;
  &:hover {
    cursor: pointer;
  }
`
const ProgressWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 50px;
  z-index: 99;
  position: relative;
`
const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`
const Level = styled.div`
  width: 27px;
  height: 27px;
  background-color: #eeeeee;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    position: absolute;
    bottom: 0;
    width: 60%;
  }
`
const ProgressBar = styled.div`
  width: 60%;
  height: 18px;
  background-color: #eeeeee;
  border-radius: 30px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ $remaining }) => ((4 - $remaining) / 4) * 100}%;
    background-color: #ee6565;
    transition: width 0.3s ease-in-out;
  }
`
const ProgressDesc = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--fs15);
  font-weight: bold;
  text-align: center;
`
const Notification = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  top: 137px;
`
const NotificationIcon = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  img {
    width: 40px;
    height: 40px;
  }
  &:hover {
    cursor: pointer;
  }
`
const Counter = styled.div`
  position: absolute;
  bottom: -6px;
  right: 0;
  background-color: #ee6565;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  font-weight: bold;
  font-size: var(--fs10);
  color: var(--color-background);
  display: flex;
  justify-content: center;
  align-items: center;
`
const Tree = styled.div`
  position: absolute;
  bottom: 85px;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  max-height: 470px;
  display: flex;
  justify-content: center;
  img {
    &:hover {
      cursor: ${({ $isAnswered }) => ($isAnswered ? 'default' : 'pointer')};
    }
  }
`
const SignWrapper = styled.div`
  position: absolute;
  bottom: 85px;
  left: 62%;
  width: 58px;
  height: 67px;
  display: flex;
  padding: 1rem;
  box-sizing: content-box;
  &:hover {
    cursor: pointer;
  }
`
const Sign = styled.div`
  position: relative;
  div {
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    font-size: var(--fs12);
    text-align: center;
  }
`
const TodayQuestion = styled.div`
  width: 100%;
  height: 65px;
  border-radius: var(--radius-base);
  background-color: var(--color-secondary);
  position: absolute;
  bottom: 10px;
  text-align: center;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div:nth-of-type(1) {
    font-size: var(--fs15);
  }
  div:nth-of-type(2) {
    font-size: var(--fs12);
    color: var(--font-color-gray);
  }
`
