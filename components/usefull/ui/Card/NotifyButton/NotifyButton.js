import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../../../helpers/globalState'
import style from './style.module.scss'
import Icon from '../../../../Icon'

export default function NotifyButton({ name, image, external = '' }) {
    const [isRinged, setIsRinged] = useState(false)
    const [isNotify, setIsNotify] = useState(false)

    const notificationClickHandler = () => {
        if (globalState.auth.isAuth) {
            const text = isNotify ? 'Уведомление отключено' : 'Сообщим о поступлении письмом'
            if (!isNotify) {
                setIsRinged(true)
                setTimeout(() => setIsRinged(false), 1100)
            }
            setIsNotify(!isNotify)
            globalState.popover.open([name, text], image)
        } else {
            const data = { type: 'notification', name, image, setIsRinged, setIsNotify }
            globalState.modal.open('auth', true, data)
        }
    }

    return (
        <div
            fill='true'
            theme='secondary'
            d-size='md-adaptive'
            data-active={isNotify}
            data-shaked={isRinged}
            onClick={notificationClickHandler}
            className={`${style.notify} ${external} button`}>

            <span className='text--upper text--p5 text--bold mr-0.8'>{isNotify ? 'сообщим' : 'сообщить'}</span>
            <span className='is-visible--xxs text--upper text--sparse text--t6 text--bold'>Сообщить</span>
            <span className={`${style.iconBell} is-hidden--xxs`}>
                <Icon name='bell' width='16' height='16' />
                <Icon name='bellFill' width='16' height='16' />
            </span>

        </div>
    )

    return (
        <div data-active={isNotify} data-shaked={isRinged} onClick={notificationClickHandler} className={`${style.notify} btn btn--md btn--yellow`}>
            <span className='text--upper text--p5 text--bold mr-0.8'>{isNotify ? 'сообщим' : 'сообщить'}</span>
            <span className={style.iconBell}>
                <Icon name='bell' width='16' height='16' />
                <Icon name='bellFill' width='16' height='16' />
            </span>
        </div>
    )
}