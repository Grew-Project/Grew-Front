import styled from 'styled-components'

import { Link } from 'react-router-dom'
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
import { useEffect, useState } from 'react'
import { getForest } from '../api/forest'
import { Spinner } from '../components/Spinner'
import { Header } from '../components/Header'

const Forest = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [treeData, setTreeData] = useState([])

  useEffect(() => {
    const fetchForest = async () => {
      try {
        setIsLoading(true)
        const res = await getForest()
        if (res.status === 200) {
          setTreeData(res.data.groups)
          setTotal(res.data.total)
          console.log(res.data.groups)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchForest()
  }, [])
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

  return (
    <>
      <Header center={<span>마음숲</span>} />

      <ForestContainer>
        {isLoading ? (
          <SpinnerWrapper>
            <Spinner color="gray" />
          </SpinnerWrapper>
        ) : total === 0 ? (
          <Empty>아직 다 자란 나무가 없어요.</Empty>
        ) : (
          treeData.map((tree, idx) => (
            <TreeContainer to={`/report/${idx + 1}`} key={idx}>
              <TreeImgWrapper>
                <img src={treeImages[tree.tree_type]} alt={tree.tree_type} />
                <img src={emotionImages[tree.dominant_emotion]} alt={tree.dominant_emotion} />
              </TreeImgWrapper>
              <TreeName>{tree.tree_name}</TreeName>
            </TreeContainer>
          ))
        )}
      </ForestContainer>
    </>
  )
}

export default Forest

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
