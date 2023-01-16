import Icon from '../../components/Icon'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../components/helpers/globaslState'
import style from '../../styles/module/Product/Product-buy-button.module.scss'

export default function BuyButton({ children }) {
    const [isSelected, setIsSelected] = useState(false)
    const [isShaked, setIsShaked] = useState(false)
    const [diabled, setDiabled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [count, setCount] = useState(1)
    const refCounter = useRef(null)
    const refInput = useRef(null)
    const maxValue = 109


    const getValue = () => {
        const value = refInput.current.value
        return +value.replace(/[^\d]/g, '')
    }

    const documentClick = event => {
        if (!event.target.classList.contains(`${style.counterInput}`)) {
            document.removeEventListener('click', documentClick)
            setIsSelected(false)
            refInput.current.value = getValue()
        }
    }

    const counerClick = () => {
        // document.removeEventListener('click', documentClick)
        setIsSelected(true)
        setTimeout(() => {
            refInput.current.focus()
            document.addEventListener('click', documentClick)
        }, 100);
    }

    const updateCount = increment => {
        const newValue = +count + increment
        setCount(newValue)
    }

    const buyHandler = () => {
        setCount(1)
        setIsOpen(true)
        refInput.current.value = 1
        globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
        globalState.popover.setImage('/images/product/image-0.jpg')
        globalState.popover.setTextSecondary('ТЕПЕРЬ В КОРЗИНЕ')
        globalState.popover.setIsBasket(true)
        globalState.popover.setIsOpen(true)
    }

    const changeHandler = () => {
        setCount(getValue())
    }

    useEffect(() => {
        if (count <= 0) {
            setDiabled('minus')
            setCount(0)
            refInput.current.value = 0
            setIsSelected(false)
            setIsOpen(false)
            globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
            globalState.popover.setImage('/images/product/image-0.jpg')
            globalState.popover.setTextSecondary('БОЛЬШЕ НЕ В КОРЗИНЕ')
            globalState.popover.setIsBasket(false)
            globalState.popover.setIsOpen(true)
        } else if (count >= maxValue) {
            setDiabled('plus')
            setCount(maxValue)
            refInput.current.value = maxValue
            globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
            globalState.popover.setImage('/images/product/image-0.jpg')
            globalState.popover.setTextSecondary('Максимум для этого заказа')
            globalState.popover.setIsBasket(false)
            globalState.popover.setIsOpen(true)
            setIsShaked(true)
            setTimeout(() => setIsShaked(false), 1000)
        } else {
            setDiabled(false)
        }
        globalState.basket.setBasketCount(count)
    }, [count])


    return (
        <div className={style.buybtn}>
            <div className={`${style.buybtnChildren} is-hidden--lg-up is-hidden--sm-down`}>
                {children}
            </div>

            <div className={`${style.favourite} btn btn--md btn--shadow`}>
                <Icon name='heartMD' width='18' height='16' />
            </div>

            <div onClick={buyHandler} data-open={isOpen} className={`${style.btnMain} btn btn--md btn--fill btn--primary`}>
                <span className='text--upper text--p5 text--bold mr-0.8'>
                    <span className='is-hidden--lg-down'>Добавить </span>
                    <span>в корзину</span>
                </span>
                <Icon name='basketMD' width='18' height='18' />
            </div>

            <div data-open={isOpen} className={style.buyOpen}>

                <div className={`${style.toBasket} btn btn--md btn--fill btn--secondary is-hidden--xl-down`}>
                    <span className='text--upper text--p5 text--bold'>к корзине</span>
                </div>

                <div
                    ref={refCounter}
                    data-active={isSelected}
                    className={`${style.countSelector} text--p5 text--bold`}>
                    <span data-disabled={diabled === 'minus'} onClick={() => updateCount(-1)} className={style.counterBtn}>
                        <Icon name='minus' width='16' height='16' />
                    </span>

                    <input
                        type='text'
                        ref={refInput}
                        placeholder={count}
                        data-shake={isShaked}
                        onChange={changeHandler}
                        className={`${style.counterInput} text--p5 text--bold`} />
                    <div onClick={counerClick} className={style.counterDiv}>{count} ШТ</div>

                    <span data-disabled={diabled === 'plus'} onClick={() => updateCount(+1)} className={style.counterBtn}>
                        <Icon name='plus' width='16' height='16' />
                    </span>
                </div>
            </div>


        </div>
    )
}