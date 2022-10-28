import style from '../../styles/module/brands/brand-list.module.scss'
import Image from 'next/image'
import { motion, useAnimationControls, useMotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import A from '../../components/A'
import PrevButton from '../../components/PrevButton'
import KaleidoscopeImage from '../../components/KaleidoscopeImage'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'

export default function BrandList({ items, tags }) {
    const [sliderActive, setSliderActive] = useState(false)
    const [scrollWidth, setScrollWidth] = useState(-100)
    const [isDragging, setIsDragging] = useState(false)
    const [activeElem, setActiveElem] = useState(false)
    const [tagActive, setTagActive] = useState([])
    const [elements, setElements] = useState(items)
    const [letter, setLetter] = useState('AZ')

    const steps = items ? items.length : 1
    const refSlider = useRef(null)
    const refContent = useRef(null)
    const refTagInner = useRef(null)
    const refSliderItem = useRef(null)
    const refCurrentItem = useRef(null)
    const refTagContainer = useRef(null)
    const refSliderContent = useRef(null)
    const refIsTitleShown = useRef('start')
    const refStartContentTouch = useRef(false)
    const refContentCurrentTouch = useRef(0)
    const { isMobile } = useDeviceDetect()
    const animateItemY = useMotionValue(0)
    const animateNav = useAnimationControls()
    const animateItem = useAnimationControls()
    const animateTitle = useAnimationControls()
    const animateBlock = useAnimationControls()
    const animateScroll = useAnimationControls()
    const animateTagInner = useAnimationControls()
    const animateTagRemote = useAnimationControls()
    const animateTagsContainer = useAnimationControls()
    const kaleidoscopeHeight = isMobile ? 452 : 900
    const itemHeight = isMobile ? 52 : 70

    const clickHandler = (index, isActive) => {
        if (isActive) return
        setSliderActive(true)
        const position = index * refSlider.current.clientHeight / steps + 10
        animateItem.start({ y: position, transition: { type: 'tween' } })
    }

    const remoteTagClickHandler = () => {
        animateTagInner.start({ x: 0 })
        animateTagRemote.start({ x: -100, opacity: 0, pointerEvents: 'none', transition: { duration: 0.5 } })
    }

    const setTagScrollWidth = () => {
        let scrollWidth = 0
        const innerElements = Array.from(refTagInner.current.childNodes)
        innerElements.forEach(el => scrollWidth += el.offsetWidth + 20)
        setScrollWidth(refTagContainer.current.clientWidth - scrollWidth)
    }

    const tagClickHandler = (index) => {
        if (isDragging) return
        if (tagActive.includes(index)) {
            const tagSplice = [...tagActive]
            tagSplice[tagActive.indexOf(index)] = false
            const filteredTags = tagSplice.filter(element => element !== false)
            setTagActive(filteredTags)
        } else {
            setTagActive([...tagActive, index])
        }

        setTagScrollWidth()
    }

    const containerEndDragHandler = () => {
        setTimeout(() => {
            const transform = refContent.current.style.transform
            const position = +transform.split('translateY(')[1].split('px)')[0]
            if (position <= -50 && position > -150 && refIsTitleShown.current !== 'next') startAnimateTags()
        }, 300)
    }

    const containerTouchMoveHandler = event => {
        const position = refContentCurrentTouch.current + refStartContentTouch.current - event.touches[0].screenY
        console.log(position)
        animateItem.start({ y: position, transition: { type: 'tween' } })
        // if (refIsContentScroll.current) return
        // refIsContentScroll.current = true
        // const transform = refContent.current.style.transform
        // const position = +transform.split('translateY(')[1].split('px)')[0]
        // if (position <= -50 && position > -150 && refIsTitleShown.current !== 'next') startAnimateTags()
        // else if (position <= -150 && refIsTitleShown.current !== 'end') endAnimateTags()
        // else if (position > -50 && refIsTitleShown.current !== 'start') showAnimateTags()
        // setTimeout(() => refIsContentScroll.current = false, 100)
    }

    const containerTouchEndHandler = event => {
        const position = refContentCurrentTouch.current + refStartContentTouch.current - event.changedTouches[0].screenY
        refContentCurrentTouch.current = position
    }

    const containerTouchStartHandler = event => {
        setSliderActive(true)
        refStartContentTouch.current = event.touches[0].screenY
    }

    const startAnimateTags = () => {
        refIsTitleShown.current = 'next'
        animateNav.start({ y: isMobile ? 0 : -40, transition: { duration: 0.4 } })
        animateTitle.start({ y: isMobile ? -60 : -40, transition: { duration: 0.4 } })
        animateTagsContainer.start({ y: -80, opacity: 0, pointerEvents: 'none', transition: { duration: 0.4 } })
    }

    const endAnimateTags = () => {
        refIsTitleShown.current = 'end'
        animateNav.start({ y: -200, transition: { duration: 0.4 } })
        animateTitle.start({ y: -200, transition: { duration: 0.4 } })
    }

    const showAnimateTags = () => {
        refIsTitleShown.current = 'start'
        animateNav.start({ y: 0, transition: { duration: 0.4 } })
        animateTitle.start({ y: 0, transition: { duration: 0.4 } })
        animateTagsContainer.start({ y: 0, opacity: 1, pointerEvents: 'all', transition: { duration: 0.4 } })
    }

    const moveDrag = event => {
        const index = Math.floor(event.y / ((refSlider.current.clientHeight - 20) / steps))
        const currentElement = elements[index]
        animateItemY.set(event.y)

        if (currentElement && refCurrentItem.current !== currentElement.name && sliderActive) {
            const titlePosition = refIsTitleShown.current
            refCurrentItem.current = currentElement.name

            setActiveElem(currentElement)
            setLetter(refCurrentItem.current[0].toUpperCase())

            animateScroll.start({
                y: index * itemHeight * -1,
                transition: {
                    type: 'tween'
                }
            })

            if (titlePosition === 'start' || (titlePosition === 'end' && index < 3)) startAnimateTags()
            else if (titlePosition === 'next' && index >= 3) endAnimateTags()

            animateBlock.start({ y: isMobile ? 220 : 260, height: isMobile ? '50vh' : '290px', transition: { duration: 1 } })

        } else if (!elements[index] && letter !== 'AZ') {
            refCurrentItem.current = false
            setLetter('AZ')
            showAnimateTags()
            setActiveElem(false)
            setSliderActive(false)
            animateBlock.start({ y: 0, height: '0px', transition: { duration: 1 } })
        }
    }

    const tagsEndDrag = () => {
        const transform = refTagInner.current.style.transform
        const position = +transform.split('translateX(')[1].split('px)')[0]
        if (!isMobile && (transform === 'none' || position >= 0)) {
            animateTagRemote.start({ x: -100, opacity: 0, pointerEvents: 'none', transition: { duration: 0.5 } })
        }
        setTimeout(() => setIsDragging(false), 50)
    }

    const tagsStartDrag = () => {
        setIsDragging(true)
        if (!isMobile) animateTagRemote.start({ x: 0, opacity: 1, pointerEvents: 'all', transition: { duration: 0.2 } })
    }

    const wheelHandler = event => {
        const scrollPixels = refSlider.current.clientHeight / steps
        const scrollDirection = event.deltaY > 0 ? scrollPixels : scrollPixels * -1
        let scrollTo = scrollDirection + animateItemY.current - 10

        if (scrollTo < 0) scrollTo = -1
        else if (scrollTo >= refSlider.current.clientHeight - itemHeight) scrollTo = refSlider.current.clientHeight - 10
        if (scrollTo > 0) setSliderActive(true)
        animateItem.start({ y: scrollTo, transition: { type: 'tween' } })
    }

    useEffect(() => {
        setElements(items.sort((x, y) => {
            const xName = x.name.toUpperCase()
            const yName = y.name.toUpperCase()
            if (xName < yName) { return -1 }
            if (xName > yName) { return 1 }
            return 0
        }))

        setTagScrollWidth()
    }, [items])
    return (
        <div className={style.brandListWrapper}>
            <motion.div initial={{ height: '0px' }} className={style.filterBlock} animate={animateBlock} />
            <motion.div animate={animateNav} className={style.brandListNav}>
                <PrevButton text='SIMRUSSIA' />
                <span className='is-hidden--md-down'>Поделиться</span>
            </motion.div>
            <div className={style.brandList}>
                <motion.h1 animate={animateTitle} className={`${style.brandListTitle} text--h4`}>
                    Бренды
                </motion.h1>
                <motion.div ref={refTagContainer} animate={animateTagsContainer} data-dragging={isDragging} className={style.brandListTagsContainer}>
                    <motion.div onClick={remoteTagClickHandler} animate={animateTagRemote} initial={{ x: -100, opacity: 0, pointerEvents: 'none' }} className={`${style.brandListTagRemote} c-hover`} />
                    <motion.div
                        drag='x'
                        ref={refTagInner}
                        animate={animateTagInner}
                        onPanEnd={tagsEndDrag}
                        onPanStart={tagsStartDrag}
                        dragConstraints={{ left: scrollWidth, right: 0 }}
                        className={`${style.brandListTagsInner} c-dragh text--p2`}>
                        {tags ?
                            tags.map((tag, index) => (
                                <div className={style.brandListTag} data-active={tagActive.includes(index)} key={tag} onClick={() => tagClickHandler(index)}>
                                    <span>{tag}</span>
                                    <span className={style.brandListTagClose} />
                                </div>
                            )) : ''
                        }
                    </motion.div>
                </motion.div>

                <div ref={refSlider} data-active={sliderActive} className={`${style.brandListSlider}`}>
                    <motion.div
                        drag='y'
                        ref={refSliderItem}
                        onUpdate={moveDrag}
                        dragMomentum={false}
                        animate={animateItem}
                        dragConstraints={refSlider}
                        onPanStart={() => setSliderActive(true)}
                        className={`${style.brandListSliderItem} text--p2 c-dragv`}>
                        {letter}
                    </motion.div>
                    <Arrow />
                    <div className={style.brandListSliderLine}></div>
                </div>

                <div ref={refSliderContent} onWheel={wheelHandler} className={style.brandListSliderContent}>
                    <motion.div
                        // drag={isMobile ? 'y' : 'none'}
                        onTouchMove={isMobile ? containerTouchMoveHandler : null}
                        onTouchStart={isMobile ? containerTouchStartHandler : null}
                        onTouchEnd={isMobile ? containerTouchEndHandler : null}
                        // onPanStart={isMobile ? containerStartDragHandler : null}
                        // onPanEnd={isMobile ? containerEndDragHandler : null}
                        // dragConstraints={{ top: scrollHeight, bottom: 0 }}
                        animate={animateScroll}
                        ref={refContent}
                        className={style.brandListSliderContentInner}>
                        {elements ?
                            elements.map((item, index) => (
                                <div
                                    key={item.name}
                                    data-active={activeElem === item}
                                    onClick={() => clickHandler(index, activeElem === item)}
                                    className={`${style.brandListSliderContentItem} c-hover`}>
                                    <div className={`${style.brandListSliderContentItemTitle} text--c2`}>{item.name}</div>
                                    <div className={`${style.brandListSliderContentItemLink} c-hover`}>
                                        <A externalC href={`brand/${item.name}`} text={item.name} />
                                        <svg width='61' height='16' viewBox='0 0 61 16' fill='none'>
                                            <line y1='10' x2='30' y2='10' stroke='currentColor' strokeWidth='2' />
                                            <line x1='30' y1='8' x2='60' y2='8' stroke='currentColor' strokeWidth='2' />
                                            <path d='M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3431 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3431 15.0711L60.7071 8.70711ZM59 9H60V7H59V9Z' fill='currentColor' />
                                        </svg>
                                    </div>
                                    <div className={style.brandListSliderContentItemText}>{item.text}</div>
                                    <div className={style.brandListSliderContentItemImage}>
                                        <Image src={item.logo} alt={item.name} width='100%' height='100%' />
                                    </div>
                                </div>
                            )) : ''}
                    </motion.div>
                </div>
            </div>

            <div className={style.kaleidoscope}>
                <KaleidoscopeImage height={kaleidoscopeHeight} />
            </div>
        </div>
    )
}


function Arrow() {
    return (
        <svg className={style.brandListSliderArrow} width='25' height='72' viewBox='0 0 25 72' fill='none'>
            <g>
                <path fillRule='evenodd' clipRule='evenodd' d='M22.5234 7.98413L13.493 17.0146L12.4947 16.0163L21.5252 6.98586L22.5234 7.98413Z' fill='#6C7996' />
                <path fillRule='evenodd' clipRule='evenodd' d='M3.47462 6.98536L12.5036 16.0145L11.5053 17.0128L2.47634 7.98362L3.47462 6.98536Z' fill='#6C7996' />
            </g>
            <g>
                <path fillRule='evenodd' clipRule='evenodd' d='M22.5234 31.9841L13.493 41.0146L12.4947 40.0163L21.5252 30.9859L22.5234 31.9841Z' fill='#6C7996' />
                <path fillRule='evenodd' clipRule='evenodd' d='M3.47462 30.9854L12.5036 40.0145L11.5053 41.0128L2.47634 31.9836L3.47462 30.9854Z' fill='#6C7996' />
            </g>
            <g>
                <path fillRule='evenodd' clipRule='evenodd' d='M22.5234 55.9841L13.493 65.0146L12.4947 64.0163L21.5252 54.9859L22.5234 55.9841Z' fill='#6C7996' />
                <path fillRule='evenodd' clipRule='evenodd' d='M3.47462 54.9854L12.5036 64.0145L11.5053 65.0128L2.47634 55.9836L3.47462 54.9854Z' fill='#6C7996' />
            </g>
        </svg>
    )
}