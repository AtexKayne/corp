import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../../../helpers/globalState'
import style from './style.module.scss'
import Counter from '../Counter/Counter'
import NotifyButton from '../NotifyButton/NotifyButton'
import ProfiButton from '../ProfiButton/ProfiButton'


export default function CardBuy({ value, info, updateInBasket, countInBasket = 0 }) {
    const [isEmpty, setIsEmpty] = useState(false)
    const [isOpen, setIsOpen] = useState(!!countInBasket)
    const [count, setCount] = useState(countInBasket)
    const [startValue, setStartValue] = useState(countInBasket)

    const buyHandler = () => {
        setIsOpen(true)
        setStartValue(1)
        updateInBasket(1)
        globalState.popover.open([info.primaryName, 'ТЕПЕРЬ В КОРЗИНЕ'], info.images[0], true)
    }

    useEffect(() => {
        if (count <= 0) {
            setIsOpen(false)
        }
    }, [count])

    useEffect(() => {
        setStartValue(value.basket ?? 0)
        setIsOpen(!!value.basket)
    }, [value])

    useEffect(() => {
        setIsEmpty(value.max === 0)
    }, [])

    const counterChangeHandler = ({ value, isMax, isMin }) => {
        setCount(value)
        if (isMax) {
            globalState.popover.open([info.primaryName, 'Максимум для этого заказа'], info.images[0])
        }
        if (isMin) {
            globalState.popover.open([info.primaryName, 'БОЛЬШЕ НЕ В КОРЗИНЕ'], info.images[0])
        }
        
        updateInBasket(value)
    }

    return (
        <div className={style.cardBuybtn}>
            {!info.isProfi && !isEmpty
                ? <div className={style.btnWrapper}>
                    <div onClick={buyHandler} data-open={isOpen} className={`${style.btnMain} btn btn--md btn--primary`}>
                        <span className='text--upper text--p5 text--bold'>в корзину</span>
                    </div>

                    <div data-open={isOpen} className={style.buyOpen}>
                        <Counter max={value.max} onAfterChange={counterChangeHandler} startValue={startValue} />
                    </div>
                </div> : null
            }

            {info.isProfi && !isEmpty
                ? <div className={style.btnWrapper}>
                    <ProfiButton />
                </div> : null
            }

            {isEmpty
                ? <div className={style.btnWrapper}>
                    <NotifyButton name={info.primaryName} image={info.images[0]} />
                </div> : null
            }
        </div>
    )
}