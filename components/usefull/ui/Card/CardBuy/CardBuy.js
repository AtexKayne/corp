import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../../../helpers/globalState'
import style from './style.module.scss'
import Counter from '../Counter/Counter'
import NotifyButton from '../NotifyButton/NotifyButton'
import ProfiButton from '../ProfiButton/ProfiButton'


export default function CardBuy({ info, onUpdateInBasket, count }) {
    const [isEmpty, setIsEmpty] = useState(false)
    const [isOpen, setIsOpen] = useState(!!count)

    const buyHandler = () => {
        setIsOpen(true)
        onUpdateInBasket({value: 1, isMin: false, isMax: false})
        globalState.popover.open([info.primaryName, 'ТЕПЕРЬ В КОРЗИНЕ'], info.images[0], true)
    }

    useEffect(() => {
        if (count <= 0) {
            setIsOpen(false)
        }
    }, [count])

    useEffect(() => {
        setIsEmpty(info.max === 0)
    }, [])

    return (
        <div className={style.cardBuybtn}>
            {!info.isProfi && !isEmpty
                ? <div className={style.btnWrapper}>
                    <div onClick={buyHandler} data-open={isOpen} className={`${style.btnMain} btn btn--md btn--primary js-button`}>
                        <span className='text--upper text--p5 text--bold'>в корзину</span>
                    </div>

                    <div data-open={isOpen} className={style.buyOpen}>
                        <Counter info={info} max={info.max} onAfterChange={onUpdateInBasket} count={count} />
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