import { useEffect, useMemo, useState } from 'react'
import { getMyAnswerDetail } from '../api/mypage'
import useAuthStore from '../store/useAuthStore'
import lockIcon from '@/assets/icons/lock-icon.svg'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import Empty from '../components/Empty'

export const MyAnswers = () => {
  const [postList, setPostList] = useState([])
  const nickname = useAuthStore(state => state.nickname)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const fetchMyAnswers = async () => {
    try {
      setIsLoading(true)
      const data = await getMyAnswerDetail(nickname)
      setPostList(data)
      // console.log(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const groupByYearMonth = useMemo(() => {
    return postList.reduce((acc, post) => {
      const date = new Date(post.created_at)
      const year = date.getFullYear()
      const month = date.getMonth() + 1

      if (!acc[year]) acc[year] = {}
      if (!acc[year][month]) acc[year][month] = []

      acc[year][month].push(post)
      console.log(acc)
      return acc
    }, {})
  }, [postList])

  useEffect(() => {
    fetchMyAnswers()
  }, [nickname])

  const handleItemClick = answerId => {
    navigate(`/my-answers/${answerId}`)
  }

  return (
    <>
      <Header center={<span>내 답변 리스트</span>} />

      {isLoading ? (
        <Loading />
      ) : Object.entries(groupByYearMonth).length === 0 ? (
        <Empty>아직 작성한 답변이 없어요</Empty>
      ) : (
        Object.entries(groupByYearMonth).map(([year, months]) => (
          <div key={year}>
            <YearText>{year}년</YearText>

            {Object.entries(months).map(([month, posts]) => (
              <div key={month}>
                <MonthText>{month}월</MonthText>
                <List>
                  {posts.map(post => (
                    <Item key={post.answer_id} onClick={() => handleItemClick(post.answer_id)}>
                      <DateText>{new Date(post.created_at).getDate()}일</DateText>
                      <QuestionText>
                        <span>{post.question_content}</span>
                        {!post.is_public && <img src={lockIcon} alt="비공개" />}
                      </QuestionText>
                    </Item>
                  ))}
                </List>
              </div>
            ))}
          </div>
        ))
      )}
    </>
  )
}
const YearText = styled.h2`
  font-size: 1rem;
  margin-top: 1rem;
`

const MonthText = styled.h3`
  font-size: 1rem;
  margin: 1rem 0 0.3rem;
`

const List = styled.div`
  border-left: 2px solid var(--color-gray);
  margin-left: 0.6rem;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0.85rem 0;
  margin-left: 0.5rem;
  position: relative;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    left: -12px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-black);
  }
`

const DateText = styled.div`
  min-width: 40px;
  margin: 0 0.6rem;
`

const QuestionText = styled.div`
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: bold;

  span {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  img {
    width: 12px;
    margin-left: 0.5rem;
  }
`
