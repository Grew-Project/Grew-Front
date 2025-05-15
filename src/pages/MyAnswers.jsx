import { useEffect, useState } from 'react'
import TitleListItem from '../components/TitleListItem'
import { getMyAnswers } from '../api/mypage'
import useAuthStore from '../store/useAuthStore'
import lockIcon from '@/assets/icons/lock-icon.svg'
import { Spinner } from '../components/Spinner'

export const MyAnswers = () => {
  const [postList, setPostList] = useState([])
  const nickname = useAuthStore(state => state.nickname)
  const [isLoading, setIsLoading] = useState(false)

  const fetchMyAnswers = async () => {
    try {
      setIsLoading(true)
      const data = await getMyAnswers(nickname)
      setPostList(data)
      console.log(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMyAnswers()
  }, [])

  const handleItemClick = () => {}

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        postList.map(post => (
          <TitleListItem
            title={post.question_content}
            icon={!post.is_public && lockIcon}
            onItemClick={handleItemClick}
          />
        ))
      )}
    </div>
  )
}
