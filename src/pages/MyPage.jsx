import { useEffect, useState } from 'react'
import TitleListItem from '../components/TitleListItem'
import nextIcon from '@/assets/icons/next-icon.svg'
import { useNavigate } from 'react-router-dom'
import { InputModal } from '../components/modal/InputModal'
import { ConfirmModal } from '../components/modal/ConfirmModal'
import { changePassword } from '../api/mypage'

const MyPage = () => {
  const nickname = '테스트' // 임시 데이터
  const userId = 'test123' // 임시 데이터

  const [modalType, setModalType] = useState(null)
  const navigate = useNavigate()
  const [pwValues, setPwValues] = useState({})
  const [pwErrors, setPwErrors] = useState({})

  const menuList = [
    { name: '내 답변 리스트', route: '/answers' },
    { name: '마음숲/감정리포트', route: '/forest' },
    { name: '비밀번호 변경', modalType: 'password' },
    { name: '고객센터', route: 'support' },
    { name: '로그아웃', modalType: 'logout' },
  ]

  const handleMenuClick = menu => {
    if (menu.route) {
      navigate(`${menu.route}`)
    } else {
      setModalType(menu.modalType)
    }
  }

  useEffect(() => {
    const { current, new: newPw, confirm } = pwValues
    const errors = {}

    if (current !== undefined && !current) {
      errors.current = '현재 비밀번호를 입력해주세요'
    }

    if (newPw !== undefined) {
      if (!newPw) {
        errors.new = '새로운 비밀번호를 입력해주세요'
      } else if (newPw.length < 8) {
        errors.new = '비밀번호는 8자 이상이어야 합니다'
      }
    }

    if (confirm !== undefined) {
      if (!confirm) {
        errors.confirm = '비밀번호를 다시 입력해주세요'
      } else if (newPw !== confirm) {
        errors.confirm = '비밀번호가 일치하지 않아요'
      }
    }

    setPwErrors(errors)
  }, [pwValues])

  const handlePwChange = async () => {
    const { current, new: newPw } = pwValues

    if (!current || !newPw) {
      setPwErrors({
        ...(!current && { current: '현재 비밀번호를 입력해주세요' }),
        ...(!newPw && { new: '새로운 비밀번호를 입력해주세요' }),
      })
      return
    }

    if (Object.keys(pwErrors).length > 0) return

    try {
      await changePassword(current, newPw, userId)
      setModalType(null)
      setPwValues({})
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {}

  return (
    <div>
      {menuList.map((menu, index) => (
        <TitleListItem
          key={index}
          title={menu.name}
          icon={nextIcon}
          onItemClick={() => handleMenuClick(menu)}
        />
      ))}
      {modalType === 'password' && (
        <InputModal
          title="비밀번호 변경"
          inputs={[
            { name: 'current', placeholder: '현재 비밀번호', type: 'password' },
            { name: 'new', placeholder: '새로운 비밀번호', type: 'password' },
            { name: 'confirm', placeholder: '새로운 비밀번호 확인', type: 'password' },
          ]}
          values={pwValues}
          errors={pwErrors}
          action={'설정'}
          onChange={(name, value) => setPwValues({ ...pwValues, [name]: value })}
          onCancel={() => {
            setModalType(null)
            setPwValues({})
          }}
          onConfirm={handlePwChange}
        />
      )}
      {modalType === 'logout' && (
        <ConfirmModal
          message={'로그아웃 하시겠습니까?'}
          onCancel={() => setModalType(null)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  )
}

export default MyPage
