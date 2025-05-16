import { useEffect, useMemo, useState } from 'react'
import TitleListItem from '../components/TitleListItem'
import { getMyAnswerDetail } from '../api/mypage'
import useAuthStore from '../store/useAuthStore'
import lockIcon from '@/assets/icons/lock-icon.svg'
import { Spinner } from '../components/Spinner'
import styled from 'styled-components'

export const MyAnswers = () => {
  const [postList, setPostList] = useState([])
  const nickname = useAuthStore(state => state.nickname)
  const [isLoading, setIsLoading] = useState(false)

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
  }, [])

  // const handleItemClick = () => {}

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.entries(groupByYearMonth).map(([year, months]) => (
          <div key={year}>
            <YearText>{year}년</YearText>

            {Object.entries(months).map(([month, posts]) => (
              <div key={month}>
                <MonthText>{month}월</MonthText>
                <List>
                  {posts.map(post => (
                    <Item key={post._id}>
                      <DateText>{new Date(post.created_at).getDate()}일</DateText>
                      <QuestionText>
                        {post.question_content}
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
    </div>
  )
}
const YearText = styled.h2`
  font-size: 1rem;
`

const MonthText = styled.h3`
  font-size: 1rem;
  margin: 0.8rem 0 0.3rem;
`

const List = styled.div`
  border-left: 2px solid var(--color-gray);
  margin-left: 0.6rem;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 0;
  margin-left: 0.5rem;
  position: relative;

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
  margin: 0 0.6rem;
`

const QuestionText = styled.div`
  color: var(--color-primary);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: bold;

  img {
    width: 12px;
    margin-left: 0.5rem;
  }
`
