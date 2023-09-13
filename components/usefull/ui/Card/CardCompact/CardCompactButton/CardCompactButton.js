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
        window.focus()
        if (!count) {
            onUpdateInBasket({ value: 1, isMin: false, isMax: false })
            globalState.popover.open([info.secondaryName, 'ТЕПЕРЬ В КОРЗИНЕ'], info.images[0], true)
        } else {
            onUpdateInBasket({ value: count, isMin: false, isMax: false })
        }
    }

    const profiClickHandler = () => {
        globalState.modal.open('profi', false)
    }

    if (!info.max) {
        return (
            <div className={style.buttonNotifyContainer}>
                <NotifyButton name={info.secondaryName} external={style.notify} image={info.images[0]} />
            </div>
        )
    }

    if (info.isProfi) {
        return (
            <div className={style.buttonProfiContainer}>
                <div d-size='sm' onClick={profiClickHandler} className={`button ${style.profiBtn}`}>
                    <Icon name='rabbit' width='18' height='18' />
                </div>
            </div>
        )
    }

    return (
        <div data-open={isOpen} data-active={!!count} className={style.buttonContainer}>
            <div data-active={!!count} onClick={buyHandler} className={`${style.button}`}>
                <Icon name='basket' width='20' height='18' />
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