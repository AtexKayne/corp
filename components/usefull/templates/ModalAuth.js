import { useLottie } from 'lottie-react'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'
import loading from '../../../public/images/usefull/loading.json'
import style from '../../../styles/module/usefull/templates/Modal-auth.module.scss'

import Icon from '../../Icon'
import Image from 'next/image'
import InputMask from 'react-input-mask'
import InputCode from '../form/InputCode'

export default function ModalAuth({ data }) {
    const [phone, setPhone] = useState('')
    const [step, setStep] = useState(1)

    return (
        <div className={`${style.authWrapper} full-height`}>
            <StepOne data={data} setStep={setStep} step={step} setPhone={setPhone} />
            <StepTwo phone={phone} setStep={setStep} step={step} data={data} />
            <StepThree step={step} />
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

function StepOne({ setStep, step, data, setPhone }) {
    const [isDisabled, setIsDisabled] = useState(true)
    const refInput = useRef(null)

    const getValueLength = () => refInput.current.value.trim().length

    const changeHandler = () => {
        setPhone(refInput.current.value)
        setIsDisabled(getValueLength() !== 18)
    }

    const validateHandler = () => {
        if (getValueLength() === 18) setStep(2)
    }

    return (
        <div data-active={step === 1} className={style.stepOne}>
            <div className={style.image}>
                <Image src='/images/layout/logo-xs.svg' width='117' height='117' alt='RedHair market' />
            </div>

            <div className={`${style.title} text--a2 text--bold pb-2`}>
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
    )
}

function StepTwo({ phone, setStep, step, data }) {
    const [timer, setTimer] = useState(60)
    const [error, setError] = useState('')
    const refTimer = useRef(false)

    const notificateHandler = () => {
        data.setIsRinged(true)
        setTimeout(() => data.setIsRinged(false), 1100)
        data.setIsNotify(true)
        globalState.popover.setTextPrimary(data.name)
        globalState.popover.setTextSecondary('Сообщим о поступлении письмом')
        globalState.popover.setImage(data.image)
        globalState.popover.setIsBasket(false)
        globalState.popover.setIsOpen(true)
    }

    const authHandler = (code) => {
        if (code.includes('5555')) {
            globalState.modal.setTemplate('authProfi')
            globalState.modal.setIsZero(true)
            globalState.modal.setIsOpen(true)
        } else {
            globalState.modal.setTemplate('authUsual')
            globalState.modal.setIsZero(true)
            globalState.modal.setIsOpen(true)
        }
    }

    const nextAction = (code) => {
        globalState.auth.setIsAuth(true)
        setTimeout(() => {
            if (data.type === 'notification') {
                notificateHandler()
            } else if (data.type === 'auth') {
                authHandler(code)
            }
        }, 800)
        globalState.modal.setIsOpen(false)
    }

    const codeValidate = code => {
        const active = document.activeElement
        console.log(active);
        if (active && typeof active.blur === 'function') active.blur()

        setStep(3)
        setTimeout(() => {
            if (code.includes('666')) {
                setError('Неверный, код!')
                setStep(2)
            } else nextAction(code)
        }, 3000)
    }

    const newCodeHandler = event => {
        event.preventDefault()
        // Костыль для сброса инпутов
        setStep(() => {
            setTimeout(() => setStep(2), 50)
            return 1
        })
    }

    useEffect(() => {
        if (step === 2) {
            refTimer.current = setInterval(() => {
                setTimer(prev => {
                    if (prev > 1) return prev - 1
                    clearInterval(refTimer.current)
                    return 0
                })
            }, 1000)
        } else if (step === 1) {
            setError('')
            if (refTimer.current) clearInterval(refTimer.current)
            refTimer.current = false
            setTimer(60)
        } else {
            if (refTimer.current) clearInterval(refTimer.current)
            refTimer.current = false
            setTimer(60)
        }
    }, [step])

    useEffect(() => {
        return () => {
            if (refTimer.current) clearInterval(refTimer.current)
        }
    }, [])

    return (
        <div data-active={step === 2} data-blure={step === 3} className={style.stepTwo}>
            <div onClick={() => setStep(1)} className={style.backBtn}>
                <Icon name='chevronLeft' width='20' height='20' />
            </div>

            <div className={`${style.title} text--a2 text--bold pb-2`}>
                <span>Введите код</span>
            </div>

            <div className='text--p4 pb-0.5'>
                Мы отправили код подтверждения на номер
            </div>

            <div className='pb-1'>
                <span className='text--p5 text--bold'>
                    {`${phone} `}
                </span>
                <a href='#' onClick={() => setStep(1)} className='link text--p6 text--color-primary text--upper text--bold'>Изменить</a>
            </div>

            <div className='pb-3'>
                <span className='text--p4'>
                    {!error ? 'Пожалуйста, введите код ниже:' : 'Ой, этот код не подходит. Попробуйте ещё раз'}
                </span>
            </div>

            <InputCode setError={setError} resetExcludes={[2, 3]} type='tel' count={4} error={error} reset={step} onAfterChange={codeValidate} />

            {timer
                ? <div onClick={newCodeHandler} className={`${style.footer} text--p5`}>
                    <p>Отправить новый код</p>
                    <p>через {timer} секунд</p>
                </div>
                : <div className={`${style.footer} text--p5`}>
                    <a onClick={newCodeHandler} href='#' className='link text--p6 text--upper text--bold text--color-primary'>Отправить новый код</a>
                </div>
            }
        </div>
    )
}

function StepThree({ step }) {
    const options = {
        animationData: loading,
        loop: true
    }

    const { View } = useLottie(options)

    return (
        <div data-active={step === 3} className={style.stepThree}>
            <div className={style.loading}>
                {View}
            </div>
        </div>
    )
}