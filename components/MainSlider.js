import {useRef} from 'react';
import style from '../styles/module/main-slider.module.scss'
import Loading from './Loading';

export default function MainSlider({slides}) {
    const refSlider     = useRef(null)
    const refProgress   = useRef(null)
    const clickHandler  = (e) => {
        const target = e.target
        const link   = target.getAttribute('data-link')
        if (link) {
            const sliderItems      = refSlider.current.children
            const activeSlide      = refSlider.current.querySelector('[data-active="active"]')
            const activePagination = target.parentNode.querySelector('[data-active="active"]')
            if (activePagination.getAttribute('data-link') !== link) {
                target.setAttribute('data-active', 'active')
                activeSlide.setAttribute('data-active', 'false')
                activePagination.setAttribute('data-active', 'false')
                sliderItems[link].setAttribute('data-active', 'active')
                refProgress.current.style.width = `calc(${(100 / sliderItems.length) * (+link + 1)}% - 5px)`
            }
        }
    }

    if (!slides) {
        return (
            <Loading />
        )
    }
    return (
        <div className={style.slider}>
            <div ref={refSlider} className={style.slides}>
                {slides.map((slide, index) => (
                    <div 
                        className={`${style.sliderItem} text--c2`} 
                        key={slide.id}
                        data-active={!index ? 'active' : 'false'}>
                        <div>{slide.text[0]}</div>
                        <div>{slide.text[1]}</div>
                    </div>
                ))}
            </div>
            <div className={`${style.pagination} c-hover`}>
                <div onClick={clickHandler} className={style.paginationItems}>
                    {slides.map((slide, index) => (
                        <div 
                            data-active={!index ? 'active' : 'false'} 
                            data-link={index} 
                            key={slide.id} 
                            className={style.paginationItem}>
                        </div>
                    ))}
                </div>
                <div className={style.paginationLine}>
                    <svg width='100%' height='100%'>
                        <pattern id='pagination' x='0' y='0' width='40' height='10' stroke='none' patternUnits='userSpaceOnUse' >
                            <line x1='-1' y1='10' x2='21' y2='0' fill='none' strokeWidth='2'/>
                            <line x1='19' y1='0' x2='41' y2='10' fill='none' strokeWidth='2'/>
                        </pattern>
                        
                        <rect id='filler' x='0' y='0' width='100%' height='10' fill='url(#pagination)'/>   
                    </svg>
                </div>
                <div ref={refProgress} className={style.paginationProgress}>
                    <svg width='100%' height='100%'>
                        <pattern id='progress' x='0' y='0' width='40' height='10' stroke='none' patternUnits='userSpaceOnUse' >
                            <line x1='-1' y1='10' x2='21' y2='0' fill='none' strokeWidth='2'/>
                            <line x1='19' y1='0' x2='41' y2='10' fill='none' strokeWidth='2'/>
                        </pattern>
                        
                        <rect id='filler' x='0' y='0' width='100%' height='10' fill='url(#progress)'/>   
                    </svg>
                </div>
            </div>
        </div>
    )
}