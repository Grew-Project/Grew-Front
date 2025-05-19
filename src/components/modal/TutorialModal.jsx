import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Tutorial1 from '../../assets/tutorial/튜토리얼1.png'
import Tutorial2 from '../../assets/tutorial/튜토리얼2.png'
import Tutorial3 from '../../assets/tutorial/튜토리얼3.png'
import Tutorial4 from '../../assets/tutorial/튜토리얼4.png'
import Tutorial5 from '../../assets/tutorial/튜토리얼5.png'
import Tutorial6 from '../../assets/tutorial/튜토리얼6.png'
import Tutorial7 from '../../assets/tutorial/튜토리얼7.png'
import Tutorial8 from '../../assets/tutorial/튜토리얼8.png'
import Tutorial9 from '../../assets/tutorial/튜토리얼9.png'
import Tutorial10 from '../../assets/tutorial/튜토리얼10.png'
import Tutorial11 from '../../assets/tutorial/튜토리얼11.png'

import CloseButtonImg from '../../assets/icons/close-icon.svg'

import { Pagination, Navigation } from 'swiper/modules'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  z-index: 999;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  width: 100vw;
  max-width: 480px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 30px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    color: var(--color-secondary);
  }
  .swiper-pagination-bullet-active {
    background: var(--color-secondary);
  }
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  padding: 1rem;
`
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  z-index: 999;
`

const TutorialSwiper = ({ visible, onClose }) => {
  return (
    <ModalOverlay visible={visible}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={Tutorial1} alt="튜토리얼1" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Tutorial2} alt="튜토리얼2" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Tutorial3} alt="튜토리얼3" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Tutorial4} alt="튜토리얼4" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Tutorial5} alt="튜토리얼5" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Tutorial6} alt="튜토리얼6" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Tutorial7} alt="튜토리얼7" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Tutorial8} alt="튜토리얼8" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Tutorial9} alt="튜토리얼9" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Tutorial10} alt="튜토리얼10" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={Tutorial11} alt="튜토리얼11" />
        </SwiperSlide>
      </Swiper>
      <CloseButton onClick={onClose}>
        <img src={CloseButtonImg} alt="닫기버튼" />
      </CloseButton>
    </ModalOverlay>
  )
}

export default TutorialSwiper
