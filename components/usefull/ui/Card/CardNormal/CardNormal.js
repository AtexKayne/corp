import { useState, useEffect, useRef } from 'react'
import style from '../style.module.scss'
import CardImages from './CardImages/CardImages'
import CardValues from './CardValues/CardValues'
import CardPrice from './CardPrice/CardPrice'
import { globalState } from '../../../../helpers/globalState'
// import { isEqual } from '../../../helpers/isEqual'
import CardDescrption from './CardDescrption/CardDescrption'
import CardBuyButton from '../Univ/BuyButton/CardBuyButton'
import Favourite from '../../../Favourite'

export default function CardNormal({ info, animate, onChangeCount }) {
    // @TODO Постарайся от этого избавиться
    const [count, setCount] = useState(info.basket ?? 0)
    const [isHover, setIsHover] = useState(false)

    const refInner = useRef(null)
    const refTimeout = useRef(null)
    const refIsFocus = useRef(false)
    const refIsHover = useRef(false)
    const refAnimated = useRef(false)


    const mouseEnterHandler = async () => {
        if (window.innerWidth <= globalState.sizes.md) return
        refIsHover.current = true
        setIsHover(true)
    }

    const mouseLeaveHandler = async () => {
        refIsHover.current = false
        if (refIsFocus.current) return
        if (window.innerWidth <= globalState.sizes.md) return
        setIsHover(false)
    }

    const updateHandler = async ({ value, isMax, isMin }) => {
        const prevValue = count
        onChangeCount(value, false, info)
        setCount(value)

        const isMobile = window.innerWidth <= globalState.sizes.md

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

        // if (isMax) {
        //     globalState.popover.open([info.secondaryName, 'Максимум для этого заказа'], info.images[0])
        // }

        if (isMin) {
            globalState.popover.open([info.secondaryName, 'БОЛЬШЕ НЕ В КОРЗИНЕ'], info.images[0])
        }
    }

    const hide = async () => {
        const isMobile = window.innerWidth <= globalState.sizes.md
        if (isMobile) {
            animate.inner.start({ x: 0, transition: { duration: 0.2 } })
        }
        await animate.module.start({ opacity: 0, transition: { duration: 0.1 } })

        const width = window.innerWidth > globalState.sizes.xxxl ? 92 : 68
        await animate.counter.start({
            width,
            background: '#E21B25',
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
        const isMobile = window.innerWidth <= globalState.sizes.md

        await animate.counter.start({
            opacity: 1,
            pointerEvents: 'all',
            background: '#E21B25',
            transition: { duration: 0 }
        })

        if (isMobile) {
            animate.inner.start({ x: -92, transition: { duration: 0.2 } })
        }

        await animate.button.start({ opacity: 0, transition: { duration: 0.1 } })

        const width = window.innerWidth > globalState.sizes.xxxl ? 160 : '100%'
        await animate.counter.start({
            width,
            background: '#F5F6FA',
            transition: { duration: 0.2 }
        })

        return animate.module.start({ opacity: 1, transition: { duration: 0.1 } })
    }

    const showEnter = async () => {
        const isMobile = window.innerWidth <= globalState.sizes.md

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

            const width = window.innerWidth > globalState.sizes.xxxl ? 160 : '100%'
            await animate.counter.start({
                width,
                transition: { duration: 0.2 }
            })

            return animate.module.start({ opacity: 1, transition: { duration: 0.1 } })
        }
    }

    const showLeave = async () => {
        const isMobile = window.innerWidth <= globalState.sizes.md
        if (!count) {
            const opacity = isMobile ? 1 : 0
            await animate.button.start({ opacity, transition: { duration: 0.2 } })
        }

        if (!!count || isMobile) {
            if (isMobile) animate.inner.start({ x: 0, transition: { duration: 0.2 } })

            await animate.module.start({ opacity: 0, transition: { duration: 0.1 } })

            const width = window.innerWidth > globalState.sizes.xxxl ? 92 : 68
            await animate.counter.start({
                width,
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
            if (!refIsHover.current) setIsHover(false)
        }, 500)
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
            data-hover={isHover}
            className={style.card}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}>
            <Favourite width='24' height='24' external={style.favourites} info={{ primary: info.secondaryName, image: info.images[0] }} />
            <CardImages isDelivery={info.isDelivery} images={info.images} link='/product/rp-no-coloristic' />
            <CardDescrption info={info} classTitle={style.title} classText={style.text} />
            <CardValues info={info} />

            <div className={`${style.cardFooter}`}>
                <CardPrice info={info} />

                <div ref={refInner} data-mode='normal' className={`${style.buyBtn}`}>
                    <CardBuyButton animate={animate} info={info} count={count} outline={false} onUpdateInBasket={updateHandler} />
                </div>
            </div>
        </div>
    )
}