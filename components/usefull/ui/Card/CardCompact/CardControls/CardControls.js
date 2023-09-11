import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import Icon from '../../../../../Icon'
import Favourite from '../../../../Favourite'

export default function CardControls({ onUpdateInBasket, info, setIsControlOpen, isControlOpen }) {
    const infoUpdated = {
        primary: info.primaryName,
        image: info.images[0]
    }

    const closeControls = event => {
        const target = event.target
        console.log(event, target.closest(`.${style.params}`));
        if (target.closest(`.${style.params}`)) return
        setIsControlOpen(false)
        document.body.removeEventListener('click', closeControls)
    }

    const removeHandler = () => {
        onUpdateInBasket(0)
        setIsControlOpen(false)
    }

    const toggleControlsHandler = () => {
        if (!isControlOpen) {
            setTimeout(() => {
                document.body.addEventListener('click', closeControls)
            }, 100);
        }
        setIsControlOpen(prev => !prev)
    }

    return (
        <div className={style.controls}>
            <div onClick={toggleControlsHandler} data-open={isControlOpen} className={`is-extended ${style.settings}`}>
                <Icon name='close' width='16' height='16' />
                <Icon name='settings' width='16' height='16' />
            </div>

            <div className={`${style.params}`}>
                <div className={`${style.favourite}`}>
                    <Favourite external={style.favouriteInner} width='15' height='15' info={infoUpdated} />
                </div>
                <div onClick={removeHandler} className={`${style.basket}`}>
                    <Icon name='remove' width='16' height='16' />
                </div>
            </div>
        </div>
    )
}