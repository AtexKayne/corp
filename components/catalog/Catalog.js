import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { globalState } from '../../components/helpers/globalState'
import { cards } from '../../components/helpers/constants'

import Image from 'next/image'
import Icon from '../../components/Icon'
import style from './Catalog.module.scss'
import Card from '../usefull/ui/Card/Card'
import Dropdown from '../../components/usefull/Dropdown'
import Favourite from '../../components/usefull/Favourite'
import InputRange from '../../components/usefull/form/InputRange'
import ColorPicker from '../../components/usefull/form/ColorPicker'
import ItemsPicker from '../../components/usefull/form/ItemsPicker'
import InputSwitch from '../../components/usefull/form/InputSwitch'
import ItemChecker from '../../components/usefull/form/ItemChecker'
import CatalogFilters from '../usefull/filters/CatalogFilters'

export default function Catalog({ detail }) {
    const info = detail.currentCategory
    const isBrands = detail.isBrands || detail.isPromo
    const [products, setProducts] = useState('updated')
    const [filters, setFilters] = useState(info.filter)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const refNav = useRef(null)

    const updateProducts = () => {
        setProducts('updated')
        setTimeout(() => setProducts(cards), 1500)
    }

    const openFilters = event => {
        event.preventDefault()
        globalState.body.addClass('overflow-hidden')
        setIsFilterOpen(true)
    }

    const sortHandler = data => {

    }

    useEffect(() => {
        setProducts(cards)
    }, [])

    return (
        <>
            <Head info={info} isBrands={isBrands} isPromo={detail.isPromo} categoryName={info.name} />
            
            <div className={style.navContainer}>
                {isBrands ? null : <FastFilter />}

                <div ref={refNav} className={`${style.nav} pb-2`}>
                    <div className={`${style.navInner}`}>
                        <div className={style.navFiller} />
                        <div className='is-hidden--lg-down text--t5 text--bold text--upper text--color-small'>НАЙДЕНО 668 ТОВАРОВ</div>
                        <Dropdown title='Популярные' external='text--t5 text--bold text--upper' afterChose={sortHandler}>
                            <>
                                <span data-value='popular' data-active='true' className='text--t4'>Популярные</span>
                                <span data-value='new' className='text--t4'>Новинки</span>
                                <span data-value='price-down' className='text--t4'>Цена по возрастанию</span>
                                <span data-value='price-up' className='text--t4'>Цена по убыванию</span>
                            </>
                        </Dropdown>
                        <a href='#' onClick={openFilters}>
                            <span className='text--t5 link text--bold text--upper'>фильтры</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className={style.container}>
                <div style={{ width: '100%' }} className='d-flex flex--column'>
                    <PreviousButton />

                    <CardList products={products} />

                    <Pagination />
                </div>
            </div>
            
            <CatalogFilters filters={filters} setFilters={setFilters} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
        </>
    )
}

function Head({ categoryName, isBrands, isPromo, info }) {
    const [imageLogo, setImageLogo] = useState('/icons/icon-empty.svg')
    const [imageOverlay, setImageOverlay] = useState(null)
    const [themeHead, setThemeHead] = useState('ui-light')

    useEffect(() => {
        if (isBrands) {
            setImageOverlay(info.img_big ? info.img_big : false)
            setImageLogo(info.logo)
            if (info.theme === 'dark') {
                globalState.header.setTheme('ui-dark')
                setThemeHead('ui-dark')
            }
        }
    }, [info])

    const openDescription = () => {
        const template = isPromo ? 'promoAbout' : 'brandAbout'
        // Здесь были непонятки с передаваемым именем.
        globalState.modal.open(template, false, { name: info.name })
    }

    if (isBrands) {
        return (
            <div className={`${themeHead} ${imageOverlay ? 'mb-2 mb-3.5:md mb-4:lg mb-5:xl mb-6:xxxl' : 'mb-1.5 mb-2:md mb-3:xxl'}`}>
                {imageOverlay
                    ? <div className={`${style.imageOverlay} ${categoryName.length >= 20 ? style.imageOverlayFull : ''}`}>
                        <Image src={imageOverlay} layout='fill' alt={info.name} />
                    </div> : null
                }

                <div className={style.brandHead}>
                    {imageOverlay
                        ? null
                        : <div className='mr-1.5 px-1 py-1 is-hidden--lg-down'><Image src={imageLogo} width='100' height='100' alt={info.name} /></div>
                    }
                    <div className={style.brandInfo}>
                        {isPromo
                            ? null
                            : <h2 className={`${style.brandDescription} text--p2 text--normal mb-0.6:xl mb-1.5:xxxl is-hidden--lg-down`}>{info.description}</h2>
                        }

                        <div className={`${style.head} ${isPromo ? 'mb-0.5 mb-1:xl' : 'mb-0.5 mb-0.6:xl mb-1.5:xxxl'}`}>
                            <div className={`${style.title}`}>
                                <h1 className={`text--a2 text--bold is-decorative`}>{categoryName}</h1>
                            </div>
                            <div className={style.headAddition}>
                                {categoryName === 'Sensido' ? <ColorCircle /> : null}

                                <Share isPromo={isPromo} isBrands={isBrands} name={info.name} />
                            </div>

                            {categoryName === 'Sensido' ? <ColorCircle isFullSize={true} /> : null}
                        </div>

                        {!isPromo
                            ? null
                            : <h2 className={`${style.brandDescription} text--p2 text--normal mb-0.6:xl mb-1.5:xxxl is-hidden--lg-down`}>{info.description}</h2>
                        }

                        <div onClick={openDescription} className={`${style.aboutBrand} text--t5 text--upper text--bold is-hidden--sm-down`}>{isPromo ? 'Подробнее' : 'Подробнее о бренде'}</div>
                        <div onClick={openDescription} className={`${style.aboutBrand} text--t6 text--upper text--bold is-hidden--md-up`}>{isPromo ? 'Подробнее' : 'Подробнее о бренде'}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`${style.head} row mb-2 pt-1.5`}>

                <div className={`${style.title}`}>
                    <h1 className={`text--a2 text--bold`}>{categoryName}</h1>
                </div>

                {info ? <Share isBrands={isBrands} name={info.name} /> : null}
            </div>
        )
    }
}

function ColorCircle({ isFullSize = false }) {
    const [isOnboard, setIsOnboard] = useState(false)

    const onboard = () => {
        document.querySelector(`.${style.head}`).style.position = 'unset'
        document.querySelector(`.${style.brandHead}`).style.position = 'unset'
        setIsOnboard(true)
    }

    const openColors = event => {
        setIsOnboard(false)
        if (event.target.closest(`.${style.onboard}`)) return
        globalState.modal.open('colorCircle', true)
    }

    useEffect(() => {
        setTimeout(onboard, 600)
    }, [])

    if (isFullSize) {
        return (
            <div className={`${style.colorCircleBtn} is-hidden--lg-down`}>
                <div onClick={openColors} className='btn btn--grey'>
                    <div data-onboard={isOnboard} className={`${style.colorCircle} mr-0.8`}>
                        <div onClick={() => setIsOnboard(false)} className={style.onboard}>
                            <div className={`${style.onboardText} text--p4 text--normal`}>Нажмите на иконку, чтобы открыть цветовой круг Освальда для бренда SensiDO</div>
                            <div className={`${style.onboardLink} text--t5 text--bold text--upper`}>Понятно</div>
                        </div>
                        <div className={style.colorIcon}>
                            <Image src='/images/brands/icon-colors.png' width='20' height='20' alt='color picker' />
                        </div>
                    </div>

                    <span className='text--t5'>Цветовой круг SensiDO</span>
                </div>
            </div>
        )
    } else {
        return (
            <div data-onboard={isOnboard} className={`${style.colorCircle} is-hidden--xl-up ml-1:xl`}>
                <div onClick={() => setIsOnboard(false)} className={style.onboard}>
                    <div className={`${style.onboardText} text--p4 text--normal`}>Нажмите на иконку, чтобы открыть цветовой круг Освальда для бренда SensiDO</div>
                    <div className={`${style.onboardLink} text--t5 text--bold text--upper`}>Понятно</div>
                </div>
                <div onClick={openColors} className={style.colorIcon}>
                    <Image src='/images/brands/icon-colors.png' width='20' height='20' alt='color picker' />
                </div>
            </div>
        )
    }
}

function FastFilter({ items, updated }) {
    const scrollPixels = 200
    const refWrapper = useRef(0)
    const refInner = useRef(null)
    const refScrollPos = useRef(0)
    const refScrollLimit = useRef(2)
    const refScrollOfset = useRef(0)
    const refTimestamp = useRef(false)
    const refIsStartDrag = useRef(false)
    const animateInner = useAnimationControls()
    const [position, setPosition] = useState(false)
    const [activeFilter, setActiveFilter] = useState(false)
    const [dragConstraints, setDragConstraints] = useState(0)

    const itemList = [
        'Ножевые блоки',
        'Ножевые блоки 2',
        'Насадки на машинки',
        'Насадки на машинки 2',
        'Машинки для стрижки',
        'Уход за бородой и усами',
        'Уход за бородой и усами 2',
        'Спрей и жидкость для ножей',
        'Спрей и жидкость для ножей 2',
    ]

    const scrollTo = to => {
        if (to == 'prev') {
            refScrollPos.current = refScrollPos.current - refScrollOfset.current
            animateInner.start({ x: -refScrollPos.current, transition: { duration: 0.5, ease: 'easeInOut' } })
            if (refScrollPos.current <= scrollPixels) {
                animateInner.start({ x: 0, transition: { duration: 0.4, ease: 'easeInOut' } })
                refScrollPos.current = 0
                return setPosition('start')
            }
        } else {
            refScrollPos.current = refScrollPos.current + refScrollOfset.current
            animateInner.start({ x: -refScrollPos.current, transition: { duration: 0.5, ease: 'easeInOut' } })
            if (refScrollPos.current >= -(dragConstraints + scrollPixels)) {
                animateInner.start({ x: dragConstraints, transition: { duration: 0.4, ease: 'easeInOut' } })
                refScrollPos.current = -dragConstraints
                return setPosition('end')
            }
        }
        setPosition(false)
    }

    const dragStartHandler = () => {
        setPosition('none')
        refIsStartDrag.current = true
    }

    const dragEndHandler = () => {
        setTimeout(() => refIsStartDrag.current = false, 200)
        setTimeout(() => {
            const transform = refInner.current.style.transform
            const position = +transform.split('translateX(')[1].split('px)')[0]
            if (transform === 'none' || position >= 0) {
                refScrollPos.current = 0
                return setPosition('start')
            } else if (position <= dragConstraints + 50) {
                refScrollPos.current = -dragConstraints
                return setPosition('end')
            } else {
                refScrollPos.current = -position
                return setPosition(false)
            }
        }, 400)
    }

    const calculateScroll = () => {
        let dragWidth = 0
        const ww = window.innerWidth
        if (ww < globalState.sizes.sm) dragWidth = 24
        else if (ww >= globalState.sizes.sm && ww < globalState.sizes.lg) dragWidth = 32
        else dragWidth = 8

        const innerElements = Array.from(refInner.current.childNodes)
        innerElements.forEach(el => dragWidth += el.clientWidth + 8)
        setDragConstraints(refWrapper.current.clientWidth - dragWidth)
    }

    const clickHandler = index => {
        if (refIsStartDrag.current) return
        if (index === activeFilter) setActiveFilter(() => {
            setTimeout(calculateScroll, 400)
            return false
        })
        else setActiveFilter(() => {
            setTimeout(calculateScroll, 400)
            return index
        })
    }

    useEffect(() => {
        setTimeout(() => {
            const scrollWidth = refWrapper.current.scrollWidth
            const clientWidth = refWrapper.current.clientWidth

            if (scrollWidth > clientWidth) {
                let dragWidth = 0
                const ww = window.innerWidth
                if (ww < globalState.sizes.sm) dragWidth = 24
                else if (ww >= globalState.sizes.sm && ww < globalState.sizes.lg) dragWidth = 32
                else dragWidth = 8

                const innerElements = Array.from(refInner.current.childNodes)
                innerElements.forEach(el => dragWidth += el.clientWidth + 8)
                setDragConstraints(refWrapper.current.clientWidth - dragWidth)

                refScrollLimit.current = Math.floor((dragWidth - clientWidth) / scrollPixels)
                refScrollOfset.current = (dragWidth - clientWidth) / refScrollLimit.current
                animateInner.start({ x: 0 })
                refScrollPos.current = 0
                setPosition('start')
            } else setPosition('none')
        }, 2500)
    }, updated)

    return (
        <div className={style.fastFilterContainer}>
            <div onClick={() => scrollTo('prev')} data-position={position === 'start' || position === 'none'} className={style.fastFilterPrev}>
                <Icon name='chevronLeft' width='18' height='18' />
            </div>

            <div ref={refWrapper} className={style.fastFilterWrapper}>
                <motion.div
                    drag='x'
                    ref={refInner}
                    animate={animateInner}
                    onDragEnd={dragEndHandler}
                    onDragStart={dragStartHandler}
                    className={style.fastFilterInner}
                    dragConstraints={{ right: 0, left: dragConstraints }}>
                    {itemList.map((item, index) => (
                        <div
                            key={item}
                            data-active={index === activeFilter}
                            onClick={() => clickHandler(index)}
                            className={`${style.fastFilterItem} text--p5 text--upper`}>{item}
                        </div>
                    ))}
                </motion.div>
            </div>

            <div onClick={() => scrollTo('next')} data-position={position === 'end' || position === 'none'} className={style.fastFilterNext}>
                <Icon name='chevronRight' width='18' height='18' />
            </div>
        </div>
    )
}

function Share({ name, isPromo, isBrands }) {
    const [isOpen, setIsOpen] = useState(false)

    const info = {
        primary: `${isBrands ? 'Бренд' : 'Раздел'} ${name}`,
        image: false,
    }

    const documentClick = () => {
        setIsOpen(false)
        document.removeEventListener('click', documentClick)
    }

    const open = () => {
        if (isOpen) {
            setIsOpen(false)
            document.removeEventListener('click', documentClick)
        } else {
            setIsOpen(true)
            setTimeout(() => document.addEventListener('click', documentClick), 200)
        }
    }

    const copyHandler = () => {
        setIsOpen(false)
        globalState.popover.open([`${isBrands ? 'Бренд' : 'Раздел'} ${name}`, 'ссылка скопирована в буфер обмена'], false)
    }

    return (
        <div data-open={isOpen} className={`${style.share}`}>
            {!isPromo
                ? <div className={style.favourite}>
                    <Favourite width='24' height='21' info={info} />
                </div> : <div className='mr-1.5:xl' />
            }

            <div onClick={open} className={`${style.iconShare} is-hidden--sm-down`}>
                <Icon name='share' width='24' height='24' />
            </div>
            <div className={`${style.additionalShare} ui-light is-hidden--sm-down`}>
                <div className={`${style.iconShare} btn btn--grey btn--xs`}>
                    <Icon name='VK' width='15' height='15' />
                </div>
                <div className={`${style.iconShare} btn btn--grey btn--xs`}>
                    <Icon name='telegram' width='15' height='15' />
                </div>
                <div onClick={copyHandler} className={`${style.iconShare} btn btn--grey btn--xs`}>
                    <Icon name='link' width='15' height='15' />
                </div>
            </div>
        </div>
    )
}

function PreviousButton({ isPrevButton = true }) {
    return (
        <div data-hidden={!isPrevButton} className={`${style.previousButton} btn btn--primary`}>
            <span className='text--upper text--p5 text--sparse text--bold'>показать предыдущие</span>
        </div>
    )
}

function Pagination({ }) {
    const countSelect = () => {

    }
    return (
        <div className={`${style.pagination}`}>
            <div className={`${style.showBtn} btn btn--primary btn--fill`}>
                <span className='text--upper text--p5 text--sparse text--bold'>показать еще</span>
            </div>

            <div className={style.paginationNav}>
                <div className='d-flex'>
                    <span className='text--upper text--p6 mr-0.5'>показывать по</span>
                    <Dropdown title='24' external='text--upper text--p5 text--bold' afterChose={countSelect}>
                        <>
                            <span data-value='24' data-active='true' className='text--t4'>24</span>
                            <span data-value='36' className='text--t4'>36</span>
                            <span data-value='48' className='text--t4'>48</span>
                        </>
                    </Dropdown>
                </div>
                <div className={style.paginationPages}>
                    <div data-active='true'>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div><Icon name='chevronRight' width='18' height='18' /></div>
                </div>
            </div>
        </div>
    )
}

function CardList({ products }) {
    const fillers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    if (products === 'updated') {
        return (
            <div className={style.cardsContainer}>
                {fillers.map(product => (
                    <div key={product} className={style.cardFiller}>
                        <div className={style.cardFillerImage} />
                        <div className={style.cardFillerText} />
                        <div className={style.cardFillerText} />
                        <div className={style.cardFillerText} />
                        <div className={style.cardFillerButton} />
                        <div className={style.cardFillerAnimatron} />
                    </div>
                ))}
            </div>
        )
    }

    if (!products || !products.length) return null

    return (
        <div className={style.cardsContainer}>
            {products.map(product => (
                <div key={product.id} className={style.cardWrapper}>
                    <Card info={product} />
                </div>
            ))}
        </div>
    )
}
