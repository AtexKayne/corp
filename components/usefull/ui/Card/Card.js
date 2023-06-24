import { useState } from 'react'
import style from './style.module.scss'
import CardImages from './CardImages/CardImages'
import CardValues from './CardValues/CardValues'
import CardPrice from './CardPrice/CardPrice'
import CardBuy from './CardBuy/CardBuy'


export default function Card({ info, mode = 'normal', onChangeCount = () => {} }) {
    // @TODO Постарайся от этого избавиться
    const [countInBasket, setCountInBasket] = useState(info.values[0].basket)
    const [activeValue, setActiveValue] = useState(info.values[0])
    const [values, setValues] = useState(info.values)
    const [isHover, setIsHover] = useState(false)

    const mouseEnterHandler = () => setIsHover(true)
    const mouseLeaveHandler = () => setIsHover(false)

    const changeValueHandler = value => {
        setCountInBasket(value.basket)
        setActiveValue(value)
    }

    const updateInBasket = val => {
        setValues(prev => {
            const update = [...prev]
            const index = update.findIndex(element => element.value === activeValue.value)
            update[index].basket = val
            setCountInBasket(val)
            onChangeCount(val, activeValue, info)
            return update
        })
    }

    return (
        <div
            data-mode={mode}
            data-hover={isHover}
            className={mode === 'normal' ? style.card : style.cardInline}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}>
            <CardImages images={info.images} link='/product/rp-no-coloristic' mode={mode} />

            <div className={`${style.title} text--t6 text--normal text--upper pb-0.6 pt-1.5`}>{info.primaryName}</div>
            <div className={`${style.text} text--t4 text--normal pb-1`}>{info.secondaryName}</div>

            <CardPrice value={activeValue} mode={mode} isProfi={info.isProfi} countInBasket={countInBasket} />
            <CardValues values={values} valuePicker={info.valuePicker} onAfterChange={changeValueHandler} />

            <div className={`${style.buyBtn} mt-2`}>
                <CardBuy
                    info={info}
                    value={activeValue}
                    isProfi={info.isProfi}
                    countInBasket={countInBasket}
                    updateInBasket={updateInBasket}
                />
            </div>
        </div>
    )
}