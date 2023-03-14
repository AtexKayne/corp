import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { debounce } from '../../components/helpers/debounce'
import { motion, useAnimationControls } from 'framer-motion'
import { globalState } from '../../components/helpers/globalState'
import { cards, filters } from '../../components/helpers/constants'
import style from '../../styles/module/Catalog/Catalog.module.scss'

import Link from 'next/link'
import Image from 'next/image'
import Icon from '../../components/Icon'
import Card from '../../components/product/Card'
import MainLayout from '../../layout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import Dropdown from '../../components/usefull/Dropdown'
import Favourite from '../../components/usefull/Favourite'
import InputRange from '../../components/usefull/form/InputRange'
import ColorPicker from '../../components/usefull/form/ColorPicker'
import ItemsPicker from '../../components/usefull/form/ItemsPicker'
import InputSwitch from '../../components/usefull/form/InputSwitch'
import ItemChecker from '../../components/usefull/form/ItemChecker'

export default function Catalog({ detail }) {
    const c = detail.currentCategory
    const isBrands = detail.isBrands || detail.isPromo
    const [countSelectedFilters, setCountSelectedFilters] = useState(0)
    const [isSidebarHidden, setIsSidebarHidden] = useState('new')
    const [activeCategory, setActiveCategory] = useState(c.id)
    const [selectedFilter, setSelectedFilter] = useState({})
    const [categoryName, setCategoryName] = useState(c.name)
    const [titleOpacity, setTitleOpacity] = useState(false)
    const [isPrevButton, setIsPrevButton] = useState(true)
    const [products, setProducts] = useState('updated')
    const [filters, setFilters] = useState(c.filter)
    const [info, setInfo] = useState(c)
    const refCategories = useRef(null)
    const refIsToggled = useRef(false)
    const refTimeout = useRef(false)
    const refNav = useRef(null)
    const router = useRouter()

    const updateProducts = () => {
        setProducts('updated')
        setTimeout(() => setProducts(cards), 1500)
    }

    const documentClickHandler = event => {
        const parent = event.target.closest(`.${style.wrapper}`)
        if (!parent) {
            setIsSidebarHidden(true)
            document.removeEventListener('click', documentClickHandler)
        }
    }

    const toggleSidebar = () => {
        const filler = refNav.current.querySelector(`.${style.navFiller}`)
        const selector = refNav.current.querySelector(`.${style.selector}`).childNodes[0]
        filler.style.width = `${selector.clientWidth + 16}px`

        if (window.innerWidth < globalState.sizes.xl && isSidebarHidden) {
            setTimeout(() => {
                document.addEventListener('click', documentClickHandler)
            }, 100);
        }

        refIsToggled.current = !isSidebarHidden
        setIsSidebarHidden(!isSidebarHidden)
    }

    const routerPush = url => {
        const link = url.includes('catalog/') ? url.split('catalog/')[1] : url
        router.push(link, undefined, { scroll: false })
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const closeWrapper = () => {
        if (window.innerWidth >= globalState.sizes.xl) return
        setTimeout(() => setIsSidebarHidden(true), 600)
    }

    const updateCategoryName = name => {
        setTitleOpacity(true)
        setTimeout(() => {
            setCategoryName(name)
            setTitleOpacity(false)
        }, 300)
    }

    const selectCategory = info => {
        refCategories.current.style.pointerEvents = 'none'
        setInfo(info)
        setActiveCategory(info.id)
        updateCategoryName(info.name)
        setFilters(info.filter)
        routerPush(info.url)
        updateProducts()
        // closeWrapper()
        setTimeout(() => refCategories.current.style.pointerEvents = '', 1500)
    }

    const resetSelection = () => {
        setActiveCategory(false)
        updateCategoryName('Каталог товаров')
        setFilters(false)
        routerPush('main')
        updateProducts()
        refCategories.current.querySelectorAll(`.${style.categoryWrapper}`).forEach(el => {
            el.setAttribute('data-selected', 'false')
        })
        const prevItem = refCategories.current.querySelector(`.${style.active}`)
        if (prevItem) prevItem.classList.remove(style.active)
    }

    const openFilters = event => {
        event.preventDefault()
        setFilters(() => {
            if (info.filter) {
                globalState.modal.setTemplate('filters')
                globalState.modal.setIsZero(true)
                globalState.modal.setData(info.filter)
                globalState.modal.setIsOpen(true)
                return info.filter
            } else return false
        })

    }

    const sortHandler = data => {
        if (!data) return
        const value = data.getAttribute('data-value')
        if (!value) return

        globalState.catalog.setSelectedFilter(prev => {
            const prevCopy = Object.assign({}, prev)
            prevCopy.sort = value
            return prevCopy
        })
    }

    const recursiveSelect = item => {
        const parent = item.parentElement
        if (parent.classList.contains(style.categoryWrapper)) {
            parent.setAttribute('data-selected', 'true')
            recursiveSelect(parent)
        }
    }

    const resizeHandler = () => {
        if (window.innerWidth < globalState.sizes.xl) setIsSidebarHidden(true)
        else setIsSidebarHidden(refIsToggled.current)
    }

    const debounceResize = debounce(resizeHandler, 400)

    useEffect(() => {
        globalState.catalog = {
            setSelectedFilter,
        }
        setProducts(cards)
        setIsSidebarHidden(window.innerWidth < globalState.sizes.xl)
        window.addEventListener('resize', debounceResize)

        if (!activeCategory || isBrands) return
        const active = refCategories.current.querySelector(`[data-id="${activeCategory}"]`)

        if (active) {
            refCategories.current.querySelectorAll(`.${style.categoryWrapper}`).forEach(el => {
                el.setAttribute('data-selected', 'none')
            })
            active.querySelector(`.${style.category}`).classList.add(style.active)
            active.setAttribute('data-selected', true)
            recursiveSelect(active)
            active.childNodes.forEach(el => {
                if (el.classList.contains(style.categoryWrapper)) {
                    el.setAttribute('data-selected', false)
                }
            })
        }

        // setIsPrevButton(globalState.path.length > 2 && globalState.path[globalState.path.length - 1].includes('/product/'))

        return () => {
            window.removeEventListener('resize', debounceResize)
        }
    }, [])

    useEffect(() => {
        globalState.catalog.selectedFilter = selectedFilter

        if (refTimeout.current) clearTimeout(refTimeout.current)
        refTimeout.current = setTimeout(() => {
            let countFilters = 0
            for (const key in globalState.catalog.selectedFilter) {
                if (Object.hasOwnProperty.call(globalState.catalog.selectedFilter, key)) {
                    const element = globalState.catalog.selectedFilter[key];
                    if (Array.isArray(element)) {
                        if (key !== 'price') {
                            if (element.length) countFilters++
                        } else {
                            if (element[0] !== 0 || element[1] !== 15000) countFilters++
                        }
                    }
                    if (element === true) countFilters++
                }
            }
            refTimeout.current = false
            setCountSelectedFilters(countFilters)
            updateProducts()
        }, 200)
    }, [selectedFilter])

    return (
        <>
            <Head
                info={info}
                isBrands={isBrands}
                isPromo={detail.isPromo}
                categoryName={categoryName}
                titleOpacity={titleOpacity}
                toggleSidebar={toggleSidebar}
                isSidebarHidden={isSidebarHidden} />

            <div className={style.navContainer}>
                {isBrands ? null : <FastFilter updated={[filters, info]} />}

                <div ref={refNav} className={`${style.nav} pb-2`}>
                    <SidebarHead activeCategory={activeCategory} toggleSidebar={toggleSidebar} isBrands={isBrands} />
                    <div data-toggled={isSidebarHidden && isSidebarHidden !== 'new'} className={`${style.navInner} pl-1:xl pr-1:xl`}>
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
                        <a
                            href='#'
                            onClick={openFilters}
                            style={{ display: filters ? 'block' : 'none' }}
                            className='is-hidden--xl-up'>
                            <span className='text--t5 link text--bold text--upper'>фильтры</span>
                            <span data-selected={!!countSelectedFilters} className={style.filterLinkIcon}>{countSelectedFilters}</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className={style.container}>
                <div data-hidden={isSidebarHidden} className={`${style.wrapper} ${isBrands ? style.wrapperBrand : ''}`}>
                    {!isBrands
                        ? <div ref={refCategories} className={`${style.categories}`} data-selected={!!activeCategory}>
                            <Addition />

                            <div onClick={resetSelection} className={`${style.catalogPrev} text--t4 text--bold`}>
                                <span>Каталог товаров</span>
                            </div>

                            <Categories categories={detail.categories} selectCategory={selectCategory} />
                        </div> : null
                    }

                    {filters && filters.length
                        ? <div className={style.filters}>
                            {
                                filters.map(filter => <Filter key={filter.id} name={filter.name} code={filter.code} />)
                            }
                        </div>
                        : null
                    }
                </div>

                <div style={{ width: '100%' }} className='d-flex flex--column'>
                    <div className={`${style.countItemsMob} is-hidden--xl-up text--t6 text--bold text--upper text--color-small`}>НАЙДЕНО 668 ТОВАРОВ</div>

                    <PreviousButton isPrevButton={isPrevButton} isSidebarHidden={isSidebarHidden} />

                    <CardList products={products} isSidebarHidden={isSidebarHidden} />

                    <Pagination isSidebarHidden={isSidebarHidden} />
                </div>
            </div>
        </>
    )
}

function Head({ toggleSidebar, isSidebarHidden, categoryName, titleOpacity, isBrands, isPromo, info }) {
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
        if (isPromo) {
            globalState.modal.setData({name: info.name})
            globalState.modal.setTemplate('promoAbout')
        } else globalState.modal.setTemplate('brandAbout')
        
        globalState.modal.setIsZero(false)
        globalState.modal.setIsOpen(true)
    }

    if (isBrands) {
        return (
            <div className={`${themeHead} ${imageOverlay ? 'mb-2 mb-3.5:md mb-4:lg mb-5:xl mb-6:xxxl' : 'mb-1.5 mb-2:md mb-3:xxl'}`}>
                {imageOverlay
                    ? <div className={style.imageOverlay}><Image src={imageOverlay} layout='fill' alt={info.name} /></div>
                    : null
                }

                <div className={style.brandHead}>
                    {imageOverlay
                        ? null
                        : <div className='mr-1.5 px-1 py-1 is-hidden--lg-down'><Image src={imageLogo} width='100' height='100' alt={info.name} /></div>
                    }
                    <div className={style.brandInfo}>
                        <h2 className={`${style.brandDescription} text--p2 text--normal mb-0.6:xl mb-1.5:xxxl is-hidden--lg-down`}>{info.description}</h2>

                        <div className={`${style.head} mb-0.5:md mb-0.6:xl mb-1.5:xxxl`}>
                            <div data-shown={!isSidebarHidden} data-opacity={titleOpacity} className={`${style.title}`}>
                                <h1 className={`text--a2 text--bold is-decorative`}>{categoryName}</h1>
                            </div>
                            <div className={style.headAddition}>
                                {categoryName === 'Sensido' ? <ColorCircle /> : null}

                                <Share isPromo={isPromo} isBrands={isBrands} name={info.name} />
                            </div>

                            {categoryName === 'Sensido' ? <ColorCircle isFullSize={true} /> : null}
                        </div>

                        <div onClick={openDescription} className={`${style.aboutBrand} text--t5 text--upper text--bold`}>{isPromo ? 'Подробнее' : 'Подробнее о бренде'}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`${style.head} row mb-2 pt-1.5`}>

                <div data-shown={!isSidebarHidden} data-opacity={titleOpacity} className={`${style.title}`}>
                    <h1 onClick={toggleSidebar} className={`text--a2 text--bold`}>{categoryName}</h1>
                    <Icon name='dropdown' external={`${style.titleArrow} is-hidden--xl-up`} width='20' height='20' />
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
        globalState.modal.setTemplate('colorCircle')
        globalState.modal.setIsZero(true)
        globalState.modal.setIsOpen(true)
    }

    useEffect(() => {
        setTimeout(onboard, 600)

        // To generate clipPath
        // const precision = 24;
        // const radius = 4;
        // const c = [...Array(precision)].map((_, i) => {
        //     const a = -i / (precision - 1) * Math.PI * 2;
        //     const x = Math.cos(a) * radius + 50;
        //     const y = Math.sin(a) * radius + 50;
        //     return `${x.toFixed(2).replace('.00', '')}% ${y.toFixed(2).replace('.00', '')}%`
        // })
        // console.log(`polygon(100% 50%, 100% 100%, 0 100%, 0 0, 100% 0, 100% 50%, ${c.join(',')})`);
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
        globalState.popover.setTextPrimary(`${isBrands ? 'Бренд' : 'Раздел'} ${name}`)
        globalState.popover.setTextSecondary('ссылка скопирована в буфер обмена')
        globalState.popover.setImage(false)
        globalState.popover.setIsBasket(false)
        globalState.popover.setIsOpen(true)
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

function Filter({ name, code }) {
    const { colors, brands, pitanie, proizvodstvo, ves, type } = filters
    const min = 0
    const max = 15000

    const [isOpen, setIsOpen] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState(0)

    const toggleHandler = () => {
        if (isOpen) {
            const values = globalState.catalog.selectedFilter[code]
            if (code !== 'market' && code !== 'available' && code !== 'price') {
                if (values && values.length) setSelectedFilters(values.length)
                else setSelectedFilters(0)
            } else if (code === 'price') {
                if (values && values.length && values[0] !== min && values[1] !== max)
                    setSelectedFilters(' ')
                else setSelectedFilters(0)
            }
        }

        setIsOpen(!isOpen)
    }

    if (code !== 'market' && code !== 'available' && code !== 'hits' && code !== 'discont') {
        return (
            <div data-open={isOpen} className={style.filter}>
                <div onClick={toggleHandler} className={style.filterHeader}>
                    <div className='text--t5 text--upper text--bold'>
                        <div className='p-relative'>
                            <span>{name}</span>
                            {selectedFilters !== 0
                                ? <span className={style.filterIcon}>{selectedFilters}</span>
                                : null
                            }

                        </div>
                    </div>
                    <Icon name='chevronUp' width='16' height='16' />
                </div>

                {code === 'price' ? <InputRange min={min} max={max} code={code} /> : null}
                {code === 'color' ? <ColorPicker colors={colors} code={code} /> : null}
                {code === 'brand' ? <ItemsPicker items={brands} code={code} /> : null}
                {code === 'pitanie' ? <ItemsPicker items={pitanie} code={code} /> : null}
                {code === 'proizvodstvo' ? <ItemsPicker items={proizvodstvo} code={code} /> : null}
                {code === 'weight_filter' || code === 'ves' ? <ItemsPicker items={ves} code={code} /> : null}
                {code === 'vid' ? <ItemsPicker items={type} code={code} /> : null}

            </div>
        )
    } else {
        return (
            <div className={style.checker}>
                {code === 'market' || code === 'available' || code === 'hits' || code === 'discont'
                    ? <ItemChecker text={name} code={code} /> : null
                }
            </div>
        )
    }
}

function Addition() {
    return (
        <div className={style.additional}>
            <Link href={`/catalog/hit`}>
                <a href={`/catalog/hit`} className='d-flex flex--align-center mb-2'>
                    <Image src='/images/catalog/categorys/hit-xs.svg' width='24' height='24' alt='Хиты' />
                    <div className='ml-0.5 pr-1:xxl col text--t4 d-flex flex--between flex--align-center'>
                        <span>Хиты</span>
                        <Icon external={style.categoryIcon} name='chevronRight' width='12' height='16' />
                    </div>
                </a>
            </Link>
            <Link href={`/catalog/new`}>
                <a href={`/catalog/new`} className='d-flex flex--align-center mb-2'>
                    <Image src='/images/catalog/categorys/new-xs.svg' width='24' height='24' alt='Новинки' />
                    <div className='ml-0.5 pr-1:xxl col text--t4 d-flex flex--between flex--align-center'>
                        <span>Новинки</span>
                        <Icon external={style.categoryIcon} name='chevronRight' width='12' height='16' />
                    </div>
                </a>
            </Link>
        </div>
    )
}

function Categories({ categories, selectCategory }) {
    if (!categories) return null
    const refWrapper = useRef(null)

    const recursiveSelection = target => {
        const parent = target.parentElement
        if (parent.classList.contains(style.categoryWrapper)) {
            parent.setAttribute('data-selected', true)
            recursiveSelection(parent)
        }
    }

    const select = (category, event) => {
        const target = event.target
        const parent = target.parentElement
        const siblings = parent.childNodes
        const prevItem = refWrapper.current.querySelector(`.${style.active}`)
        let siblingsCount = 0

        if (prevItem) prevItem.classList.remove(style.active)
        target.classList.add(style.active)

        refWrapper.current.querySelectorAll(`.${style.categoryWrapper}`).forEach(el => {
            el.setAttribute('data-selected', 'none')
        })

        recursiveSelection(target)

        siblings.forEach(el => {
            if (el.classList.contains(style.categoryWrapper)) {
                el.setAttribute('data-selected', false)

                if (el.childElementCount > 1) siblingsCount++
            }
        })

        if (!siblingsCount) {
            parent.parentElement.childNodes.forEach(el => {
                if (el.classList.contains(style.categoryWrapper) && el.getAttribute('data-selected') !== 'true') {
                    el.setAttribute('data-selected', false)
                }
            })
        }

        selectCategory(category)
    }

    return (
        <div className='pr-1:xxl' ref={refWrapper}>
            {categories.map(include1 => (
                <div data-selected='false' data-id={include1.id} key={include1.id} className={style.categoryWrapper}>
                    <div key={include1.id} onClick={e => select(include1, e)} className={style.category}>
                        <span className='is-decorative'>{include1.name}</span>
                        <Icon external={`${style.categoryIcon} is-decorative`} name='chevronRight' width='12' height='16' />
                    </div>

                    {include1.include_sections
                        ? include1.include_sections.map(include2 => (
                            <div data-selected='false' data-id={include2.id} key={include2.id} className={style.categoryWrapper}>
                                <div key={include2.id} onClick={e => select(include2, e)} className={style.category}>{include2.name}</div>

                                {include2.include_sections
                                    ? include2.include_sections.map(include3 => (
                                        <div data-selected='false' data-id={include3.id} key={include3.id} className={style.categoryWrapper}>
                                            <div key={include3.id} onClick={e => select(include3, e)} className={style.category}>{include3.name}</div>

                                            {include3.include_sections
                                                ? include3.include_sections.map(include4 => (
                                                    <div data-selected='false' data-id={include4.id} key={include4.id} className={style.categoryWrapper}>
                                                        <div key={include4.id} onClick={e => select(include4, e)} className={style.category}>{include4.name}</div>
                                                    </div>
                                                )) : null
                                            }
                                        </div>
                                    )) : null
                                }
                            </div>
                        )) : null
                    }
                </div>
            ))}
        </div>
    )
}

function PreviousButton({ isSidebarHidden, isPrevButton }) {
    return (
        <div data-hidden={!isPrevButton} className={`${style.previousButton} btn btn--primary`}>
            <span className='text--upper text--p5 text--sparse text--bold'>показать предыдущие</span>
        </div>
    )
}

function Pagination({ isSidebarHidden }) {
    const countSelect = () => {

    }
    return (
        <div data-open={isSidebarHidden} className={`${style.pagination}`}>
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

function SidebarHead({ activeCategory, toggleSidebar, isBrands }) {
    return (
        <div className={`${style.wrapper} is-hidden--lg-down`}>
            <div data-selected={!!activeCategory} className={`${style.selector} d-flex flex--align-center text--t5 text--upper text--bold`}>
                {isBrands
                    ? <span className={`is-hidden--lg-down`}>Фильтры</span>
                    : <>
                        <span>Категории</span>
                        <span className={`${style.sidebarFilterText} is-hidden--xl`}>&nbsp;и фильтры</span>
                    </>
                }

                <div className='mr-0.5' />
                <InputSwitch onAfterChange={toggleSidebar} isActive={true} />
            </div>
        </div>
    )
}

function CardList({ products, isSidebarHidden }) {
    const fillers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    if (products === 'updated') {
        return (
            <div data-show={isSidebarHidden} className={style.cardsContainer}>
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
        <div data-show={isSidebarHidden} className={style.cardsContainer}>
            {
                products.map(product => (
                    <div key={product.id} className={style.cardWrapper}>
                        <Card info={product} updated={[isSidebarHidden]} />
                    </div>
                ))
            }
        </div>
    )
}
