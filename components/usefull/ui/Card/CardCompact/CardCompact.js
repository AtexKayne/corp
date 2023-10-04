import React, { useState, useEffect, useRef } from 'react'
import style from '../style.module.scss'
// import { isEqual } from '../../../helpers/isEqual'
import CardCompactImages from './CardCompactImages/CardCompactImages'
import CardCompactDescription from './CardCompactDescription/CardCompactDescription'
import CardCompactPrice from './CardCompactPrice/CardCompactPrice'
import CardControls from './CardControls/CardControls'
import { useAnimationControls } from 'framer-motion'
import { globalState } from '../../../../helpers/globalState'

export default function CardCompact({ info, mode, animate, onChangeCount = () => { } }) {
    // @TODO Постарайся от этого избавиться
    const [count, setCount] = useState(info.basket ?? 0)
    const [isHover, setIsHover] = useState(false)
    const [isControlOpen, setIsControlOpen] = useState(false)

    const refInner = useRef(null)
    const refTimeout = useRef(null)
    const refIsFocus = useRef(false)
    const refAnimated = useRef(false)

    const showEnter = async () => {
        const isMobile = window.innerWidth <= globalState.sizes.lg

        if (!count) {
            await animate.button.start({ background: '#E21B25', color: '#FFFFFF', transition: { duration: 0 } })
            return animate.button.start({ opacity: 1, transition: { duration: 0.2 } })
        }

        if (!!count) {
            if (isMobile) {
                animate.inner.start({ x: -92, transition: { duration: 0.2 } })
            }

            await animate.counter.start({
                background: '#F5F6FA',
                opacity: 1,
                pointerEvents: 'all',
                transition: { duration: 0 }
            })

            await animate.button.start({ opacity: 0, transition: { duration: 0.1 } })

            await animate.counter.start({
                width: 160,
                transition: { duration: 0.2 }
            })

            return animate.module.start({ opacity: 1, transition: { duration: 0.1 } })
        }
    }

    const showLeave = async () => {
        const isMobile = window.innerWidth <= globalState.sizes.lg
        if (!count) {
            const opacity = isMobile ? 1 : 0
            await animate.button.start({ opacity, transition: { duration: 0.2 } })
        }

        if (!!count || isMobile) {
            if (isMobile) animate.inner.start({ x: 0, transition: { duration: 0.2 } })

            await animate.module.start({ opacity: 0, transition: { duration: 0.1 } })

            await animate.counter.start({
                width: 68,
                transition: { duration: 0.2 }
            })

            animate.counter.start({
                pointerEvents: 'none',
                opacity: 0,
                transition: { duration: 0.2 }
            })

            const params = isMobile && !count
                ? { background: '#E21B25', color: '#FFFFFF' }
                : { background: '#F5F6FA', color: '#E21B25' }

            await animate.button.start({ opacity: 1, ...params, transition: { duration: 0.1 } })
        }
    }

    const hide = async () => {
        const isMobile = window.innerWidth <= globalState.sizes.lg
        if (isMobile) {
            animate.inner.start({ x: 0, transition: { duration: 0.2 } })
        }
        await animate.module.start({ opacity: 0, transition: { duration: 0.1 } })


        await animate.counter.start({
            background: '#E21B25',
            width: 68,
            transition: { duration: 0.2 }
        })

        await animate.button.start({ opacity: 1, background: '#E21B25', color: '#FFFFFF', transition: { duration: 0 } })

        return animate.counter.start({
            pointerEvents: 'none',
            opacity: 0,
            transition: { duration: 0.2 }
        })
    }

    const open = async (prevValue) => {
        if (!!prevValue) return
        const isMobile = window.innerWidth <= globalState.sizes.lg

        await animate.counter.start({
            background: '#E21B25',
            pointerEvents: 'all',
            opacity: 1,
            transition: { duration: 0 }
        })

        if (isMobile) {
            animate.inner.start({ x: -92, transition: { duration: 0.2 } })
        }

        await animate.button.start({ opacity: 0, transition: { duration: 0.1 } })


        await animate.counter.start({
            background: '#F5F6FA',
            width: 160,
            transition: { duration: 0.2 }
        })

        return animate.module.start({ opacity: 1, transition: { duration: 0.1 } })
    }

    const focusHandler = () => {
        setIsHover(true)
        refIsFocus.current = true
        if (refTimeout.current) clearTimeout(refTimeout.current)
    }

    const blurHandler = () => {
        refIsFocus.current = false

        if (refTimeout.current) clearTimeout(refTimeout.current)
        refTimeout.current = setTimeout(() => {
            setIsHover(false)
        }, 500)
    }

    const updateHandler = async ({ value, isMax, isMin }) => {
        const prevValue = count
        onChangeCount(value, false, info)
        setCount(value)

        const isMobile = window.innerWidth <= globalState.sizes.lg

        if (isMobile) {
            setIsControlOpen(false)

            if (value === 0) {
                setIsHover(false)
                if (refTimeout.current) clearTimeout(refTimeout.current)
            } else {
                setIsHover(true)
                if (refTimeout.current) clearTimeout(refTimeout.current)
                refTimeout.current = setTimeout(() => {
                    setIsHover(false)
                }, 4000)
            }
        } else {
            if (value === 0) refAnimated.current = hide()
            else refAnimated.current = open(prevValue)
        }

        if (isMax) {
            globalState.popover.open([info.secondaryName, 'Максимум для этого заказа'], info.images[0])
        }

        if (isMin) {
            globalState.popover.open([info.secondaryName, 'БОЛЬШЕ НЕ В КОРЗИНЕ'], info.images[0])
        }
    }

    const mouseEnterHandler = async () => {
        if (window.innerWidth <= globalState.sizes.lg) return
        setIsHover(true)
    }

    const mouseLeaveHandler = async () => {
        if (refIsFocus.current) return
        if (window.innerWidth <= globalState.sizes.lg) return

        setIsHover(false)
    }

    const setStartedValue = () => {
        if (!globalState.basket.count) return
        // const basketStorage = globalState.basket.items
        // const newInfo = {...info}
        // let isExist = false
        // info.values.forEach((item, index) => {
        //     const element = { ...info }
        //     element.values = [item]
        //     isExist = isEqual(basketStorage, element)
        //     if (isExist !== false) {
        //         newInfo.values[index].basket = isExist.count
        //     }
        // })
        // // console.log(isExist);
        // // if (isExist) {
        // // }
        // setCountInBasket(newInfo.values[0].basket)
        // setActiveValue(newInfo.values[0])
        // setValues(newInfo.values)
    }

    useEffect(() => {
        if (isHover) {
            refAnimated.current = showEnter()
        } else {
            if (refAnimated.current) refAnimated.current.then(showLeave)
            else showLeave()
        }
    }, [isHover])

    useEffect(() => {
        const input = refInner.current.querySelector('input')
        if (input) {
            input.addEventListener('blur', blurHandler)
            input.addEventListener('focus', focusHandler)
        }

        setStartedValue()

        return () => {
            if (input) {
                input.removeEventListener('blur', blurHandler)
                input.removeEventListener('focus', focusHandler)
            }
        }
    }, [])

    return (
        <div
            data-mode={mode}
            data-hover={isHover}
            data-current={!!count}
            data-open={isControlOpen}
            className={style.cardCompact}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            style={{ '--offset-controls': count ? '-132px' : '-62px' }}>
            <CardControls
                info={info}
                animate={animate}
                setIsHover={setIsHover}
                isControlOpen={isControlOpen}
                onUpdateInBasket={updateHandler}
                setIsControlOpen={setIsControlOpen}
            />
            <div ref={refInner} className={style.cardInner}>
                <CardCompactImages animate={animate} images={info.images} count={count} info={info} isFavourite={false} />
                <CardCompactDescription animate={animate} info={info} />
                <CardCompactPrice
                    info={info}
                    count={count}
                    animate={animate}
                    onUpdateInBasket={updateHandler}
                />
            </div>
        </div>
    )
}