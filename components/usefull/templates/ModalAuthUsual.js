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
                <a href='#' onClick={codeHandler} className='link text--p6 text--center text--upper text--bold text--color-primary py-1'>Ввести инвайт-код</a>
            </div>
        </div>
    )
}

function StepTwo({ setStep, step }) {
    const [error, setError] = useState('')
    const [isHelpOpen, setIsHelpOpen] = useState(false)

    const helpHandler = event => {
        event.preventDefault()
        setIsHelpOpen(true)
    }

    const nextAction = () => {
        globalState.auth.setIsAuth(true)
        globalState.modal.setIsOpen(false)
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

    return (
        <>
            <div data-active={step === 2} data-blure={step === 3 || isHelpOpen} className={style.stepTwo}>
                <div className={style.background} />
                <div onClick={() => setStep(1)} className={style.backBtn}>
                    <Icon name='chevronLeft' width='20' height='20' />
                </div>

                <div className={style.image}>
                    <Image src='/images/usefull/templates/invite.png' layout='fill' alt='invite icon' />
                </div>

                <div style={{ maxWidth: 400 }} className='text--a2 text--bold py-1.5'>Инвайт-код</div>

                <div className='text--p4 pb-3'>
                    Правильно введённый пригласительный код сразу откроет вам все преимущества профессионального покупателя RedHare Market
                </div>

                <InputCode setError={setError} resetExcludes={[2, 3]} count={6} error={error} reset={step} onAfterChange={codeValidate} />

                {!!error
                    ? <div className={`${style.footer} text--p5`}>
                        <a href='#' onClick={helpHandler} className='link text--p6 text--upper text--bold text--color-primary'>Связаться с поддержкой</a>
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
                    <div className='btn btn--md btn--grey'>
                        <Icon name='telegramEmpty' width='16' height='16' />
                    </div>
                    <div className={style.helpOr}>Или</div>
                    <div className='btn btn--md btn--grey'>
                        <Icon name='whatsapp' width='16' height='16' />
                    </div>
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