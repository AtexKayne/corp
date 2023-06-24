import style from './Card-slider.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import Icon from '../../../Icon'
import { useRef, useState } from 'react'
import Card from '../Card/Card'

export default function CardSlider({ items, title }) {
    const [disabled, setDisabled] = useState('prev')
    const refContainer = useRef(null)
    const refNext = useRef(false)
    const refPrev = useRef(false)

    const nextHandler = () => {
        if (!refNext.current) {
            refNext.current = refContainer.current.querySelector('.swiper-button-next')
        }
        refNext.current.click()
        setTimeout(() => {
            if (refNext.current.classList.contains('swiper-button-disabled')) setDisabled('next')
        }, 200)
    }

    const prevHandler = () => {
        if (!refPrev.current) {
            refPrev.current = refContainer.current.querySelector('.swiper-button-prev')
        }
        refPrev.current.click()
        setTimeout(() => {
            if (refPrev.current.classList.contains('swiper-button-disabled')) setDisabled('prev')
        }, 200)
    }

    return (
        <div ref={refContainer} className='p-relative'>
            <div className='text--bold text--a3 pb-1'>Недавно просмотрено</div>
            <div onClick={nextHandler} data-disabled={disabled === 'next'} className={style.navIconNext}>
                <Icon name='chevronRight' width='16' height='16'/>
            </div>
            <div onClick={prevHandler} data-disabled={disabled === 'prev'} className={style.navIconPrev}>
                <Icon name='chevronLeft' width='16' height='16'/>
            </div>
            <Swiper
                spaceBetween={30}
                slidesPerView={2}
                navigation={true}
                modules={[Navigation]}
                className={style.swiper}>
                {items && items.length
                    ? items.map(item => (
                        <SwiperSlide key={item.id}>
                            <Card info={item} />
                        </SwiperSlide>)
                    )
                    : null
                }
            </Swiper>

            <style jsx global>
                {`
                    .swiper-button-next,
                    .swiper-button-prev {
                        cursor: pointer;
                        position: absolute;
                    }
                `}
            </style>
        </div>
    )
}