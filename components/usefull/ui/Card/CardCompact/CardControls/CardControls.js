import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import Icon from '../../../../../Icon'
import Favourite from '../../../../Favourite'
import { globalState } from '../../../../../helpers/globalState'

export default function CardControls({ onUpdateInBasket, info, setIsControlOpen, setIsHover, isControlOpen, animate }) {
    const infoUpdated = {
        primary: info.secondaryName,
        image: info.images[0]
    }

    const closeControls = event => {
        if (event.type === 'click' || event.type === 'touch') {
            const target = event.target
            if (target.closest(`.${style.params}`)) return
        }
        setIsControlOpen(false)
        window.removeEventListener('scroll', closeControls)
        if (window.innerWidth <= globalState.sizes.lg) {
            document.body.removeEventListener('touch', closeControls)
        } else {
            document.body.removeEventListener('click', closeControls)
        }
    }

    const removeHandler = () => {
        onUpdateInBasket({ value: 0, isMax: false, isMin: true })
        setIsControlOpen(false)
        animate.button.start({ background: '#E21B25', color: '#FFFFFF' })
        setTimeout(() => {
            window.removeEventListener('scroll', closeControls)
            if (window.innerWidth <= globalState.sizes.lg) {
                document.body.removeEventListener('touch', closeControls)
            } else {
                document.body.removeEventListener('click', closeControls)
            }
        }, 210)
    }

    const toggleControlsHandler = () => {
        setIsHover(false)

        setIsControlOpen(prev => {
            if (!prev) {
                setTimeout(() => {
                    window.addEventListener('scroll', closeControls)
                    if (window.innerWidth <= globalState.sizes.lg) {
                        document.body.addEventListener('touch', closeControls)
                    } else {
                        document.body.addEventListener('click', closeControls)
                    }

                }, 200)
            } else {
                window.removeEventListener('scroll', closeControls)
                if (window.innerWidth <= globalState.sizes.lg) {
                    document.body.removeEventListener('touch', closeControls)
                } else {
                    document.body.removeEventListener('click', closeControls)
                }
            }
            return !prev
        })
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