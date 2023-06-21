import { debounce } from '../helpers/debounce'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import style from '../../styles/module/Product/Card.module.scss'

import Icon from '../Icon'
import Image from 'next/image'
import CardBuy from './CardBuy'
import { globalState } from '../helpers/globalState'
import Favourite from '../usefull/Favourite'
import Link from 'next/link'

export default function Card({ info, updated, isInline, countInBasket = 0 }) {
    const [isSelected, setIsSelected] = useState(false)
    const [activeImage, setActiveImage] = useState(0)
    const [isNotify, setIsNotify] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const [count, setCount] = useState(countInBasket)
    const animateDrag = useAnimationControls()
    const refCardWrapper = useRef(null)
    const refIsSelected = useRef(false)
    const refImages = useRef(null)
    const refRect = useRef(false)

    const infoFavourite = {
        primary: info.secondaryName,
        image: info.images[0],
    }

    const resizeHandler = () => {
        refRect.current = refImages.current.getBoundingClientRect()
    }

    const debounceResize = debounce(resizeHandler, 60)

    const mouseMoveHandler = event => {
        if (window.innerWidth < globalState.sizes.lg || isInline) return
        const c = event.clientX - refRect.current.x
        const t = refRect.current.width / info.images.length
        const r = Math.min(info.images.length - 1, Math.floor(c / t))
        setActiveImage(r)
    }

    const bodyMouseMoveHandler = event => {
        if (refIsSelected.current) return
        const target = event.target
        const parent = target.closest(`.${style.card}`)
        if (!parent || parent !== refCardWrapper.current) setIsHover(false)
        document.body.removeEventListener('mousemove', bodyMouseMoveHandler)
    }

    const mouseEnterHandler = () => {
        if (isInline) return
        setIsHover(true)
    }

    const mouseLeaveHandler = () => {
        if (isInline) return
        if (!isSelected) setIsHover(false)
        else {
            document.body.addEventListener('mousemove', bodyMouseMoveHandler)
        }
    }

    const dragEdHandler = (event, dragInfo) => {
        if (typeof window === 'undefined' || window.innerWidth > globalState.sizes.lg) return
        const offsetX = Math.abs(dragInfo.offset.x)
        const offsetY = Math.abs(dragInfo.offset.y)
        const imageWidth = refImages.current.clientWidth

        if (offsetX > 40 && offsetY < 40) {
            if (dragInfo.offset.x > 0 && activeImage === 0) {
                animateDrag.start({ x: 0, transition: { duration: 0.1 } })
                return
            }

            if (dragInfo.offset.x < 0 && activeImage === info.images.length - 1) {
                animateDrag.start({ x: -imageWidth * (info.images.length - 1), transition: { duration: 0.1 } })
                return
            }

            if (dragInfo.offset.x < 0) {
                setActiveImage(prev => {
                    prev++
                    animateDrag.start({ x: -imageWidth * prev, transition: { duration: 0.1 } })
                    return prev
                })
            } else {
                setActiveImage(prev => {
                    prev--
                    animateDrag.start({ x: -imageWidth * prev, transition: { duration: 0.1 } })
                    return prev
                })
            }
        } else {
            animateDrag.start({ x: -imageWidth * activeImage, transition: { duration: 0.1 } })
        }
    }

    useEffect(() => {
        refRect.current = refImages.current.getBoundingClientRect()
        if (!isInline) window.addEventListener('resize', debounceResize)

        return () => {
            window.removeEventListener('resize', debounceResize)
        }
    }, [])

    useEffect(() => {
        refIsSelected.current = isSelected
    }, [isSelected])

    useEffect(() => {
        setTimeout(() => {
            if (!refImages.current) return
            refRect.current = refImages.current.getBoundingClientRect()
        }, 400)
    }, updated)

    return (
        <div data-hover={isHover} ref={refCardWrapper} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} className={isInline ? style.cardInline : style.card}>

            <Link href='/product/rp-no-coloristic'>
                <a href='/product/rp-no-coloristic' ref={refImages} onMouseLeave={() => setActiveImage(0)} onMouseMove={mouseMoveHandler} className={style.images}>
                    <motion.div animate={animateDrag} drag='x' onDragEnd={dragEdHandler} >
                        {info.images.map((image, index) => (
                            <div key={image} data-active={activeImage === index} className={style.image}>
                                <Image layout='fill' alt={info.primaryName} src={image} />
                            </div>
                        ))}
                    </motion.div>
                    <div className={`${style.nav}`}>
                        {info.images.map((image, index) => (
                            <div key={image} data-active={activeImage === index} />
                        ))}
                    </div>
                </a>
            </Link>

            {isInline
                ? null
                : <>
                    <div className={`${style.favourite} is-hidden--lg-down`}>
                        <Favourite width='24' height='21' isActive={info.isFavourite} info={infoFavourite} />
                    </div>

                    <div className={`${style.favourite} is-hidden--xl-up`}>
                        <Favourite width='20' height='17' isActive={info.isFavourite} info={infoFavourite} />
                    </div>
                </>
            }

            <div className={`${style.title} text--t6 text--normal text--upper pb-0.6 pt-1.5`}>{info.primaryName}</div>
            <div className={`${style.text} text--t4 text--normal pb-1`}>{info.secondaryName}</div>

            {!info.isProfi && info.values[0].max !== 0
                ? <div className={`${style.priceContainer} text--t2 text--normal pb-0.8`}>
                    <span data-hidden={!count} className={`${style.basket} text--t5 text--normal text--color-primary`}>
                        <Icon name='basket' width='19' height='16' />
                        <span>{count} шт x</span>
                    </span>
                    <span className={style.price}>
                        <span>{info.values[0].price.actual} ₽</span>
                        {info.values[0].price.old
                            ? <span className={`${style.priceOld} text--t3 text--bold`}>{info.values[0].price.old} ₽</span> : null
                        }
                    </span>
                </div> : null
            }

            {info.values[0].art && isInline
                ? <div className={`${style.art} text--t6 text--normal text--color-small`}>{info.values[0].art}</div> : null
            }

            {info.values[0].bonuses && isInline
                ? <div className={`${style.bonuses} d-flex flex--justify-end text--t5 text--normal text--color-small`}>
                    <span>
                        {info.values[0].bonuses}
                    </span>
                    <span className='color--primary'>
                        <svg width='10' height='14' viewBox='0 0 10 14'>
                            <path fillRule='evenodd' clipRule='evenodd' d='M6.70059 7.3973L9.23541 11H7.51588L5.15894 7.53223H3.306V11H1.82365V7.54218L0.505289 7.54821L0.499512 6.36054L1.82365 6.35449V2H5.98906C7.87165 2 9.1613 3.10645 9.1613 4.76612C9.1613 6.38531 7.96059 7.24888 6.70059 7.3973ZM5.79635 6.34483C6.86365 6.34483 7.63447 5.71065 7.63447 4.76612C7.63447 3.82159 6.86365 3.18741 5.79635 3.18741H3.306V6.34483H5.79635Z' fill='#E21B25' />
                        </svg>
                    </span>
                </div> : null
            }

            {info.values[0].max === 0
                ? <div className={`${style.priceContainer} text--t2 text--normal pb-0.8`}>
                    <span className={`text--color-tetriary pr-0.5 is-hidden--lg-down ${isNotify ? '' : 'is-hidden'}`}>
                        <Icon name='bellFill' width='14' height='14' />
                    </span>
                    <span>Нет в наличии</span>
                </div> : null
            }
            <div className={`${style.colors} text--t6 text--upper text--normal`}>
                <div className={style.color} data-color='black' />
                <div className=''>Черный</div>
            </div>

            <div className={`${style.buyBtn} mt-2`}>
                <CardBuy
                    image={info.images[0]}
                    max={info.values[0].max}
                    name={info.secondaryName}
                    activeValue={info.values[0]}
                    isNotify={isNotify}
                    isProfi={info.isProfi}
                    isSelected={isSelected}
                    setInBasket={setCount}
                    setIsNotify={setIsNotify}
                    setIsSelected={setIsSelected}
                    countInBasket={countInBasket}
                />
            </div>
        </div>
    )
}
