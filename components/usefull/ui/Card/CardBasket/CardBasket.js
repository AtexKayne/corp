import style from '../style.module.scss'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../../../helpers/globalState'
import CardBasketImages from './CardBasketImage/CardBasketImage'
import CardBasketDescription from './CardBasketDescription/CardBasketDescription'
import CardBasketPrice from './CardBasketPrice/CardBasketPrice'

export default function CardBasket({ info, animate, onChangeCount }) {
    // @TODO Постарайся от этого избавиться
    const [count, setCount] = useState(info.basket ?? 0)
    const [isHover, setIsHover] = useState(true)

    const refInner = useRef(null)
    const refTimeout = useRef(null)
    const refIsFocus = useRef(false)
    const refAnimated = useRef(false)

    const updateHandler = async ({ value, isMax, isMin }) => {
        const prevValue = count
        onChangeCount(value, false, info)
        setCount(value)

        const isMobile = window.innerWidth <= globalState.sizes.lg

        if (isMobile) {
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

    useEffect(() => {
        showEnter()
        const input = refInner.current.querySelector('input')
        if (input) {
            input.addEventListener('blur', blurHandler)
            input.addEventListener('focus', focusHandler)
        }

        return () => {
            if (input) {
                input.removeEventListener('blur', blurHandler)
                input.removeEventListener('focus', focusHandler)
            }
        }
    }, [])

    return (
        <div
            ref={refInner}
            data-hover={isHover}
            className={style.cardBasket}>

            <CardBasketImages link={info.link ?? '/'} image={info.images[0]} count={count} />
            <CardBasketDescription info={info} link={info.link ?? '/'} />
            <CardBasketPrice animate={animate} info={info} count={count} onUpdateInBasket={updateHandler} />
        </div>
    )
}