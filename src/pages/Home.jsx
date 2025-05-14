import styled from 'styled-components'
import grass from '../assets/main-grass.svg'
import cloud from '../assets/main-cloud.png'
import help from '../assets/icons/main-help.svg'
import leaf from '../assets/icons/leaf-icon.svg'
import flower from '../assets/icons/flower-icon.svg'

const Home = () => {
  const treeImages = import.meta.glob('../assets/trees/사과나무*.png', {
    eager: true,
    import: 'default',
  })
  const sortedTreeImages = Object.entries(treeImages)
    .sort(([a], [b]) => {
      const numA = parseInt(a.match(/사과나무(\d+)/)[1])
      const numB = parseInt(b.match(/사과나무(\d+)/)[1])
      return numA - numB
    })
    .map(([, value]) => value)

  const TOTAL_QUESTIONS = 16 // 총 질문 수
  const MAX_STAGE = 4 // 총 단계 수 (나무 1~4단계)
  const QUESTIONS_PER_STAGE = TOTAL_QUESTIONS / MAX_STAGE // 단계별 질문 수 = 4
  const answeredCount = 0

  const calculateStage = answeredCount => {
    return Math.min(Math.floor(answeredCount / QUESTIONS_PER_STAGE) + 1, MAX_STAGE)
  }
  const calculateRemainingToNextStage = answeredCount => {
    const currentStage = calculateStage(answeredCount)
    const nextStageThreshold = currentStage * QUESTIONS_PER_STAGE

    if (answeredCount >= TOTAL_QUESTIONS) return 0
    return nextStageThreshold - answeredCount
  }

  const currentStage = calculateStage(answeredCount) - 1
  const remaining = calculateRemainingToNextStage(answeredCount)

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
        <Help>
          <img src={help} alt="help" />
        </Help>
        <ProgressWrapper>
          <ProgressBarWrapper>
            <Level>
              <img src={sortedTreeImages[currentStage]} alt={`나무 이미지`} />
            </Level>
            <ProgressBar remaining={remaining}></ProgressBar>
            <Level>
              {answeredCount < 12 && (
                <img src={sortedTreeImages[currentStage + 1]} alt={`나무 이미지`} />
              )}
            </Level>
          </ProgressBarWrapper>
          <ProgressDesc>
            {answeredCount >= 12
              ? `나무 완성까지 ${remaining}개의 질문이 남았어요`
              : `다음 단계까지 ${remaining}개의 질문이 남았어요`}
          </ProgressDesc>
        </ProgressWrapper>
        <Notification>
          <NotificationIcon>
            <img src={leaf} alt="잎사귀" />
            <Counter>1</Counter>
          </NotificationIcon>
          <NotificationIcon>
            <img src={flower} alt="응원꽃" />
            <Counter>5</Counter>
          </NotificationIcon>
        </Notification>
        <Tree>
          <img src={sortedTreeImages[currentStage]} alt="나무 이미지" />
        </Tree>
      </Container>
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
  z-index: -999;
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
    width: ${({ remaining }) => ((4 - remaining) / 4) * 100}%;
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
`
