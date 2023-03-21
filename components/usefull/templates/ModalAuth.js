import Image from 'next/image'
import InputMask from 'react-input-mask'
import { useState, useEffect, useRef } from 'react'
import style from '../../../styles/module/usefull/templates/Modal-auth.module.scss'

export default function ModalAuth({ data }) {
    const [phone, setPhone] = useState('')
    const [isDisabled, setIsDisabled] = useState(true)
    const [step, setStep] = useState(1)
    const refInput = useRef(null)

    const getValueLength = () => {
        return refInput.current.value.trim().length
    }

    const changeHandler = () => {
        setPhone(refInput.current.value)
        setIsDisabled(getValueLength() !== 18)
    }

    const validateHandler = () => {
        if (getValueLength() === 18) {
            setStep(2)
        }
    }

    return (
        <div className={`${style.authWrapper} full-height`}>
            <div className={style.step}>
                <div className={style.image}>
                    <Image src='/images/layout/logo-xs.svg' width='117' height='117' alt='RedHair market' />
                </div>
                <div className={`${style.title} text--h4 text--bold pb-2`}>
                    <AuthModalTitle type={data.type} />
                </div>

                {data.type === 'notification'
                    ? <div className='text--p4 pb-0.8'>
                        Авторизуйтесь, чтобы мы могли вам сообщить о поступлении этого товара.
                    </div> : null
                }

                <div className='text--p4 pb-1'>
                    На указанный номер телефона мы вышлем SMS с кодом подтверждения.
                </div>
                <div className='text--p4 pb-3'>
                    <span>Есть вопросы?&nbsp;</span>
                    <a className='link text--bold text--upper text--p6 text--color-primary' href='#'>Напишите в Telegram</a>
                </div>

                <InputMask
                    type='tel'
                    maskChar=' '
                    ref={refInput}
                    className='input'
                    onChange={changeHandler}
                    mask='+7 (999) 999 99 99'
                    placeholder='+7 (___) ___ __ __' />

                <div data-disabled={isDisabled} onClick={validateHandler} className={`${style.btn} btn btn--md btn--fill ${isDisabled ? 'btn--grey' : 'btn--primary'}`}>
                    <span className={`text--upper text--p6 text--bold ${isDisabled ? 'text--color-disabled' : ''}`}>Получить код</span>
                </div>

                <div className={`${style.footer} text--p6 text--color-disabled pb-1.5:md`}>
                    <span>
                        <a href='#' className='text--underline'>Соглашение об использовании Cookies</a>
                        &nbsp;и&nbsp;
                        <a href='#' className='text--underline'>Положение об обработке и защите персональных данных</a>
                    </span>
                </div>
            </div>

            <StepTwo phone={phone} />
        </div>

    )
}

function StepTwo({ phone }) {
    const [timer, setTimer] = useState(60)
    const refInputWrapper = useRef(null)

    const changeHandler = (event, index) => {
        const target = event.target
        if (target.value.length > 1) {
            target.value = target.value.split('')[1]
        } else if (target.value.length === 1) {
            target.setAttribute('data-focus', true)
            if (index !== 3) refInputWrapper.current.children[index + 1].focus()
        } else {
            target.setAttribute('data-focus', false)
            if (index !== 0) refInputWrapper.current.children[index - 1].focus()
        }
    }

    return (
        <div className={style.stepTwo}>
            <div className={`${style.title} text--h4 text--bold pb-2`}>
                <span>Введите код</span>
            </div>

            <div className='text--p4 pb-0.5'>
                Мы отправили код подтверждения на номер
            </div>

            <div className='pb-1'>
                <span className='text--p5 text--bold'>+7 (999) 199-19-19{phone} </span>
                <a href='#' className='link text--p6 text--color-primary text--upper text--bold'>Изменить</a>
            </div>

            <div className='pb-3'>
                <span className='text--p4'>Пожалуйста, введите код ниже:</span>
            </div>

            <div ref={refInputWrapper} className={style.codeInput}>
                <input onChange={event => changeHandler(event, 0)} className='input' type='text' />
                <input onChange={event => changeHandler(event, 1)} className='input' type='text' />
                <input onChange={event => changeHandler(event, 2)} className='input' type='text' />
                <input onChange={event => changeHandler(event, 3)} className='input' type='text' />
            </div>

            {timer
                ? <div className={`${style.footer} text--p5`}>
                    <p>Отправить новый код</p>
                    <p>через {timer} секунд</p>
                </div>
                : <a href='#' className='link text--p6 text--upper text--color-primary'>Отправить новый код</a>
            }


        </div>
    )
}

function AuthModalTitle({ type }) {
    if (type === 'auth') {
        return <span>Вход или регистрация</span>
    } else if (type === 'notification') {
        return <span>Мы вас оповестим!</span>
    } else {
        return <span>Войдите для оформления заказа</span>
    }
}