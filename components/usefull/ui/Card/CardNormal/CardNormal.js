import { useState, useEffect } from 'react'
import style from '../style.module.scss'
import CardImages from './CardImages/CardImages'
import CardValues from './CardValues/CardValues'
import CardPrice from './CardPrice/CardPrice'
import CardBuy from './CardBuy/CardBuy'
import { globalState } from '../../../../helpers/globalState'
// import { isEqual } from '../../../helpers/isEqual'
import CardDescrption from './CardDescrption/CardDescrption'

export default function CardNormal({ info, mode, onChangeCount = () => { } }) {
    // @TODO Постарайся от этого избавиться
    const [count, setCount] = useState(info.basket ?? 0)
    const [isHover, setIsHover] = useState(false)
    const mouseEnterHandler = () => setIsHover(true)
    const mouseLeaveHandler = () => setIsHover(true)

    const updateHandler = ({ value, isMax, isMin }) => {
        // setCount(val)
        onChangeCount(value, false, info)
        if (value === 0) setTimeout(() => setCount(value), 300)
        else setCount(value)

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
    }, [])

    return (
        <div
            data-mode={mode}
            data-hover={isHover}
            className={mode === 'normal' ? style.card : style.cardInline}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}>
            <CardImages count={count} images={info.images} link='/product/rp-no-coloristic' mode={mode} />
            <CardDescrption info={info} mode={mode} classTitle={style.title} classText={style.text} />
            <CardPrice info={info} mode={mode} count={count} />
            <CardValues info={info} mode={mode} />

            <div className={`${style.buyBtn}`}>
                <CardBuy info={info} count={count} onUpdateInBasket={updateHandler} />
            </div>
        </div>
    )
}