import styled, { keyframes } from 'styled-components'
import grass from '../assets/main-grass.svg'
import cloud from '../assets/main-cloud.png'
import help from '../assets/icons/main-help.svg'
import leaf from '../assets/icons/leaf-icon.svg'
import flower from '../assets/icons/flower-icon.svg'
import sign from '../assets/main-sign.png'
import rain from '../assets/weather/rain.gif'
import snow from '../assets/weather/snow.gif'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputTextModal } from '../components/modal/InputTextModal'
import { getCurrentWeather, getHomeInfo, updateTreeName } from '../api/home'
import TutorialModal from '../components/modal/TutorialModal'
import { TreeAddedModal } from '../components/modal/TreeAddedModal'
import { calculateRemainingToNextStage, calculateStage } from '../utils/treeState'
import getSortedTreeImages from '../utils/getSortedTreeImages'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['homeInfo'],
    queryFn: getHomeInfo,
    staleTime: 1000 * 60 * 5,
  })

  const [isAnswered, setIsAnswered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [treeName, setTreeName] = useState('')
  const [treeNameChange, setTreeNameChange] = useState(treeName)
  const [leafCount, setLeafCount] = useState(0)
  const [flowerCount, setFlowerCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [treeType, setTreeType] = useState('사과나무')
  const [showTutorial, setShowTutorial] = useState(false)
  const navigate = useNavigate()
  const [weatherType, setWeatherType] = useState('Clear')

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

  useEffect(() => {
    if (data) {
      setAnsweredCount(data.answerCount)
      setLeafCount(data.leafCount)
      setFlowerCount(data.flowerCount)
      setTreeType(data.treeType)
      setTreeName(data.treeName)
      setTreeNameChange(data.treeName)
      setIsAnswered(data.isAnswered)
    }
  }, [data])

  function normalizeWeather(weather) {
    if (['Rain', 'Thunderstorm', 'Drizzle'].includes(weather)) {
      return 'Rain'
    }
    if (weather === 'Clouds' || weather === 'Snow') {
      return weather
    }
    return 'Clear'
  }

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await getCurrentWeather()
        setWeatherType(normalizeWeather(response.data.weather[0].main))
      } catch (error) {
        console.error(error)
      }
    }

    fetchWeather()
  }, [])

  return (
    <>
      <Background weather={weatherType}>
        <Cloud $blur={weatherType === 'Clouds' || weatherType === 'Rain'} src={cloud} alt="cloud" />
        {weatherType === 'Rain' && <BackgroundGif src={rain} alt="비" />}
        {weatherType === 'Snow' && <BackgroundGif src={snow} alt="눈" />}

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

const getGradient = weather => {
  // if (weather === 'Clouds' || weather === 'Rain') {
  //   return 'linear-gradient(145deg, #eceff1 10%, #cfd8dc 23%, #b0bec5 99%)'
  // }
  //
  if (weather === 'Clouds') {
    return 'linear-gradient(145deg, #eceff1 10%, #cfd8dc 23%, #b0bec5 99%);'
  } else if (weather === 'Rain') {
    return 'linear-gradient(145deg, #a0bacc 10%, #c2d3dd 23%, #dfe9ef 99%);'
  } else if (weather === 'Snow') {
    return 'linear-gradient(145deg, #e0e0e0 0%, #f5f5f5 50%, #ffffff 100%);'
  } else {
    return 'linear-gradient(145deg, #d1f3ff 10%, #ffffff 23%, #a9e8ff 99%)'
  }
}

// const Background = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: linear-gradient(145deg, #d1f3ff 10%, #ffffff 23%, #a9e8ff 99%);
//   overflow: hidden;
// `

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ weather }) => getGradient(weather)};
  transition: background 0.5s ease;
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
// const Cloud = styled.img`
//   position: absolute;
//   width: 100%;
//   height: 215px;
//   object-fit: cover;
// `

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
const grow = keyframes`
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
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
    animation: ${grow} 1s ease forwards;
    transform-origin: bottom center;
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

const BackgroundGif = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`

const Cloud = styled.img`
  position: absolute;
  width: 100%;
  height: 215px;
  object-fit: cover;

  filter: ${({ $blur }) => ($blur ? 'blur(2px) brightness(0.85)' : 'none')};
  transition: filter 0.3s ease;
`
