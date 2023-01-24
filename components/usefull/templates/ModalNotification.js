// import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import InputMask from 'react-input-mask'
import style from '../../../styles/module/usefull/templates/Modal-notification.module.scss'
// import Link from 'next/link'

export default function ModalNotification() {

    return (
        <div className={`${style.notification} full-height`}>
            <div className={style.image}>
                <Image src='/images/layout/logo-xs.svg' width='117' height='117' alt='RedHair market' />
            </div>
            <div className={`${style.title} text--h4 text--bold pb-2`}>
                <span>Мы вас оповестим!</span>
            </div>
            <div className='text--p4 pb-0.8'>
                Авторизуйтесь, чтобы мы могли вам сообщить о поступлении этого товара.
            </div>
            <div className='text--p4 pb-1'>
                На указанный номер телефона мы вышлем SMS с кодом подтверждения.
            </div>
            <div className='text--p4 pb-3'>
                <span>Есть вопросы?&nbsp;</span>
                <a className='link text--bold text--upper text--p6 text--color-primary' href='#'>Напишите в Telegram</a>
            </div>
            <InputMask className={style.phoneInput} type='tel' placeholder='+7 (___) ___ __ __' mask="+7 (999) 999 99 99" maskChar=" " />
            <div className={`${style.btn} btn btn--md btn--fill btn--grey`}>
                <span className='text--upper text--p6 text--color-disabled text--bold'>У меня есть инвайт-код</span>
            </div>
            <div className={`${style.footer} text--p6 text--color-disabled pb-1.5:md`}>
                <span>
                    <a href='#' className='text--underline'>Соглашение об использовании Cookies</a>
                    &nbsp;и&nbsp;
                    <a href='#' className='text--underline'>Положение об обработке и защите персональных данных</a>
                </span>
            </div>
        </div>
    )
}