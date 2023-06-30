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
import Icon from '../../Icon'
import InfoNotify from '../ui/InfoNotify/InfoNotify'
import Link from 'next/link'
import Delivery from '../ui/Delivery/Delivery'
import Odometer from '../ui/Odometer/Odometer'
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

        return () => {
            const close = document.querySelector('.modal__close')
            if (close) {
                close.style.position = ''
                close.style.right = ''
            }
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
                Вы можете посмотреть <a href='/catalog/main'>новые товары</a>, <a href='/catalog/main'>наши хиты</a>, ознакомиться с <a href='/catalog/main'>брендами</a>.
                Или поискать что-нибудь в <a href='/catalog/main'>каталоге</a>.
            </div>

            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3, delay: 0.7, ease: 'easeOut' }}>
                <CardSlider items={cards} title='Недавно просмотрено' />
            </motion.div>
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
    const [bonuses, setBonuses] = useState(0)
    const [summ, setSumm] = useState(0)
    const animateNotification = useAnimationControls()
    // @TODO Убрать это дерьмо. Не знаю, почему работает корректно только с ним
    const animationPath = useAnimationControls()
    const refDeletedItemNode = useRef(null)
    const refInputWrapper = useRef(null)
    const refTimerSvg = useRef(null)
    const refDeletedItem = useRef(0)
    const refItemsInfo = useRef([])
    const refInputs = useRef(false)
    const refSlider = useRef(null)
    const isInView = useInView(refSlider)

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
            const priceOld = curr.item.price.old ?? 0
            const detailDiscount = curr.item.discount
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
        if (!refItemsInfo.current[index]) return
        refItemsInfo.current[index].isDeleted = true
        if (refItemsInfo.current[index].isSelected) {
            // refItemsInfo.current[index].isSelected = false
            // const checkbox = refDeletedItemNode.current.querySelector(`.${style.cheker}`)
            // checkbox.children[0].click()
        }
    }

    const selectHandler = item => {
        const index = refItemsInfo.current.findIndex(element => element.item.id === item.id)
        let newChecked = false
        let isAllSelected = true
        let isOneSelected = false
        refItemsInfo.current[index].isSelected = !refItemsInfo.current[index].isSelected

        refInputs.current.forEach(input => {
            if (input.checked) isOneSelected = true
            else isAllSelected = false
        })

        if (isAllSelected) newChecked = true
        else if (isOneSelected) newChecked = 'partial'
        else newChecked = false

        setIsChecked(newChecked)
        updateSumm()
    }

    const selectAllHandler = () => {
        if (isChecked && isChecked !== 'partial') {
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
        if (refItemsInfo.current[index]) {
            refItemsInfo.current[index].isDeleted = false
            if (refItemsInfo.current[index].count === 0) {
                const button = refDeletedItemNode.current.querySelector('.js-button')
                button.click()
            }
            updateSumm()
            updateItemsCount()
        }
        setReturnedItem(refDeletedItem.current)
        await animateNotification.start({ opacity: 0, y: 500, transition: { duration: 0.3 } })
        refDeletedItem.current = false
        setReturnedItem(false)
    }

    const removeItemFromList = () => {
        if (!refDeletedItem.current) return false
        setItems(prev => {
            const filtered = prev.filter(element => {
                const equalId = element.id !== refDeletedItem.current.id
                return equalId
            })
            return filtered
        })
    }

    const deleteAnimation = async () => {
        refTimerSvg.current.classList.remove(style.animated)
        animationPath.start({ pathLength: 1, transition: { duration: 0 } })
        const yPosition = !!summ && !isShownBasket ? -140 : -60
        await animateNotification.start({ opacity: 0, y: 500, transition: { duration: 0.3 } })
        await animateNotification.start({ opacity: 1, y: yPosition, transition: { duration: 0.6 } })
        refTimerSvg.current.classList.add(style.animated)
        animateNotification.start({ opacity: 0, y: 500, transition: { duration: 0.3, delay: 4.8 } })
        await animationPath.start({ pathLength: 0, transition: { duration: 5.2 } })
        refTimerSvg.current.classList.remove(style.animated)
        return animationPath.start({ pathLength: 1, transition: { duration: 0 } })
    }

    const deleteItem = async (item, node, isImmidiatly) => {
        removeItemFromList()
        refDeletedItem.current = item
        refDeletedItemNode.current = node
        removeItem()
        updateSumm()
        updateItemsCount()
        if (isImmidiatly) await deleteAnimation()
        removeItemFromList()
        refDeletedItem.current = false
        refDeletedItemNode.current = null
    }

    const updateItems = newItems => {
        const newLackItems = []
        newItems.forEach(item => {
            if (!!item.max) {
                const price = '' + item.price.actual
                const info = {
                    item,
                    isDeleted: false,
                    isSelected: false,
                    count: item.basket,
                    bonuses: item.bonuses ?? 0,
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
        // updateItems(items)
        setTimeout(selectAllHandler, 600)
    }, [])

    useEffect(() => {
        if (refItemsInfo.current.length) {
            setLackItems(items.filter(item => item.max === 0))
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

                <div className='p-relative'>
                    <div data-is-invisible={productsText === '0 товаров'} className={`${style.countText} text--a6 text--color-small`}>
                        {productsText}
                    </div>
                    <div data-is-invisible={productsText === '0 товаров'} className={`${style.checker}`}>
                        <InputSelectAll isChecked={isChecked} onAfterComplete={selectAllHandler} text='Выбрать все' />
                    </div>
                    <div ref={refInputWrapper}>
                        {items.map(item => {
                            if (item.max !== 0) {
                                return <ProductCard
                                    item={item}
                                    key={item.id}
                                    deleteItem={deleteItem}
                                    returnedItem={returnedItem}
                                    onChangeCount={changeCount}
                                    selectHandler={selectHandler} />
                            }
                        })}
                    </div>

                    <div data-is-invisible={productsText !== '0 товаров'} className={`${style.filledEmptyText} text--color-small`}>
                        Все товары из вашей корзины закончились. Нажмите на «Сообщить» у нужных позиций, и мы уведомим вас об их поступлении. А пока подберите аналоги в каталоге.
                    </div>
                </div>


                <BasketLackItems deleteItem={deleteItem} returnedItem={returnedItem} lackItems={lackItems} setItems={setItems} setLackItems={setLackItems} />

                <BasketTotalEmpty summ={summ} />

                <BasketTotal
                    summ={summ}
                    bonuses={bonuses}
                    discount={discount}
                    productsText={productsText}
                    setIsShownBasket={setIsShownBasket} />

                <div ref={refSlider} className={style.slider}>
                    <CardSlider items={cards} title='Добавьте к заказу' />
                </div>
            </div>


            <motion.div animate={animateNotification} initial={{ y: 400, opacity: 0 }} className={style.deleteNotification}>
                <div ref={refTimerSvg} className={style.deleteTimer}>
                    <svg>
                        <circle cx="50%" cy="50%" r="13" pathLength="1" />
                    </svg>
                </div>
                <motion.div animate={animationPath} initial={{ pathLength: 1 }} className={`${style.deleteNotificationText} text--t5`}>
                    Товар удалён
                </motion.div>

                <div onClick={returnHandler} className={`${style.deleteNotificationReturn} text--sparse`}>
                    вернуть обратно
                </div>
            </motion.div>

            <div data-active={!!summ && !isShownBasket && !isInView} className={`${style.basketMenu}`}>
                <div className={`${style.basketPrice}`}>
                    <div className='text--p4'>Итого</div>
                    <div className='text--nowrap text--p1 text--bold'>
                        <Odometer number={summ} count={6} />
                        <span style={{ transform: 'scale(0.95) translateY(-15px)' }} className='rub'>&nbsp;₽</span>
                    </div>
                </div>
                <div className={`${style.showBtn} btn btn--lg btn--primary btn--fill`}>
                    <span className='text--upper text--p5 text--sparse text--bold'>Оформить заказ</span>
                    <span className='text--upper text--p5 text--sparse text--bold'>Оформить</span>
                </div>
            </div>
        </div>
    )
}

function BasketLackItems({ lackItems, setLackItems, setItems, deleteItem, returnedItem }) {
    const animateWrapper = useAnimationControls()
    const removeHandler = () => {
        setTimeout(() => {
            animateWrapper.start({ height: 0, paddingTop: 0, opacity: 0, transition: { duration: 0.4 } }).then(() => {
                setLackItems([])
                setItems(prev => prev.filter(item => item.max !== 0))
            })
        }, 450)
    }

    return (
        <motion.div data-is-hidden={!lackItems.length} animate={animateWrapper} initial={{ height: 'auto' }} className={`is-overflow-hidden pt-2.5`}>
            <div className={style.lackDeleteTitle}>
                <div className='text--t1'>Нет в наличии</div>
                <div onClick={removeHandler} className='text--t6 text--upper text--color-primary c-pointer'>Удалить все</div>
            </div>
            {lackItems.map(item => {
                return <ProductCard
                    item={item}
                    key={item.id}
                    deleteItem={deleteItem}
                    onChangeCount={() => { }}
                    returnedItem={returnedItem}
                    selectHandler={false} />
            })}
        </motion.div>
    )
}

function ProductCard({ item, selectHandler, returnedItem, deleteItem, onChangeCount }) {
    const animationProduct = useAnimationControls()
    const [isControlOpen, setIsControlOpen] = useState(false)
    const [isFavourite, setIsFavourite] = useState('В избранное')
    const refItem = useRef(null)

    const favouriteHandler = event => {
        const target = event.target.children[0]
        if (target && typeof target.click === 'function') {
            target.click()
            const newFavourite = isFavourite === 'В избранное'
                ? 'В избранном'
                : 'В избранное'
            setIsFavourite(newFavourite)
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
        if (count === 0) deleteHandler()
        onChangeCount(count, val, getItem)
    }

    const deleteHandler = async () => {
        deleteItem(item, refItem.current, selectHandler !== false)
        await animationProduct.start({ opacity: 0 })
        await animationProduct.start({ height: 0, marginTop: 0, paddingTop: 0 })
    }

    const onChangeHandler = () => {
        if (selectHandler === false) return
        selectHandler(item)
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
                    <span className='text--t4 is-decorative'>{isFavourite}</span>
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
                <InputCheckbox external={`${style.checkbox} ${selectHandler === false ? style.checkboxDisabled : ''}`} onAfterComplete={onChangeHandler} />
                <Card info={item} mode='inline' onChangeCount={onChangeCountHandler} />
            </div>
        </motion.div>
    )
}

function BasketTotal({ summ, discount, productsText, bonuses, setIsShownBasket }) {
    const [isOpen, setIsOpen] = useState(false)
    const refButton = useRef(null)
    const isInView = useInView(refButton)
    const animateSubs = useAnimationControls()
    const animateWrapper = useAnimationControls()
    const toggleHandler = () => {
        const height = isOpen ? '0' : 'auto'
        animateSubs.start({ height, transition: { duration: 0.3, ease: 'easeInOut' } })
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setIsShownBasket(isInView)
    }, [isInView])

    useEffect(() => {
        const height = !summ ? 0 : 'auto'
        const opacity = !summ ? 0 : 1
        const delay = !!summ ? 0.3 : 0
        animateWrapper.start({ height: height, opacity, transition: { duration: 0.3, delay } })
    }, [summ])

    return (
        <motion.div animate={animateWrapper} className={`${style.total}`}>
            <div className='text--t1 pt-2.5'>Сумма корзины</div>
            <div className={`${style.totalContainer} pt-1`}>
                <div className={`${style.totalLine}`}>
                    <span className='text--t4'>{productsText}</span>
                    <div />
                    <span className='text--t3'>{summ.toLocaleString()} <span className='rub'> ₽</span></span>
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
                    <span className='text--t3'>– {discount.total.toLocaleString()} <span className='rub'> ₽</span></span>
                </div>
                <motion.div animate={animateSubs} initial={{ height: 0 }} className={`${style.totalLineSubs}`}>
                    {discount.detail && discount.detail.length
                        ? discount.detail.map(detail => (
                            <div key={detail.name} className={`${style.totalLine}`}>
                                <span className='text--t4'>{detail.name}</span>
                                <div />
                                <span className='text--t3'>– {detail.summ.toLocaleString()} <span className='rub'> ₽</span></span>
                            </div>
                        )) : null}
                </motion.div>
                <div className='text--right pb-2'>
                    <div className='pt-1.5 text--t4'>Итого</div>
                    <div className='pt-0.5 text--a3 text--bold'>{summ.toLocaleString()} <span className='rub'> ₽</span></div>
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
        </motion.div>
    )
}

function BasketTotalEmpty({ summ }) {
    const animateWrapper = useAnimationControls()

    useEffect(() => {
        const height = !!summ ? 0 : 'auto'
        const opacity = !!summ ? 0 : 1
        const delay = !summ ? 0.3 : 0
        animateWrapper.start({ height: height, opacity, transition: { duration: 0.3, delay } })
    }, [summ])

    return (
        <motion.div animate={animateWrapper} className={`${style.totalEmpty}`}>
            <div className={`${style.totalContainer}`}>
                <div className='text--t1 pt-2.5'>Сумма корзины</div>
                <div className='text--t4 text--color-small pt-2.5'>Выберите хотя бы один товар, чтобы произвести расчет стоимости заказа</div>
                <div className='btn btn--lg btn--grey is-decorative btn--fill mt-2.5'>
                    <span className='text--upper text--p5 text--sparse text--bold'>Оформить заказ</span>
                </div>
            </div>
        </motion.div>
    )
}