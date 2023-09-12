import React, { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import { globalState } from '../../../helpers/globalState'
import { isEqual } from '../../../helpers/isEqual'
import CardCompactImages from './CardCompact/CardCompactImages/CardCompactImages'
import CardCompactDescription from './CardCompact/CardCompactDescription/CardCompactDescription'
import CardCompactPrice from './CardCompact/CardCompactPrice/CardCompactPrice'
import CardControls from './CardCompact/CardControls/CardControls'

export default function CardCompact({ info, mode, onChangeCount = () => { } }) {
    // @TODO Постарайся от этого избавиться
    const [count, setCount] = useState(info.basket ?? 0)
    const [isHover, setIsHover] = useState(false)
    const [isOffseted, setIsOffseted] = useState(false)
    const [isControlOpen, setIsControlOpen] = useState(false)
    const refInner = useRef(null)
    const refTimeout = useRef(null)

    const mouseEnterHandler = () => {
        // if (window.innerWidth <= globalState.sizes.lg) return
        setIsHover(true)
    }

    const mouseLeaveHandler = () => {
        // if (window.innerWidth <= globalState.sizes.lg) return
        setIsHover(false)
    }

    const focusHandler = () => {
        console.log(234);
        if (refTimeout.current) clearTimeout(refTimeout.current)
    }

    const blurHandler = () => {
        if (refTimeout.current) clearTimeout(refTimeout.current)
        refTimeout.current = setTimeout(() => {
            setIsHover(false)
            setIsOffseted(false)
        }, 4000)
    }

    const updateHandler = ({ value, isMax, isMin }) => {
        // setCount(val)
        onChangeCount(value, false, info)

        if (value === 0) {
            setTimeout(() => setCount(value), 300)
            if (window.innerWidth <= globalState.sizes.lg) {
                setIsHover(false)
                setIsOffseted(false)
                if (refTimeout.current) clearTimeout(refTimeout.current)
            }
        } else {
            setCount(value)
            if (window.innerWidth <= globalState.sizes.lg) {
                setIsHover(true)
                setIsOffseted(true)
                if (refTimeout.current) clearTimeout(refTimeout.current)
                refTimeout.current = setTimeout(() => {
                    setIsHover(false)
                    setIsOffseted(false)
                }, 4000)
            }
        }

        if (isMax) {
            globalState.popover.open([info.primaryName, 'Максимум для этого заказа'], info.images[0])
        }
        if (isMin) {
            globalState.popover.open([info.primaryName, 'БОЛЬШЕ НЕ В КОРЗИНЕ'], info.images[0])
        }

        // setValues(prev => {
        //     const update = [...prev]
        //     const index = update.findIndex(element => element.value === activeValue.value)
        //     update[index].basket = val
        //     globalState.basket.update({ val, activeValue, info })
        //     return update
        // })
    }

    useEffect(() => {
        const input = refInner.current.querySelector('input')
        if (input) {
            input.addEventListener('blur', blurHandler)
            input.addEventListener('focus', focusHandler)
        }

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
            <CardControls setIsControlOpen={setIsControlOpen} isControlOpen={isControlOpen} onUpdateInBasket={updateHandler} info={info} />
            <div ref={refInner} data-offset={isOffseted} className={style.cardInner}>
                <CardCompactImages images={info.images} count={count} info={info} isFavourite={false} />
                <CardCompactDescription info={info} />
                <CardCompactPrice info={info} count={count} onUpdateInBasket={updateHandler} />
            </div>
        </div>
    )
}