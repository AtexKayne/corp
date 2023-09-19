import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { globalState } from '../../components/helpers/globalState'
import { cardsCompact as cards } from '../../components/helpers/constants'

import Image from 'next/image'
import Icon from '../../components/Icon'
import style from './Catalog.module.scss'
import Card from '../usefull/ui/Card/Card'
import Dropdown from '../../components/usefull/Dropdown'
import Favourite from '../../components/usefull/Favourite'
import CatalogFilters from '../usefull/filters/CatalogFilters'
import { debounce } from '../helpers/debounce'

export default function Catalog({ detail }) {
    const isBrands = detail.isBrands || detail.isPromo
    const [mode, setMode] = useState('compact')
    const [isExistFilters, setIsExistFilters] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [filters, setFilters] = useState(detail.filter)
    const [products, setProducts] = useState('updated')
    console.log('test');

    const selectFilters = arr => {
        if (arr) setFilters(arr)
    }

    const resetAllHandler = () => {
        const encoded = JSON.stringify([...filters])
        const replaced = encoded.replaceAll('"isSelected":true', '"isSelected":false')
        const decoded = JSON.parse(replaced)
        selectFilters(decoded)
    }

    const selectFastFilter = item => {
        const encoded = JSON.stringify([...filters])
        let replaced = encoded.replaceAll('"isSelected":true', '"isSelected":false')
        item.settings.forEach(set => {
            set.values.forEach(value => {
                replaced = replaced.replace(`"value":"${value}","isSelected":false`, `"value":"${value}","isSelected":true`)
            })
        })
        const decoded = JSON.parse(replaced)
        selectFilters(decoded)
    }

    const updateSelectedFilters = arr => {
        const result = {}
        let newIsExistFilters = false
        arr.forEach((item, index) => {
            if (!item.values || !item.values.length) return
            item.values.forEach((value, i) => {
                if (value.isSelected) {
                    const isExist = typeof result[item.code] === 'string'
                    if (isExist) result[item.code] += '|' + value.value
                    else result[item.code] = value.value
                    newIsExistFilters = true
                }
                if (item.code !== 'category' || !value.include) return
                value.include.forEach((subcat, a) => {
                    if (subcat.isSelected) {
                        const isExist = typeof result[item.code] === 'string'
                        if (isExist) result[item.code] += '|' + subcat.value
                        else result[item.code] = subcat.value
                        newIsExistFilters = true
                    }
                })
            })
        })

        setIsExistFilters(newIsExistFilters)

        setTimeout(() => {
            const query = new URLSearchParams(result).toString()
            const location = window.location.href.split('?')[0]
            const encoded = `${location}${query ? '?' : ''}${decodeURI(query)}`
            window.history.pushState('', '', encoded)
        }, 1000)
    }

    const updateFastFilters = () => {
        const fastFilters = document.querySelectorAll('.js-fast-filters')
        fastFilters.forEach(element => {
            const active = element.querySelector('[data-active="true"]')
            if (!active) return
            active.setAttribute('data-active', false)
        })
    }

    const updateProducts = () => {
        // setProducts('updated')
        // setTimeout(() => setProducts(cards), 1500)
    }

    const sortHandler = data => {

    }

    const openFilters = event => {
        event.preventDefault()
        globalState.body.addClass('overflow-hidden')
        setIsFilterOpen(true)
    }

    useEffect(() => {
        updateProducts()
        updateFastFilters()
        updateSelectedFilters(filters)
    }, [filters])

    useEffect(() => {
        setProducts(cards)
    }, [])

    return (
        <>
            <Head info={detail} isBrands={isBrands} isPromo={detail.isPromo} categoryName={detail.name} />

            <Nav
                isBrands={isBrands}
                sortHandler={sortHandler}
                openFilters={openFilters}
                isExistFilters={isExistFilters}
                fastFilters={detail.fastFilters}
                resetAllHandler={resetAllHandler}
                selectFastFilter={selectFastFilter} />

            <div className={style.container}>
                <div style={{ width: '100%' }} className='d-flex flex--column'>
                    <PreviousButton isPrevButton={false} />

                    <CardList products={products} mode={mode} />

                    <Pagination />
                </div>
            </div>

            <CatalogFilters
                filters={filters}
                isFilterOpen={isFilterOpen}
                selectFilters={selectFilters}
                fastFilters={detail.fastFilters}
                resetAllHandler={resetAllHandler}
                setIsFilterOpen={setIsFilterOpen}
                selectFastFilter={selectFastFilter} />
        </>
    )
}

function Nav({ isBrands, sortHandler, openFilters, fastFilters, selectFastFilter, isExistFilters, resetAllHandler }) {
    const refNav = useRef(null)
    const refContainer = useRef(null)
    const refOffsetHeight = useRef(0)

    const scrollHandler = () => {
        const scroll = window.scrollY
        const newIsFixed = scroll > refOffsetHeight.current
        refNav.current.dataset.active = newIsFixed
    }

    const debounceResize = debounce(() => {
        const offset = refContainer.current.getBoundingClientRect().left
        refNav.current.style.paddingLeft = `${offset}px`
        refNav.current.style.paddingRight = `${offset}px`

        if (window.innerWidth > globalState.sizes.lg) {
            refOffsetHeight.current = 292
        } else {
            refOffsetHeight.current = 198
        }
    }, 1000)

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler, { passive: true })
        window.addEventListener('resize', debounceResize)
        const offset = refContainer.current.getBoundingClientRect().left
        refNav.current.style.paddingLeft = `${offset}px`
        refNav.current.style.paddingRight = `${offset}px`
        if (window.innerWidth > globalState.sizes.lg) {
            refOffsetHeight.current = 292
        } else {
            refOffsetHeight.current = 198
        }

        return () => {
            window.removeEventListener('scroll', scrollHandler)
            window.removeEventListener('resize', debounceResize)
        }
    }, [])

    return (
        <div ref={refContainer} className={style.navContainer}>
            {isBrands ? null : <FastFilter fastFilters={fastFilters} onAfterChange={selectFastFilter} resetAllHandler={resetAllHandler} />}

            <div ref={refNav} data-active={false} className={`${style.nav}`}>
                <div className={`${style.navInner}`}>

                    <Dropdown title='Популярные' external='text--t5 text--bold text--upper' afterChose={sortHandler}>
                        <>
                            <span data-value='popular' data-active='true' className='text--t4'>Популярные</span>
                            <span data-value='new' className='text--t4'>Новинки</span>
                            <span data-value='price-down' className='text--t4'>Цена по возрастанию</span>
                            <span data-value='price-up' className='text--t4'>Цена по убыванию</span>
                        </>
                    </Dropdown>
                    <div className={style.navFiller} />
                    <div className='is-hidden--lg-down text--t5 text--bold text--upper text--color-small'>НАЙДЕНО 668 ТОВАРОВ</div>
                    <div className={`${style.tagsContainer} d-flex`}>
                        <div className='mr-2 mr-3:md d-flex flex--center'>
                            <span className='text--t5 link text--bold text--upper'>Вид</span>
                            <div className={style.viewMode}>
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_1707_39249)">
                                        <rect x="0.000976562" width="5.66668" height="5.66668" rx="0.266667" fill="#E5E5E5" />
                                        <rect x="0.000976562" y="8.33398" width="5.66668" height="5.66668" rx="0.266667" fill="#E5E5E5" />
                                        <rect x="8.33398" width="5.66668" height="5.66668" rx="0.266667" fill="#E5E5E5" />
                                        <rect x="8.33398" y="8.33398" width="5.66668" height="5.66668" rx="0.266667" fill="#E5E5E5" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1707_39249">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <svg data-active='true' width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_1707_39256)">
                                        <g clipPath="url(#clip1_1707_39256)">
                                            <rect width="6.125" height="3.5" rx="0.266667" fill="#112233" />
                                            <rect x="7.875" width="6.125" height="3.5" rx="0.266667" fill="#112233" />
                                            <rect y="5.25" width="6.125" height="3.5" rx="0.266667" fill="#112233" />
                                            <rect x="7.875" y="5.25" width="6.125" height="3.5" rx="0.266667" fill="#112233" />
                                            <rect y="10.5" width="6.125" height="3.5" rx="0.266667" fill="#112233" />
                                            <rect x="7.875" y="10.5" width="6.125" height="3.5" rx="0.266667" fill="#112233" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1707_39256">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                        <clipPath id="clip1_1707_39256">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>

                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_1707_39267)">
                                        <rect width="7" height="6.125" rx="0.266667" fill="#E5E5E5" />
                                        <rect y="7.875" width="4.375" height="6.125" rx="0.266667" fill="#E5E5E5" />
                                        <rect x="9.625" width="4.375" height="6.125" rx="0.266667" fill="#E5E5E5" />
                                        <rect x="7" y="7.875" width="7" height="6.125" rx="0.266667" fill="#E5E5E5" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1707_39267">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <a href='#' className='d-flex flex--center' onClick={openFilters}>
                            <span className='text--t5 link text--bold text--upper'>фильтры</span>
                            <Icon external='ml-0.5' name='filter' width='16' height='16' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
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

function FastFilter({ onAfterChange, fastFilters, resetAllHandler }) {
    const scrollPixels = 200
    const refWrapper = useRef(0)
    const refInner = useRef(null)
    const refScrollPos = useRef(0)
    const refScrollLimit = useRef(2)
    const refScrollOfset = useRef(0)
    const refIsStartDrag = useRef(false)
    const animateInner = useAnimationControls()
    const [position, setPosition] = useState(false)
    const [dragConstraints, setDragConstraints] = useState(0)

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

    const clickHandler = (event, item) => {
        const target = event.target
        // setTimeout(calculateScroll, 400)
        if (target.getAttribute('data-active') === 'true') return resetAllHandler()
        const fastFiltersContainer = document.querySelectorAll('.js-fast-filters')
        const value = target.innerText
        onAfterChange(item)
        setTimeout(() => {
            fastFiltersContainer.forEach(container => {
                const items = container.querySelectorAll('.js-fast-filters-item')
                items.forEach(item => {
                    item.setAttribute('data-active', item.innerText === value)
                })
            })
        }, 150)
    }

    // const clickHandler = (index, item) => {
    //     if (refIsStartDrag.current) return
    //     if (index === activeFilter) setActiveFilter(() => {
    //         setTimeout(calculateScroll, 400)
    //         return false
    //     })
    //     else setActiveFilter(() => {
    //         setTimeout(calculateScroll, 400)
    //         return index
    //     })
    //     onAfterChange(item)
    // }

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
    }, [])

    return (
        <div className={style.fastFilterContainer}>
            <div onClick={() => scrollTo('prev')} data-position={position === 'start' || position === 'none'} className={style.fastFilterPrev}>
                <Icon name='chevronLeft' width='18' height='18' />
            </div>

            <div ref={refWrapper} className={`${style.fastFilterWrapper} js-fast-filters`}>
                <motion.div
                    drag='x'
                    ref={refInner}
                    animate={animateInner}
                    onDragEnd={dragEndHandler}
                    onDragStart={dragStartHandler}
                    className={style.fastFilterInner}
                    dragConstraints={{ right: 0, left: dragConstraints }}>
                    {fastFilters.map((item, index) => (
                        <div
                            key={item.name}
                            onClick={event => clickHandler(event, item)}
                            className={`${style.fastFilterItem} js-fast-filters-item text--p5 text--upper`}>
                            {item.name}
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

function CardList({ products, mode }) {
    const fillers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    if (products === 'updated') {
        return (
            <div data-mode={mode} className={style.cardsContainer}>
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
        <div data-mode={mode} className={style.cardsContainer}>
            {products.map(product => (
                <Card key={product.id} info={product} mode={mode} />
            ))}
        </div>
    )
}
