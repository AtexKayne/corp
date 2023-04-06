import { useLottie } from 'lottie-react'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'
import loading from '../../../public/images/usefull/loading.json'
import style from '../../../styles/module/usefull/templates/Modal-auth-usual.module.scss'

import Image from 'next/image'
import Icon from '../../Icon'
import InputCode from '../form/InputCode'

export default function ModalAuthUsual() {
    const [step, setStep] = useState(1)

    return (
        <div className={`${style.authWrapper} full-height`}>
            <StepOne setStep={setStep} step={step} />
            <StepTwo setStep={setStep} step={step} />
            <StepThree step={step} />
        </div>
    )
}

function StepOne({ setStep, step }) {
    const clickHandler = () => {
        globalState.modal.setIsOpen(false)
    }

    const codeHandler = event => {
        event.preventDefault()
        setStep(2)
    }

    return (
        <div data-active={step === 1} className={style.stepOne}>
            <div className={style.image}>
                <Image src='/images/usefull/templates/machina.png' layout='fill' alt='profi icon' />
            </div>
            <div style={{ maxWidth: 400, lineHeight: '1em' }} className='text--a2 text--center text--bold py-1.5'>
                В одном шаге <br /> от&nbsp;выгодных цен
            </div>

            <div className='text--p4 text--center pb-1.5'>
                Чтобы вы могли покупать товары по специальным оптовым ценам, нам нужно подтвердить ваш статус профессионала.
            </div>
            <div className='text--p4 text--center'>
                Подтверждение происходит в нашем телеграм-боте.
            </div>
            <div className={style.footer}>
                <div onClick={clickHandler} className={`${style.button} ${style.profiBtn} btn btn--md btn--fill btn--primary`}>
                    <span className='text--upper text--sparse text--p5 text--bold'>Подтвердить статус&nbsp;</span>
                    <span className='text--upper text--sparse text--p5 text--bold'>профессионала</span>
                </div>
                <div onClick={clickHandler} className={`${style.button} btn btn--md btn--fill btn--shadow`}>
                    <span className='text--upper text--sparse text--p5 text--bold'>Перейти к покупкам</span>
                </div>
                <a href='#' onClick={codeHandler} className='link text--p5 text--center text--upper text--bold text--color-primary py-1'>Ввести инвайт-код</a>
            </div>
        </div>
    )
}

function StepTwo({ setStep, step }) {
    const refCode = useRef(null)
    const [reset, setReset] = useState(0)
    const [error, setError] = useState('')
    const [isHelpOpen, setIsHelpOpen] = useState(false)

    const clickHandler = () => {
        globalState.modal.setIsOpen(false)
    }

    const helpHandler = event => {
        event.preventDefault()
        setIsHelpOpen(true)
    }

    const changeHandler = event => {
        setError('')
    }

    const nextAction = () => {
        globalState.auth.setIsAuth(true)
        globalState.modal.setIsOpen(false)

        setTimeout(() => {
            globalState.popover.setTextPrimary('Ура! Вам присвоен статус<br />профессионального покупателя!')
            globalState.popover.setTextSecondary('теперь вы можете покупать товары<br /> по оптовым ценам')
            globalState.popover.setImage('/images/usefull/templates/auth-popover.png')
            globalState.popover.setIsBasket(false)
            globalState.popover.setIsOpen(true)
        }, 700)
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

    useEffect(() => {
        if (step === 2) {
            if (window.innerWidth > globalState.sizes.md) {
                setTimeout(() => {
                    refCode.current.querySelector('input').focus({})
                }, 700)
            }
        } else if (step === 1) {
            setError('')
            setReset(prev => prev + 1)
        }
    }, [step])


    return (
        <>
            <div data-active={step === 2} data-blure={step === 3 || isHelpOpen} className={style.stepTwo}>
                <div className={style.background} />
                <div className={style.headNav}>
                    <div onClick={() => setStep(1)} className={style.backBtn}>
                        <Icon name='chevronLeft' width='20' height='20' />
                    </div>

                    {/* <span className='text--t6 text--upper text--bold is-hidden--md-up'>Инвайт-код</span> */}

                    <div onClick={clickHandler} className={style.backBtn}>
                        <Icon name='close' width='20' height='20' />
                    </div>
                </div>

                <div className={style.image}>
                    <Image src='/images/usefull/templates/invite.png' layout='fill' alt='invite icon' />
                </div>

                <div className={`${style.title} text--a2 text--bold pb-2 pt-2`}>Инвайт-код</div>

                <div ref={refCode} className={`${style.codeInput} code-error`} data-error={!!error}>
                    <InputCode count={6} reset={reset} onChange={changeHandler} onAfterComplete={codeValidate} />
                    <div data-error={!!error} className={`input-error text--center text--p4 text--color-primary`}>{error}</div>
                </div>

                <div className={`${style.text} text--p4 pb-3 pt-3`}>
                    Правильно введённый пригласительный код сразу откроет вам все преимущества профессионального покупателя RedHare Market
                </div>

                {!!error
                    ? <div className={`${style.footer} text--p5`}>
                        <a href='#' onClick={helpHandler} className='link text--p5 text--upper text--bold text--color-primary'>Связаться с поддержкой</a>
                    </div> : null
                }

            </div>
            <HelpWindow isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} />
        </>
    )
}

function HelpWindow({ isHelpOpen, setIsHelpOpen }) {
    return (
        <div data-active={isHelpOpen} className={style.helpWindow}>
            <div onClick={() => setIsHelpOpen(false)} className={style.helpBackground} />

            <div className={style.helpContainer}>
                <div onClick={() => setIsHelpOpen(false)} className={style.closeIcon}>
                    <Icon name='chevronDown' width='18' height='18' />
                </div>

                <div className='text--t1 text--bold text--center pb-2'>Проблемы с вводом кода?</div>

                <div className='text--p4'>
                    Убедитесь, что вверно вводите символы: иногда могут казаться одинаковыми единица и латинская I, ноль и буква О.
                </div>
                <div className='text--p4'>
                    Либо свяжитесь с нами:
                </div>

                <div className={style.helpInfo}>
                    <div className='text--t2 text--regular'>Чат с консультантом</div>
                    <span className='btn btn--grey'>
                        <Icon name='telegramEmpty' width='16' height='16' />
                    </span>
                    <div className={style.helpOr}>Или</div>
                    <span className='btn btn--grey'>
                        <Icon name='whatsapp' width='16' height='16' />
                    </span>
                </div>

                <div className={style.helpContacts}>
                    <div>
                        <div className='text--t6 text--color-disabled text--regular'>Служба поддержки</div>
                        <a className='d-block link text--t1 text--bold' href='tel:+7 (495) 981-65-84'>+7 (495) 981-65-84</a>
                    </div>
                    <div>
                        <div className='text--t6 text--color-disabled text--regular'>Напишите нам по почте</div>
                        <a className='d-block link text--t1 text--bold' href='mail:info@redharemarket.ru'>info@redharemarket.ru</a>
                    </div>
                </div>
            </div>

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