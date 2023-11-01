import { useState, useEffect, useRef } from 'react'
import style from '../style.module.scss'
import CardCreativeImages from './CardCreativeImages/CardCreativeImages'
import CardCreativeValues from './CardCreativeValues/CardCreativeValues'
import CardCreativePrice from './CardCreativePrice/CardCreativePrice'
import { globalState } from '../../../../helpers/globalState'
// import { isEqual } from '../../../helpers/isEqual'
import CardCreativeDescrption from './CardCreativeDescrption/CardCreativeDescrption'
import CardBuyButton from '../Univ/BuyButton/CardBuyButton'
import Favourite from '../../../Favourite'

export default function CardCreative({ info, animate, onChangeCount, index, nth }) {
    // @TODO Постарайся от этого избавиться
    const [count, setCount] = useState(info.basket ?? 0)
    const [isHover, setIsHover] = useState(false)
    const [isGiant, setIsGiant] = useState(false)

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
        // return
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
            animate.inner.start({ x: 0, transition: { duration: 0.1 } })
        }
        await animate.module.start({ opacity: 0, transition: { duration: 0.1 } })

        // const width = window.innerWidth > globalState.sizes.xxxl ? 92 : 68
        await animate.counter.start({
            width: 68,
            background: '#E21B25',
            transition: { duration: 0.1 }
        })

        await animate.button.start({ opacity: 1, background: '#E21B25', color: '#FFFFFF', transition: { duration: 0 } })

        return animate.counter.start({
            pointerEvents: 'none',
            opacity: 0,
            transition: { duration: 0.1 }
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
            animate.inner.start({ x: -92, transition: { duration: 0.1 } })
        }

        await animate.button.start({ opacity: 0, transition: { duration: 0.1 } })
        const width = refInner.current.clientWidth > 260 || isGiant ? 160 : '100%'
        await animate.counter.start({
            width,
            background: '#F5F6FA',
            transition: { duration: 0.1 }
        })

        return animate.module.start({ opacity: 1, transition: { duration: 0.1 } })
    }

    const showEnter = async () => {
        const isMobile = window.innerWidth <= globalState.sizes.md

        if (!count) {
            await animate.button.start({ background: '#E21B25', color: '#FFFFFF', transition: { duration: 0 } })
            return animate.button.start({ opacity: 1, transition: { duration: 0.1 } })
        }

        if (!!count) {
            if (isMobile) {
                animate.inner.start({ x: -92, transition: { duration: 0.1 } })
            }

            await animate.counter.start({
                background: '#F5F6FA',
                opacity: 1,
                pointerEvents: 'all',
                transition: { duration: 0 }
            })

            await animate.button.start({ opacity: 0, transition: { duration: 0.1 } })

            const width = refInner.current.clientWidth > 260 || isGiant ? 160 : '100%'
            await animate.counter.start({
                width,
                transition: { duration: 0.1 }
            })

            return animate.module.start({ opacity: 1, transition: { duration: 0.1 } })
        }
    }

    const showLeave = async () => {
        const isMobile = window.innerWidth <= globalState.sizes.lg
        if (!count) {
            const opacity = isMobile ? 1 : 0
            await animate.button.start({ opacity, transition: { duration: 0.1 } })
        }

        if (!!count || isMobile) {
            if (isMobile) animate.inner.start({ x: 0, transition: { duration: 0.1 } })

            await animate.module.start({ opacity: 0, transition: { duration: 0.1 } })

            // const width = window.innerWidth > globalState.sizes.xxxl ? 92 : 68
            await animate.counter.start({
                width: 68,
                transition: { duration: 0.1 }
            })

            animate.counter.start({
                pointerEvents: 'none',
                opacity: 0,
                transition: { duration: 0.1 }
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
        setIsGiant(nth.includes(index))
    }, [nth])

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
            data-giant={isGiant}
            data-hover={isHover}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className={style.cardCreative}>

            <Favourite width='24' height='24' external={style.favourites} info={{ primary: info.secondaryName, image: info.images[0] }} />
            <CardCreativeImages isDelivery={info.isDelivery} images={info.images} link='/product/rp-no-coloristic' />
            <div className={`${style.cardCreativeBody}`}>
                <CardCreativeDescrption info={info} classTitle={style.title} classText={style.text} link='/product/rp-no-coloristic' />
                <CardCreativeValues info={info} />

                <div className={`${style.cardFooter}`}>
                    <CardCreativePrice info={info} />

                    <div ref={refInner} data-mode='creative' className={`${style.buyBtn}`}>
                        <CardBuyButton animate={animate} info={info} count={count} outline={false} onUpdateInBasket={updateHandler} />
                    </div>
                </div>
            </div>
        </div>
    )
}