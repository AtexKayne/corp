// import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'
import style from '../../../styles/module/usefull/templates/Modal-auth-profi.module.scss'

import Image from 'next/image'
import Icon from '../../Icon'

export default function ModalAuthProfi() {
    const clickHandler = () => {
        globalState.modal.close()
        setTimeout(() => {
            globalState.popover.setTextPrimary('Вы вошли как профпокупатель')
            globalState.popover.setTextSecondary('Цены пересчитаны до оптовых')
            globalState.popover.setImage(false)
            globalState.popover.setIsBasket(false)
            globalState.popover.setIsOpen(true)
        }, 700)
    }

    return (
        <div className={`${style.authWrapper} full-height`}>
            <div className={style.image}>
                <Image src='/images/usefull/templates/machina.png' layout='fill' alt='profi icon' />
            </div>
            <div className='text--a2 text--center text--bold py-1.5'>Вы — профи!</div>
            <Icon name='starM' width='15' height='15' />
            <div className='text--p4 text--center py-1.5'>
                Это значит, что вы имеете доступ к полному каталогу профессионального ассортимента и можете покупать все товары по оптовым ценам.
            </div>
            <div className='text--p4 text--center'>
                Спасибо, что вы с нами!
            </div>
            <div className={style.footer}>
                <div onClick={clickHandler} className={`${style.button} btn btn--md btn--fill btn--primary`}>
                    <span className='text--upper text--p5 text--bold'>вперед к покупкам</span>
                </div>
            </div>
        </div>
    )
}
