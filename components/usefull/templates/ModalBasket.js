import { cards } from '../../helpers/constants'
import { globalState } from '../../helpers/globalState'
import style from '../../../styles/module/usefull/templates/Modal-basket.module.scss'
import CardSlider from '../ui/CardSlider/CardSlider'
import Card from '../../product/Card'
import InputCheckbox from '../form/InputCheckbox'
import Icon from '../../Icon'
import Favourite from '../Favourite'
import { useRef, useState, useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

export default function ModalBasketProfi({ data }) {
    const [items, setItems] = useState(data.items)
    return (
        <>
            {items && items.length
                ? <FilledBasket items={items} setItems={setItems} />
                : <EmptyBasket />
            }
        </>
    )
}

function EmptyBasket({ }) {
    return (
        <div>
            <div className={`${style.title} text--a2 text--bold pt-2 pb-2`}>В корзине пусто</div>
            <div className={`${style.emptyText} text--t2 text--normal pb-3`}>
                Вы можете посмотреть <a href='#'>новые товары</a>, <a href='#'>наши хиты</a>, ознакомиться с <a href='#'>брендами</a>.
                Или поискать что-нибудь в каталоге.
            </div>
            <CardSlider items={cards} />
        </div>
    )
}

function FilledBasket({ items, setItems }) {
    const [timerText, setTimerText] = useState(5)
    const [returnedItem, setReturnedItem] = useState(false)
    const animationPath = useAnimationControls()
    const animateNotification = useAnimationControls()
    const refDeletedItem = useRef(0)
    const refInterval = useRef(false)

    const select = item => {
        console.log(item);
    }

    const returnHandler = async () => {
        setReturnedItem(refDeletedItem.current)
        await animateNotification.start({ opacity: 0, y: 500, transition: { duration: 0.3 } })
        if (refInterval.current) clearInterval(refInterval.current)
        refDeletedItem.current = false
        setReturnedItem(false)
    }

    const deleteItem = async item => {
        refDeletedItem.current = item
        animationPath.start({ pathLength: 1, transition: { duration: 0 } })
        await animateNotification.start({ opacity: 0, y: 500, transition: { duration: 0.3 } })
        await animateNotification.start({ opacity: 1, y: -60, transition: { duration: 0.6 } })
        setTimerText(5)
        if (refInterval.current) clearInterval(refInterval.current)
        refInterval.current = setInterval(() => {
            setTimerText(prev => {
                const newValue = prev - 1
                return newValue
            })
        }, 1000)
        await animationPath.start({ pathLength: 0, transition: { duration: 4.9 } })
        await animateNotification.start({ opacity: 0, y: 500, transition: { duration: 0.3 } })
        animationPath.start({ pathLength: 1, transition: { duration: 0 } })
        clearInterval(refInterval.current)
        if (refDeletedItem.current) {
            setItems(prev => {
                const filtered = prev.filter(element => element.id !== item.id)
                return filtered
            })
        }
    }

    useEffect(() => {

        return () => {
            if (refInterval.current) clearInterval(refInterval.current)
        }
    }, [])

    return (
        <div className={`${style.basketWrapper} full-height`}>
            <div className={style.basketInner}>
                <div className={`${style.title} text--a2 text--bold pt-2 pb-2`}>Корзина</div>
                {items.map(item => {
                    if (item.values[0].max !== 0) {
                        return <ProductCard
                            item={item}
                            key={item.id}
                            select={select}
                            deleteItem={deleteItem}
                            returnedItem={returnedItem} />
                    }
                })}
            </div>
            <motion.div animate={animateNotification} initial={{ y: 400, opacity: 0 }} className={style.deleteNotification}>
                <div className={style.deleteTimer}>
                    <svg width='100%' height='100%' viewBox='0 0 1440 788' fill='none'>
                        <motion.path
                            stroke='#112233'
                            strokeWidth='30'
                            animate={animationPath}
                            initial={{ pathLength: 1 }}
                            d='M719.5 123.175C755.131 123.175 790.413 130.193 823.332 143.828C856.25 157.464 886.161 177.449 911.356 202.644C936.551 227.839 956.536 257.75 970.172 290.668C983.807 323.587 990.825 358.869 990.825 394.5C990.825 430.131 983.807 465.413 970.172 498.332C956.536 531.25 936.551 561.161 911.356 586.356C886.161 611.551 856.25 631.536 823.332 645.172C790.413 658.807 755.131 665.825 719.5 665.825C683.869 665.825 648.587 658.807 615.668 645.172C582.75 631.536 552.839 611.551 527.644 586.356C502.449 561.161 482.464 531.25 468.828 498.331C455.193 465.413 448.175 430.131 448.175 394.5C448.175 358.869 455.193 323.587 468.828 290.668C482.464 257.75 502.449 227.839 527.644 202.644C552.839 177.449 582.75 157.464 615.669 143.828C648.587 130.193 683.869 123.175 719.5 123.175L719.5 123.175Z'
                        />
                    </svg>
                    <span className={style.deleteTimerText}>{timerText}</span>
                </div>
                <div className={`${style.deleteNotificationText} text--t5`}>
                    Товар удалён
                </div>

                <div onClick={returnHandler} className={`${style.deleteNotificationReturn}`}>
                    вернуть обратно
                </div>
            </motion.div>
        </div>
    )
}

function ProductCard({ item, select, returnedItem, deleteItem }) {
    const animationProduct = useAnimationControls()
    const [isControlOpen, setIsControlOpen] = useState(false)
    const count = item.id

    const favouriteHandler = event => {
        const target = event.target.children[0]
        if (target && typeof target.click === 'function') {
            target.click()
        }
    }

    const closeControlsHandler = event => {
        if (event.type === 'click' && event.target.closest(`.${style.control}`)) return
        setIsControlOpen(false)
        document.removeEventListener('wheel', closeControlsHandler)
        document.removeEventListener('click', closeControlsHandler)
    }

    const toggleControlsHandler = () => {
        setIsControlOpen(prev => {
            if (!prev) {
                setTimeout(() => {
                    document.addEventListener('click', closeControlsHandler)
                    document.addEventListener('wheel', closeControlsHandler)
                }, 200)
            }
            return !prev
        })
    }

    const deleteHandler = async () => {
        deleteItem(item)
        await animationProduct.start({ opacity: 0 })
        await animationProduct.start({ height: 0, marginTop: 0, paddingTop: 0 })
    }

    useEffect(() => {
        if (!returnedItem || item.id !== returnedItem.id) return
        setIsControlOpen(false)
        animationProduct
            .start({ height: 'auto', marginTop: 16, paddingTop: 16, transition: { duration: 0.5 } })
            .then(() => animationProduct.start({ opacity: 1, transition: { duration: 0.3 } }))
    }, [returnedItem])

    return (
        <motion.div animate={animationProduct} transition={{ duration: 0.4 }} initial={{ marginTop: 16, paddingTop: 16 }} className={style.product}>
            <div className={style.controls}>
                <div onClick={favouriteHandler} className={style.control}>
                    <Favourite info={item} width='16' height='16' />
                    <span className='text--t4'>В избранное</span>
                </div>
                <div onClick={deleteHandler} className={style.control}>
                    <Icon name='remove' width='16' height='16' />
                    <span className='text--t4'>Удалить</span>
                </div>
            </div>
            <div onClick={toggleControlsHandler} className={style.settings}>
                <Icon name='settings' width='16' height='16' />
            </div>
            <div data-open={isControlOpen} className={style.productInner}>
                <InputCheckbox external={style.checkbox} onAfterComplete={() => select(item)} />
                <Card info={item} isInline={true} countInBasket={count} />
            </div>
        </motion.div>
    )
}
