import { useAnimationControls, motion } from 'framer-motion'
import style from '../Catalog.module.scss'
import { useRef, useEffect, useState } from 'react'
import Icon from '../../Icon'
import { globalState } from '../../helpers/globalState'

export default function FastFilter({ onAfterChange, fastFilters, resetAllHandler }) {
    const scrollPixels = 200
    const refWrapper = useRef(0)
    const refInner = useRef(null)
    const refScrollPos = useRef(0)
    const refScrollLimit = useRef(2)
    const refScrollOfset = useRef(0)
    const refIsStartDrag = useRef(false)
    const animateInner = useAnimationControls()
    const [position, setPosition] = useState('none')
    const [dragConstraints, setDragConstraints] = useState(0)

    const scrollTo = to => {
        if (to == 'prev') {
            refScrollPos.current = refScrollPos.current - refScrollOfset.current
            animateInner.start({ x: -refScrollPos.current, transition: { duration: 0.5, ease: 'easeInOut' } })
            if (refScrollPos.current <= scrollPixels) {
                animateInner.start({ x: 0, transition: { duration: 0.4, ease: 'easeInOut' } })
                refScrollPos.current = 0
                return setPosition('start')
            }
        } else {
            refScrollPos.current = refScrollPos.current + refScrollOfset.current
            animateInner.start({ x: -refScrollPos.current, transition: { duration: 0.5, ease: 'easeInOut' } })
            if (refScrollPos.current >= -(dragConstraints + scrollPixels)) {
                animateInner.start({ x: dragConstraints, transition: { duration: 0.4, ease: 'easeInOut' } })
                refScrollPos.current = -dragConstraints
                return setPosition('end')
            }
        }
        setPosition(false)
    }

    const dragStartHandler = () => {
        setPosition('none')
        refIsStartDrag.current = true
    }

    const dragEndHandler = () => {
        setTimeout(() => refIsStartDrag.current = false, 200)
        setTimeout(() => {
            const transform = refInner.current.style.transform
            const position = +transform.split('translateX(')[1].split('px)')[0]
            if (transform === 'none' || position >= 0) {
                refScrollPos.current = 0
                return setPosition('start')
            } else if (position <= dragConstraints + 50) {
                refScrollPos.current = -dragConstraints
                return setPosition('end')
            } else {
                refScrollPos.current = -position
                return setPosition(false)
            }
        }, 400)
    }

    const calculateScroll = () => {
        let dragWidth = 0
        const ww = window.innerWidth
        if (ww < globalState.sizes.sm) dragWidth = 24
        else if (ww >= globalState.sizes.sm && ww < globalState.sizes.lg) dragWidth = 32
        else dragWidth = 8

        const innerElements = Array.from(refInner.current.childNodes)
        innerElements.forEach(el => dragWidth += el.clientWidth + 8)
        setDragConstraints(refWrapper.current.clientWidth - dragWidth)
    }

    const clickHandler = (event, item) => {
        const target = event.target
        // setTimeout(calculateScroll, 400)
        if (target.getAttribute('data-active') === 'true') return resetAllHandler()
        const fastFiltersContainer = document.querySelectorAll('.js-fast-filters')
        const value = target.innerText
        onAfterChange(item)
        setTimeout(() => {
            fastFiltersContainer.forEach(container => {
                const items = container.querySelectorAll('.js-fast-filters-item')
                items.forEach(item => {
                    item.setAttribute('data-active', item.innerText === value)
                })
            })
        }, 150)
    }

    // const clickHandler = (index, item) => {
    //     if (refIsStartDrag.current) return
    //     if (index === activeFilter) setActiveFilter(() => {
    //         setTimeout(calculateScroll, 400)
    //         return false
    //     })
    //     else setActiveFilter(() => {
    //         setTimeout(calculateScroll, 400)
    //         return index
    //     })
    //     onAfterChange(item)
    // }

    useEffect(() => {
        setTimeout(() => {
            const scrollWidth = refWrapper.current.scrollWidth
            const clientWidth = refWrapper.current.clientWidth

            if (scrollWidth > clientWidth) {
                let dragWidth = 0
                const ww = window.innerWidth
                if (ww < globalState.sizes.sm) dragWidth = 24
                else if (ww >= globalState.sizes.sm && ww < globalState.sizes.lg) dragWidth = 32
                else dragWidth = 8

                const innerElements = Array.from(refInner.current.childNodes)
                innerElements.forEach(el => dragWidth += el.clientWidth + 8)
                setDragConstraints(refWrapper.current.clientWidth - dragWidth)
                console.log(refWrapper.current.clientWidth - dragWidth);

                refScrollLimit.current = Math.floor((dragWidth - clientWidth) / scrollPixels)
                refScrollOfset.current = (dragWidth - clientWidth) / refScrollLimit.current
                animateInner.start({ x: 0 })
                refScrollPos.current = 0
                setPosition('start')
            } else setPosition('none')
        }, 2500)
    }, [])

    return (
        <>
            <div className={style.fastFilterContainer}>
                <div onClick={() => scrollTo('prev')} data-position={position === 'start' || position === 'none'} className={style.fastFilterPrev}>
                    <Icon name='chevronLeft' width='18' height='18' />
                </div>

                <div ref={refWrapper} className={`${style.fastFilterWrapper} js-fast-filters`}>
                    <motion.div
                        drag='x'
                        ref={refInner}
                        dragElastic={0.2}
                        animate={animateInner}
                        onDragEnd={dragEndHandler}
                        onDragStart={dragStartHandler}
                        className={style.fastFilterInner}
                        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                        dragConstraints={{ right: 0, left: dragConstraints }}>
                        {fastFilters.map((item, index) => (
                            <div
                                key={item.name}
                                onClick={event => clickHandler(event, item)}
                                className={`${style.fastFilterItem} js-fast-filters-item text--p5 text--upper`}>
                                {item.name}
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div onClick={() => scrollTo('next')} data-position={position === 'end' || position === 'none'} className={style.fastFilterNext}>
                    <Icon name='chevronRight' width='18' height='18' />
                </div>
                {/* <div className='is-hidden--xl-up text--t5 text--bold text--upper text--center text--color-small mt-1.5'>НАЙДЕНО 668 ТОВАРОВ</div> */}
            </div>
        </>
    )
}
