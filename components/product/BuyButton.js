import Icon from '../../components/Icon'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../helpers/globalState'
import { motion, useAnimationControls } from 'framer-motion'
import style from '../../styles/module/Product/Product-buy-button.module.scss'

export default function BuyButton({ children, max, activeValue, isProfi, isEmpty, setInBasket }) {
    const [isFavourite, setIsFavourite] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [isShaked, setIsShaked] = useState(false)
    const [diabled, setDiabled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [count, setCount] = useState(0)

    const animateCount = useAnimationControls()

    const refValuesUpdate = useRef(false)
    const refSafeValue = useRef(0)
    const refCounter = useRef(null)
    const refButton = useRef(null)
    const refInput = useRef(null)


    const getValue = () => {
        const value = refInput.current.value
        return +value.replace(/[^\d]/g, '')
    }

    const documentClick = event => {
        const classList = event.target.classList

        if (!classList.contains(style.counterInput) && !classList.contains(style.counterBtnReject)) {
            document.removeEventListener('click', documentClick)
            setIsSelected(false)
            refInput.current.value = getValue()

            if (+refInput.current.value === 0) setCount(0)
        } else if (classList.contains(style.counterBtnReject)) {
            document.removeEventListener('click', documentClick)
            setIsSelected(false)
        }
    }

    const cancelHandler = () => {
        setCount(refSafeValue.current)
        refInput.current.value = refSafeValue.current
    }

    const counterClick = () => {
        refSafeValue.current = count
        setIsSelected(true)
        setTimeout(() => {
            refInput.current.focus()
            document.addEventListener('click', documentClick)
        }, 100);
    }

    const updateCount = async increment => {
        const newValue = +count + increment
        await animateCount.start({ y: -40, transition: { duration: 0.1 } })
        await animateCount.start({ y: 40, transition: { duration: 0 } })
        setCount(newValue)
        animateCount.start({ y: 0, transition: { duration: 0.1 } })
    }

    const buyHandler = () => {
        setCount(count + 1)
        setIsOpen(true)
        refInput.current.value = 1
        globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
        globalState.popover.setImage('/images/product/image-0.jpg')
        globalState.popover.setTextSecondary('ТЕПЕРЬ В КОРЗИНЕ')
        globalState.popover.setIsBasket(true)
        globalState.popover.setIsOpen(true)
    }

    const favouriteHandler = () => {
        const text = !isFavourite ? 'ТЕПЕРЬ В ИЗБРАННОМ' : 'БОЛЬШЕ НЕ В ИЗБРАННОМ'
        setIsFavourite(!isFavourite)
        globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
        globalState.popover.setImage('/images/product/image-0.jpg')
        globalState.popover.setTextSecondary(text)
        globalState.popover.setIsBasket(false)
        globalState.popover.setIsOpen(true)
    }

    const changeHandler = () => {
        const value = getValue()
        if (!!value) setCount(value)
    }

    const profiClickHandler = () => {
        globalState.modal.setIsOpen(true)
        globalState.modal.setTemplate('profi')
        // console.log(globalState);
    }

    const notificationClickHandler = () => {
        globalState.modal.setIsOpen(true)
        globalState.modal.setTemplate('notification')
    }

    useEffect(() => {
        if (refValuesUpdate.current || isProfi) return

        if (count <= 0) {
            setDiabled('minus')
            setCount(0)
            refInput.current.value = 0
            setIsSelected(false)
            setIsOpen(false)
            globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
            globalState.popover.setTextSecondary('БОЛЬШЕ НЕ В КОРЗИНЕ')
            globalState.popover.setImage('/images/product/image-0.jpg')
            globalState.popover.setIsBasket(false)

            globalState.popover.setIsOpen(true)
        } else if (count > max) {
            setDiabled('plus')
            setCount(max)
            refInput.current.value = max
            setIsShaked(true)
            setTimeout(() => setIsShaked(false), 1000)
            globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
            globalState.popover.setTextSecondary('Максимум для этого заказа')
            globalState.popover.setImage('/images/product/image-0.jpg')
            globalState.popover.setIsBasket(false)

            globalState.popover.setIsOpen(true)
        } else {
            setDiabled(false)
        }
        activeValue.basket = count
        setInBasket(new Date())
    }, [count])

    useEffect(() => {
        if (isProfi) return
        const target = document.querySelector('footer')
        const callback = entries => {
            if (window.innerWidth < globalState.sizes.lg) {
                if (entries[0].isIntersecting) refButton.current.style.transform = 'translateY(200px)'
                else refButton.current.style.transform = ''
            }
        }

        const observer = new IntersectionObserver(callback, { threshold: 0.1 })
        observer.observe(target)

        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        refValuesUpdate.current = true
        if (activeValue.basket) {
            setCount(activeValue.basket)
            setIsOpen(true)
        } else {
            setCount(0)
            setIsOpen(false)
        }

        setTimeout(() => {
            refValuesUpdate.current = false
        }, 300);

    }, [activeValue])



    return (
        <div ref={refButton} className={style.buybtn}>
            <div className={`${style.buybtnChildren} is-hidden--lg-up is-hidden--sm-down`}>
                {children}
            </div>

            <div
                onClick={favouriteHandler}
                data-active={isFavourite}
                className={`${style.favourite} btn btn--md btn--shadow`}>
                <Icon name='heartFill' width='18' height='16' />
            </div>
            {
                !isProfi && !isEmpty
                    ? <div className={style.btnWrapper}>
                        <div onClick={buyHandler} data-open={isOpen} className={`${style.btnMain} btn btn--md btn--primary`}>
                            <span className='text--upper text--p5 text--bold mr-0.8'>
                                <span className='is-hidden--lg-down'>Добавить </span>
                                <span>в корзину</span>
                            </span>
                            <Icon name='basketMD' width='18' height='18' />
                        </div>

                        <div data-open={isOpen} className={style.buyOpen}>

                            <div className={`${style.toBasket} btn btn--md btn--secondary is-hidden--xl-down`}>
                                <span className='text--upper text--p5 text--bold'>к корзине</span>
                            </div>

                            <div
                                ref={refCounter}
                                data-active={isSelected}
                                className={`${style.countSelector} text--p5 text--bold`}>
                                <span data-disabled={diabled === 'minus'} onClick={() => updateCount(-1)} className={style.counterBtn}>
                                    <Icon name='minus' width='16' height='16' />
                                </span>
                                <span onClick={cancelHandler} className={`${style.counterBtnAccept} ${style.counterBtnReject}`}>
                                    <Icon name='close' width='16' height='16' />
                                </span>

                                <input
                                    type='text'
                                    ref={refInput}
                                    placeholder={count}
                                    data-shake={isShaked}
                                    onChange={changeHandler}
                                    className={`${style.counterInput} text--p5 text--bold`} />

                                <div onClick={counterClick} className={style.counterDiv}>
                                    <motion.span animate={animateCount}>{count}</motion.span>
                                    <span>&nbsp;ШТ</span>
                                </div>

                                <span data-disabled={diabled === 'plus'} onClick={() => updateCount(+1)} className={style.counterBtn}>
                                    <Icon name='plus' width='16' height='16' />
                                </span>
                                <span className={style.counterBtnAccept}>
                                    <Icon name='check' width='16' height='16' />
                                </span>
                            </div>
                        </div>
                    </div> : null
            }

            {
                isProfi && !isEmpty
                    ? <div className={style.btnWrapper}>
                        <div onClick={profiClickHandler} className={`${style.btnMain} btn btn--md btn--primary`}>
                            <span className='text--upper text--p5 text--bold mr-0.8'>ДЛЯ ПРОФессионалов</span>
                        </div>
                    </div> : null
            }

            {
                isEmpty
                    ? <div className={style.btnWrapper}>
                        <div onClick={notificationClickHandler} className={`${style.btnMain} btn btn--md btn--yellow`}>
                            <span className='text--upper text--p5 text--bold mr-0.8'>Сообщить</span>
                        </div>
                    </div> : null
            }
        </div>
    )
}