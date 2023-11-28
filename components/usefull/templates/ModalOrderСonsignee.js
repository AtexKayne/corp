import { motion, useAnimationControls } from 'framer-motion'
import Icon from '../../Icon'
import Input from '../form/Input'
import ItemChecker from '../form/ItemChecker'
import style from './style-modules/modal-order-consignee.module.scss'
import InputMask from 'react-input-mask'
import { useRef, useEffect, useState } from 'react'

export default function ModalOrderСonsignee({ data }) {
    const animate = useAnimationControls()
    const refInput = useRef(null)

    const clickHandler = () => {

    }

    const inputChangeHandler = (name, value) => {
        console.log(name, value);
    }


    const getValueLength = () => refInput.current.value.replaceAll('_', '').replaceAll(' ', '').length

    const phoneChangeHandler = () => {
        inputChangeHandler('phone', refInput.current.value)
        // setPhone(refInput.current.value)
        // setIsDisabled(getValueLength() !== 14)
    }

    const itemCheckHandler = (...args) => {
        if (args[0] === 'consignee') {
            const height = args[1] ? 0 : 'auto'
            animate.start({ height, transition: { duration: 0.3, ease: 'easeInOut' } })
        }
    }

    return (
        <>
            <div className={`${style.container}`}>
                <div className='text--a3 text--bold pt-2'>Получатель</div>
                <div className={`${style.formСonsignee}`}>
                    <div className='text--bold text--t1 pt-3'>Мои данные</div>
                    <div className='text--t3 text--normal text--color-disabled pt-1'>Нам не хватает некоторых ваших данных</div>
                    <div className='pt-2'>
                        <Input name='family' placeholder='Фамилия *' isCleared onChange={inputChangeHandler} />
                    </div>
                    <div className='pt-2'>
                        <Input name='name' placeholder='Имя *' isCleared onChange={inputChangeHandler} />
                    </div>
                    <div className='pt-2'>
                        <Input name='second' placeholder='Отчество' isCleared onChange={inputChangeHandler} />
                    </div>

                    <div className='text--bold text--t1 pt-3'>Мои контакты</div>

                    <div className='pt-2 p-relative'>
                        <input value='+7 (999) 888 77 66' className='input is-decorative' />
                        <div className={`${style.iconDisabled} is-extended`}>
                            <Icon name='lock' width='18' height='18' />
                        </div>
                    </div>

                    <div className='pt-2'>
                        <Input name='email' placeholder='Email *' isCleared onChange={inputChangeHandler} />
                    </div>
                    <div className='pt-2'>
                        <ItemChecker code='post' isActive onAfterChange={itemCheckHandler} text='Присылать мне почтовые рассылки со специальными предложениями' />
                    </div>
                    <div className='pt-2'>
                        <ItemChecker code='consignee' isActive onAfterChange={itemCheckHandler} text='Я получатель' />
                    </div>

                    <motion.div animate={animate} className={style.wrapperСonsignee}>
                        <div className='pt-2'>
                            <Input name='family-c' placeholder='Фамилия *' isCleared onChange={inputChangeHandler} />
                        </div>
                        <div className='pt-2'>
                            <Input name='name-c' placeholder='Имя *' isCleared onChange={inputChangeHandler} />
                        </div>
                        <div className='pt-2'>
                            <Input name='second-c' placeholder='Отчество' isCleared onChange={inputChangeHandler} />
                        </div>
                        <div className='pt-2'>
                            <InputMask
                                type='tel'
                                maskChar='_'
                                ref={refInput}
                                className='input'
                                // onBlur={blurHandler}
                                // onClick={clickHandler}
                                // onPaste={pasteHandler}
                                // data-focus={isNotEmpty}
                                onChange={phoneChangeHandler}
                                // onKeyDown={keyDownHandler}
                                mask='+7 (999) 999 99 99'
                                placeholder='+7 (___) ___ __ __' />
                        </div>
                    </motion.div>

                    <div className='text--t4 pt-2'>
                        <span>Нажимая на кнопку «Сохранить» вы соглашаетесь с </span>
                        <span className='link text--color-primary'>политикой конфиденциальности</span>
                    </div>
                </div>
            </div>

            <div className={`${style.fixedFooter}`}>
                <div onClick={clickHandler} d-disabled={`true`} fill='true' d-size='md' theme='primary' className='button'>
                    <span className='text--upper text--p5 text--bold text--sparse'>
                        сохранить
                    </span>
                </div>
            </div>
        </>
    )
}
