import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import Icon from '../../../../../Icon'
import Counter from '../../Counter/Counter'
import { globalState } from '../../../../../helpers/globalState'
import NotifyButton from '../../NotifyButton/NotifyButton'

export default function CardCompactButton({ count, info, onUpdateInBasket }) {
    const [isOpen, setIsOpen] = useState(false)

    const buyHandler = () => {
        setIsOpen(true)
        onUpdateInBasket({ value: 1, isMin: false, isMax: false })
        globalState.popover.open([info.primaryName, 'ТЕПЕРЬ В КОРЗИНЕ'], info.images[0], true)
    }

    const profiClickHandler = () => {
        globalState.modal.open('profi', false)
    }

    if (!info.max) {
        return (
            <div className={style.buttonContainer}>
                <NotifyButton name={info.primaryName} external={style.notify} image={info.images[0]} />
            </div>
        )
    }

    if (info.isProfi) {
        return (
            <div className={style.buttonContainer}>
                <div theme='tetriary' d-size='sm' onClick={profiClickHandler} className={`button ${style.profiBtn}`}>
                    <Icon name='rabbit' width='18' height='18' />
                </div>
            </div>
        )
    }

    return (
        <div data-open={isOpen} data-active={!!count} className={style.buttonContainer}>
            <div data-active={!!count} onClick={buyHandler} className={`${style.button}`}>
                <Icon name='basket' width='18' height='18' />
                <div className={`${style.buttonCount} text--t6 text--bold`}>
                    {count}
                </div>
            </div>
            <div className={`${style.counter}`}>
                <Counter info={info} onAfterChange={onUpdateInBasket} max={info.max} count={count} />
            </div>
        </div>
    )
}