import style from './Card-slider.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import Icon from '../../../Icon'
import { useRef, useState, useEffect } from 'react'
import Card from '../Card/Card'
import { globalState } from '../../../helpers/globalState'

export default function CardSlider({ items, title, perView = 1.8 }) {
    const [disabled, setDisabled] = useState('prev')
    const [slidesPerView, setSlidesPerView] = useState(perView)
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
            else setDisabled(false)
        }, 200)
    }

    const prevHandler = () => {
        if (!refPrev.current) {
            refPrev.current = refContainer.current.querySelector('.swiper-button-prev')
        }
        refPrev.current.click()
        setTimeout(() => {
            if (refPrev.current.classList.contains('swiper-button-disabled')) setDisabled('prev')
            else setDisabled(false)
        }, 200)
    }

    useEffect(() => {
        const ww = window.innerWidth
        if (ww <= globalState.sizes.lg && ww > globalState.sizes.sm) {
            setSlidesPerView(2.2)
        } else if (ww <= globalState.sizes.sm) {
            setSlidesPerView(1.6)
        }
    }, [])

    return (
        <div ref={refContainer} className='p-relative'>
            <div className='text--bold text--a3 pb-1'>{title}</div>
            <div onClick={nextHandler} data-disabled={disabled === 'next'} className={style.navIconNext}>
                <Icon name='chevronRight' width='16' height='16' />
            </div>
            <div onClick={prevHandler} data-disabled={disabled === 'prev'} className={style.navIconPrev}>
                <Icon name='chevronLeft' width='16' height='16' />
            </div>
            <div className={style.swiperWrapper}>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={slidesPerView}
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
            </div>

            <style jsx global>
                {`
                    .swiper {
                        overflow: visible;
                    }
                    .swiper a >div {
                        pointer-events: none;
                    }
                    .swiper a >div+div {
                        display: none;
                    }

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