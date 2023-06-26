import { motion, useAnimationControls, useInView } from 'framer-motion'
import { globalState } from '../../helpers/globalState'
import { useRef, useState, useEffect } from 'react'
import { word } from '../../helpers/wordTranslator'
import { cards } from '../../helpers/constants'
import style from '../../../styles/module/usefull/templates/Modal-basket.module.scss'
import CardSlider from '../ui/CardSlider/CardSlider'
import InputSelectAll from '../form/InputSelectAll'
import InputCheckbox from '../form/InputCheckbox'
import Favourite from '../Favourite'
import Card from '../ui/Card/Card'
import Odometer from 'odometer'
import Icon from '../../Icon'
import InfoNotify from '../ui/InfoNotify/InfoNotify'
import Link from 'next/link'
import Delivery from '../ui/Delivery/Delivery'
// @TODO Перенести стили одометра в локальную зону
export default function ModalBasketProfi() {
    const [isEmpty, setIsEmpty] = useState(!!globalState.basket.items.length)
    const [items, setItems] = useState(globalState.basket.items)

    useEffect(() => {
        // const items = localStorage.basket ?? JSON.stringify([])
        // const parsed = JSON.parse(items)
        // setItems(parsed)
        // setIsEmpty(!!parsed.length)
        if (window.innerWidth <= globalState.sizes.sm) {
            const close = document.querySelector('.modal__close')
            close.style.position = 'absolute'
            close.style.right = '40px'
        }
    }, [])

    useEffect(() => {
        setIsEmpty(!!items.length)
        globalState.basket.replace(items)
    }, [items])

    // useEffect(() => {
    //     console.log(globalState.basket.updateItemsCount);
    // }, [globalState.basket.updateItemsCount])


    return (
        <>
            {isEmpty
                ? <FilledBasket items={items} setItems={setItems} />
                : <EmptyBasket />
            }
        </>
    )
}

function EmptyBasket({ }) {
    return (
        <div>
            <div className={`${style.title} text--a2 text--bold pt-2.5 pb-2`}>В корзине пусто</div>
            <div className={`${style.emptyText} text--t2 text--normal pb-3`}>
                Вы можете посмотреть <a href='#'>новые товары</a>, <a href='#'>наши хиты</a>, ознакомиться с <a href='#'>брендами</a>.
                Или поискать что-нибудь в каталоге.
            </div>

            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.7, ease: 'easeOut' }}>
                <CardSlider items={cards} title='Недавно просмотрено' />
            </motion.div>

            <div className='d-flex flex--justify-center pb-3 mt-2.5'>
                <Link href='/catalog/main'>
                    <div className='btn btn--lg btn--primary'>
                        <span className='text--upper text--p5 text--sparse text--bold'>Перейти в каталог</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

function FilledBasket({ items, setItems }) {
    const [isShownBasket, setIsShownBasket] = useState(false)
    const [returnedItem, setReturnedItem] = useState(false)
    const [discount, setDiscount] = useState({ total: 0 })
    const [productsText, setProductsText] = useState(0)
    const [isChecked, setIsChecked] = useState(false)
    const [lackItems, setLackItems] = useState([])
    const [timerText, setTimerText] = useState(5)
    const [bonuses, setBonuses] = useState(0)
    const [summ, setSumm] = useState(0)
    const animateNotification = useAnimationControls()
    const animationPath = useAnimationControls()
    const refDeletedItemNode = useRef(null)
    const refInputWrapper = useRef(null)
    const refOdometrNode = useRef(null)
    const refInterval = useRef(false)
    const refDeletedItem = useRef(0)
    const refItemsInfo = useRef([])
    const refInputs = useRef(false)
    const refOdometr = useRef(null)

    const changeCount = (count, _, item) => {
        const indexSelected = refItemsInfo.current.findIndex(element => element.item.id === item.id)
        refItemsInfo.current[indexSelected].count = count
        updateItemsCount()
        updateSumm()
    }

    const updateSumm = () => {
        const filtered = refItemsInfo.current.filter(element => element.isSelected && !element.isDeleted)
        const newDiscount = { total: 0, detail: [] }
        let newBonuses = 0
        const newSumm = filtered.reduce((prev, curr) => {
            const priceOld = curr.item.values[0].price.old ?? 0
            const detailDiscount = curr.item.values[0].discount
            newBonuses += +curr.bonuses

            if (priceOld) newDiscount.total += +priceOld.replaceAll(' ', '')

            if (detailDiscount) {
                detailDiscount.forEach(element => {
                    const dIndex = newDiscount.detail.findIndex(item => element.name === item.name)
                    if (dIndex + 1) newDiscount.detail[dIndex].summ += element.summ
                    else newDiscount.detail.push(element)
                })
            }
            return prev + curr.price * curr.count
        }, 0)
        setSumm(newSumm)
        setBonuses(newBonuses)
        setDiscount(newDiscount)
        refOdometr.current.update(newSumm)
    }

    const updateItemsCount = () => {
        const filtered = refItemsInfo.current.filter(element => !element.isDeleted)
        const itemsCount = filtered.reduce((prev, curr) => {
            return prev + curr.count
        }, 0)

        setProductsText(word(itemsCount, ['товар', 'товара', 'товаров']))
    }

    const removeItem = () => {
        const index = refItemsInfo.current.findIndex(
            element => element.item.id === refDeletedItem.current.id
        )
        refItemsInfo.current[index].isDeleted = true
    }

    const selectHandler = item => {
        const index = refItemsInfo.current.findIndex(element => element.item.id === item.id)
        let isAllSelected = true
        refItemsInfo.current[index].isSelected = !refItemsInfo.current[index].isSelected

        refInputs.current.forEach(input => {
            if (!input.checked) isAllSelected = false
        })

        setIsChecked(isAllSelected)
        updateSumm()
    }

    const selectAllHandler = () => {
        if (isChecked) {
            refInputs.current.forEach(input => {
                if (input.checked) input.click()
            })
        } else {
            refInputs.current.forEach(input => {
                if (!input.checked) input.click()
            })
        }
    }

    const returnHandler = async () => {
        const index = refItemsInfo.current.findIndex(element => element.item.id === refDeletedItem.current.id)
        refItemsInfo.current[index].isDeleted = false
        if (refItemsInfo.current[index].count === 0) {
            const button = refDeletedItemNode.current.querySelector('.js-button')
            button.click()
        }
        updateSumm()
        updateItemsCount()
        setReturnedItem(refDeletedItem.current)
        await animateNotification.start({ opacity: 0, y: 500, transition: { duration: 0.3 } })
        if (refInterval.current) clearInterval(refInterval.current)
        refDeletedItem.current = false
        setReturnedItem(false)
    }

    const deleteItem = async (item, node) => {
        if (refDeletedItem.current) {
            setItems(prev => {
                const filtered = prev.filter(element => {
                    const equalId = element.id !== refDeletedItem.current.id
                    // const equalValue = element.values[0].value !== refDeletedItem.current.values[0].value
                    return equalId
                })
                return filtered
            })
        }
        refDeletedItem.current = item
        refDeletedItemNode.current = node
        removeItem()
        updateSumm()
        updateItemsCount()
        animationPath.start({ pathLength: 1, transition: { duration: 0 } })
        const yPosition = !!summ && !isShownBasket ? -120 : -60
        await animateNotification.start({ opacity: 0, y: 500, transition: { duration: 0.3 } })
        await animateNotification.start({ opacity: 1, y: yPosition, transition: { duration: 0.6 } })
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
                const filtered = prev.filter(element => {
                    const equalId = element.id !== item.id
                    // const equalValue = element.values[0].value !== item.values[0].value
                    return equalId
                })
                refDeletedItem.current = false
                refDeletedItemNode.current = null
                return filtered
            })
        }
    }

    const createOdometr = tryCount => {
        if (tryCount >= 20) return
        if (typeof Odometer === 'function') {
            refOdometr.current = new Odometer({
                el: refOdometrNode.current,
                value: 0,
                // duration: 3000,
                format: '( ddd)',
                theme: 'car',
            })
        } else {
            setTimeout(() => createOdometr(tryCount + 1), 700)
        }
    }

    const updateItems = newItems => {
        const newLackItems = []
        newItems.forEach(item => {
            if (!!item.values[0].max) {
                const price = '' + item.values[0].price.actual
                const info = {
                    item,
                    isDeleted: false,
                    isSelected: false,
                    count: item.values[0].basket,
                    bonuses: item.values[0].bonuses ?? 0,
                    price: price.replaceAll(' ', ''),
                }

                refItemsInfo.current.push(info)
            } else newLackItems.push(item)
        })
        refInputs.current = refInputWrapper.current.querySelectorAll('input[type="checkbox"]')
        if (newLackItems.length) setLackItems(newLackItems)
        updateItemsCount()
    }

    useEffect(() => {
        createOdometr(0)
        // updateItems(items)
        // selectAllHandler()
        return () => {
            if (refInterval.current) clearInterval(refInterval.current)
        }
    }, [])

    useEffect(() => {
        if (refItemsInfo.current.length) {

        } else {
            updateItems(items)
        }
    }, [items])

    return (
        <div className={`${style.basketWrapper} full-height`}>

            <div className={style.basketInner}>
                <div className={`${style.title} pt-3.5 pb-2`}>
                    <span className='text--a2 text--bold'>Корзина</span>
                    <Delivery summ={summ} maxSumm={10000} />
                </div>
                <div className='text--t5 text--bold text--center text--color-small text--upper'>
                    {productsText}
                </div>
                <div className={`${style.checker}`}>
                    <InputSelectAll isChecked={isChecked} setIsChecked={setIsChecked} onAfterComplete={selectAllHandler} text='Выбрать все' />
                </div>
                <div ref={refInputWrapper}>
                    {items.map(item => {
                        if (item.values[0].max !== 0) {
                            return <ProductCard
                                item={item}
                                key={item.id + item.values[0].value}
                                deleteItem={deleteItem}
                                returnedItem={returnedItem}
                                onChangeCount={changeCount}
                                selectHandler={selectHandler} />
                        }
                    })}
                </div>

                <BasketLackItems lackItems={lackItems} setLackItems={setLackItems} />

                <BasketTotalEmpty summ={summ} />

                <BasketTotal
                    summ={summ}
                    bonuses={bonuses}
                    discount={discount}
                    productsText={productsText}
                    setIsShownBasket={setIsShownBasket} />

                <div className='mt-3'>
                    <CardSlider items={cards} title='Добавьте к заказу' />
                </div>
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

            <div data-active={!!summ && !isShownBasket} className={`${style.basketMenu}`}>
                <div className={`${style.basketPrice}`}>
                    <div className='text--p4'>Итого</div>
                    <div className='text--nowrap text--p1 text--bold'>
                        <span ref={refOdometrNode} className='odometer odometer-theme-car'>0</span>
                        <span> ₽</span>
                    </div>
                </div>
                <div className={`${style.showBtn} btn btn--lg btn--primary btn--fill`}>
                    <span className='text--upper text--p5 text--sparse text--bold'>Оформить заказ</span>
                </div>
            </div>
        </div>
    )
}

function BasketLackItems({ lackItems, setLackItems }) {
    const animateWrapper = useAnimationControls()
    const removeHandler = () => {
        setTimeout(() => {
            animateWrapper.start({ height: 0, paddingTop: 0, opacity: 0, transition: { duration: 0.4 } }).then(() => {
                setLackItems([])
            })
        }, 450)
    }

    return (
        <motion.div data-is-hidden={!lackItems.length} animate={animateWrapper} initial={{ height: 'auto' }} className={`${style.lackItems} pt-2.5`}>
            <div className='d-flex flex--between'>
                <div className='text--t1'>Нет в наличии</div>
                <div onClick={removeHandler} className='text--t6 text--upper text--color-primary c-pointer'>Удалить все</div>
            </div>
            {lackItems.map(item => {
                return <ProductCardEmpty item={item} key={item.id + item.values[0].value} />
            })}
        </motion.div>
    )
}

function ProductCard({ item, selectHandler, returnedItem, deleteItem, onChangeCount }) {
    const animationProduct = useAnimationControls()
    const [isControlOpen, setIsControlOpen] = useState(false)
    const refItem = useRef(null)

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

    const onChangeCountHandler = (count, val, getItem) => {
        if (count === 0) deleteHandler(item)
        onChangeCount(count, val, getItem)
    }

    const deleteHandler = async () => {
        deleteItem(item, refItem.current)
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
        <motion.div ref={refItem} animate={animationProduct} transition={{ duration: 0.4 }} initial={{ marginTop: 16, paddingTop: 16 }} className={style.product}>
            <div className={style.controls}>
                <div onClick={favouriteHandler} className={style.control}>
                    <Favourite external={style.favourite} info={item} width='16' height='16' />
                    <span className='text--t4 is-decorative'>В избранное</span>
                </div>
                <div onClick={deleteHandler} className={style.control}>
                    <Icon name='remove' width='16' height='16' />
                    <span className='text--t4'>Удалить</span>
                </div>
            </div>
            <div onClick={toggleControlsHandler} data-open={isControlOpen} className={style.settings}>
                <Icon name='settings' width='16' height='16' />
                <Icon name='close' width='16' height='16' />
            </div>
            <div data-open={isControlOpen} className={style.productInner}>
                <InputCheckbox external={style.checkbox} onAfterComplete={() => selectHandler(item)} />
                <Card info={item} mode='inline' onChangeCount={onChangeCountHandler} />
            </div>
        </motion.div>
    )
}

function ProductCardEmpty({ item }) {

    return (
        <div style={{ marginTop: 16, paddingTop: 16 }} className={style.product}>
            <div className={style.productInner}>
                <InputCheckbox external={style.checkboxDisabled} />
                <Card info={item} mode='inline' />
            </div>
        </div>
    )
}


function BasketTotal({ summ, discount, productsText, bonuses, setIsShownBasket }) {
    const [isOpen, setIsOpen] = useState(false)
    const refButton = useRef(null)
    const isInView = useInView(refButton)
    const animateSubs = useAnimationControls()
    const toggleHandler = () => {
        const height = isOpen ? '0' : 'auto'
        animateSubs.start({ height, transition: { duration: 0.3, ease: 'easeInOut' } })
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setIsShownBasket(isInView)
    }, [isInView])

    return (
        <div data-active={!!summ} className={`${style.total} pt-2.5`}>
            <div className='text--t1'>Сумма корзины</div>
            <div className={`${style.totalContainer} pt-1`}>
                <div className={`${style.totalLine}`}>
                    <span className='text--t4'>{productsText}</span>
                    <div />
                    <span className='text--t3'>{summ.toLocaleString()} ₽</span>
                </div>
                <div data-is-hidden={!discount.total} className={`${style.totalLine}`}>
                    <span
                        data-open={isOpen}
                        onClick={toggleHandler}
                        className={`${style.totalSubOpener} text--t4`}
                        data-active={!!(discount.detail && discount.detail.length > 1)}>

                        Скидки
                        <Icon external={style.subOpenIcon} name='chevronDown' width='12' height='12' />
                    </span>
                    <div />
                    <span className='text--t3'>{discount.total.toLocaleString()} ₽</span>
                </div>
                <motion.div animate={animateSubs} initial={{ height: 0 }} className={`${style.totalLineSubs}`}>
                    {discount.detail && discount.detail.length
                        ? discount.detail.map(detail => (
                            <div key={detail.name} className={`${style.totalLine}`}>
                                <span className='text--t4'>{detail.name}</span>
                                <div />
                                <span className='text--t3'>{detail.summ.toLocaleString()} ₽</span>
                            </div>
                        )) : null}
                </motion.div>
                <div className='text--right pb-2'>
                    <div className='pt-1 text--t4'>Итого</div>
                    <div className='pt-0.5 text--a3 text--bold'>{summ.toLocaleString()} ₽</div>
                    <div data-is-hidden={!bonuses} className='text--t4 pt-1'>
                        <span>Вернется Red-баллов&nbsp;</span>
                        <span>{bonuses}&nbsp;</span>
                        <span>
                            <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.57836 7.0967L10.6765 11.5H8.57483L5.69413 7.26162H3.42942V11.5H1.61766V7.27377L0.00632882 7.28115L-0.000732422 5.82955L1.61766 5.82215V0.5H6.70872C9.00966 0.5 10.5859 1.85232 10.5859 3.88081C10.5859 5.85982 9.11836 6.91529 7.57836 7.0967ZM6.47319 5.81034C7.77766 5.81034 8.71978 5.03523 8.71978 3.88081C8.71978 2.72639 7.77766 1.95127 6.47319 1.95127H3.42942V5.81034H6.47319Z" fill="#E21B25" />
                            </svg>
                        </span>
                    </div>
                </div>

                <InfoNotify text='Выбрать способ доставки, списать Red-баллы и узнать конечную стоимость вы сможете при оформлении заказа на следующем шаге.' />

                <div ref={refButton} className='btn btn--lg btn--primary btn--fill mt-2.5'>
                    <span className='text--upper text--p5 text--sparse text--bold'>Оформить заказ</span>
                </div>
            </div>
        </div>
    )
}

function BasketTotalEmpty({ summ }) {

    return (
        <div data-active={!summ} className={`${style.totalEmpty}`}>
            <div className={`${style.totalContainer}`}>
                <div className='text--t1 pt-2.5'>Сумма корзины</div>
                <div className='text--t4 text--color-small pt-2.5'>Выберите хотя бы один товар, чтобы произвести расчет стоимости заказа</div>
                <div className='btn btn--lg btn--grey is-decorative btn--fill mt-2.5'>
                    <span className='text--upper text--p5 text--sparse text--bold'>Оформить заказ</span>
                </div>
            </div>
        </div>
    )
}