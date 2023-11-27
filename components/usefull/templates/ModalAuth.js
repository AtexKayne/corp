import { useLottie } from 'lottie-react'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'
import loading from '../../../public/images/usefull/loading.json'
import style from './style-modules/Modal-auth.module.scss'

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
    const [isNotEmpty, setIsNotEmpty] = useState(false)
    const refInput = useRef(null)

    const getValueLength = () => refInput.current.value.replaceAll('_', '').replaceAll(' ', '').length

    const changeHandler = () => {
        setPhone(refInput.current.value)
        setIsDisabled(getValueLength() !== 14)
    }

    const validateHandler = () => {
        if (getValueLength() === 14) setStep(2)
    }

    const clickHandler = () => {
        refInput.current.setCursorToEnd()
    }

    const blurHandler = () => {
        setIsNotEmpty(getValueLength !== 4)
    }

    const keyDownHandler = event => {
        if (event.key !== 'Enter' && event.keyCode !== 13) return
        if (isDisabled) return
        validateHandler()
    }

    const pasteHandler = event => {
        event.preventDefault()
        const paste = (event.clipboardData || window.clipboardData).getData('text')
        const number = paste.replaceAll(/[^\d]/g, '').toString()
        const numberArr = number.split('')
        if (number.length > 9 && number.length < 15) {
            let phone = ''

            numberArr.forEach((n, i) => {
                if (i === 0) phone += '+7'
                else if (i === 1) phone += ` (${n}`
                else if (i === 3) phone += `${n}) `
                else if (i === 7 || i === 9) phone += ` ${n}`
                else if (i < 11) phone += `${n}`
            })

            refInput.current.setInputValue(phone)
            changeHandler()
        }
    }

    const clearHandler = () => {
        setIsNotEmpty(false)
        refInput.current.setInputValue('')
        refInput.current.getInputDOMNode().focus()
    }

    useEffect(() => {
        if (step === 1) refInput.current.getInputDOMNode().focus()
    }, [step])

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

            <div className={style.inputMask}>
                <div onClick={clearHandler} className={style.clearIcon}>
                    <Icon name='close' width='16' height='16' />
                </div>
                <InputMask
                    type='tel'
                    maskChar='_'
                    ref={refInput}
                    className='input'
                    onBlur={blurHandler}
                    onClick={clickHandler}
                    onPaste={pasteHandler}
                    data-focus={isNotEmpty}
                    onChange={changeHandler}
                    onKeyDown={keyDownHandler}
                    mask='+7 (999) 999 99 99'
                    placeholder='+7 (___) ___ __ __' />
            </div>

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
    const [codeNew, setCodeNew] = useState(false)
    const [timer, setTimer] = useState(60)
    const [error, setError] = useState('')
    const [reset, setReset] = useState(0)
    const refTimer = useRef(false)
    const refCode = useRef(null)

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
            globalState.modal.open('authProfi', true)
        } else {
            globalState.modal.open('authUsual', true)
        }
    }

    const nextAction = (code) => {
        globalState.auth.setIsAuth(true)
        setTimeout(() => {
            if (data.type === 'notification') notificateHandler()
            else if (data.type === 'auth') authHandler(code)
        }, 800)
        globalState.modal.close()
    }

    const codeValidate = code => {
        const active = document.activeElement
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
        setCodeNew(true)
        setError('')
        setReset(prev => prev + 1)
        if (refTimer.current) clearInterval(refTimer.current)
        setTimer(60)
        refTimer.current = setInterval(() => {
            setTimer(prev => {
                if (prev > 1) return prev - 1
                clearInterval(refTimer.current)
                return 0
            })
        }, 1000)
    }

    const clickHandler = () => {
        globalState.modal.close()
    }

    const changeHandler = event => {
        setError('')
    }

    useEffect(() => {
        const close = document.querySelector('.modal__close')
        if (step === 2) {
            if (window.innerWidth <= globalState.sizes.sm) {
                close.style.display = 'none'
            }
            refTimer.current = setInterval(() => {
                setTimer(prev => {
                    if (prev > 1) return prev - 1
                    clearInterval(refTimer.current)
                    return 0
                })
            }, 1000)
            if (window.innerWidth > globalState.sizes.md) {
                setTimeout(() => {
                    refCode.current.querySelector('input').focus({})
                }, 700)
            }
        } else if (step === 1) {
            setReset(prev => prev + 1)
            setError('')
            if (refTimer.current) clearInterval(refTimer.current)
            refTimer.current = false
            setTimer(60)
            if (window.innerWidth <= globalState.sizes.sm) {
                close.style.display = ''
            }
        } else {
            if (refTimer.current) clearInterval(refTimer.current)
            refTimer.current = false
            setTimer(60)
        }
    }, [step])

    useEffect(() => {
        return () => {
            if (refTimer.current) clearInterval(refTimer.current)
            const close = document.querySelector('.modal__close')
            close.style.display = ''
        }
    }, [])

    return (
        <div data-active={step === 2} data-blure={step === 3} className={style.stepTwo}>
            <div className={style.headNav}>
                <div onClick={() => setStep(1)} className={style.backBtn}>
                    <Icon name='chevronLeft' width='20' height='20' />
                </div>

                <span className='text--t6 text--upper text--bold is-hidden--md-up'>Подтвердить номер</span>

                <div onClick={clickHandler} className={style.backBtn}>
                    <Icon name='close' width='20' height='20' />
                </div>
            </div>

            {/* <div onClick={() => setStep(1)} className={style.backBtn}>
                <Icon name='chevronLeft' width='20' height='20' />
            </div> */}

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

            <div ref={refCode} className={`code-error`} data-error={!!error}>
                <InputCode type='tel' reset={reset} count={4} onChange={changeHandler} onAfterComplete={codeValidate} />
                <div data-error={!!error} className={`input-error text--center text--p4 text--color-primary`}>{error}</div>
            </div>

            {timer
                ? <div className={`${style.footer} text--p5`}>
                    <p>{codeNew ? 'Код отправлен.' : ''}</p>
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