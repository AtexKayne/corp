import { useState, useEffect } from 'react'
import { globalState } from '../../components/helpers/globalState'
import { cardsCompact as cards } from '../../components/helpers/constants'
import { motion, useAnimationControls } from 'framer-motion'
import { debounce } from '../helpers/debounce'

import Icon from '../../components/Icon'
import style from './Catalog.module.scss'
import Card from '../usefull/ui/Card/Card'
import Dropdown from '../../components/usefull/Dropdown'
import CatalogFilters from '../usefull/filters/CatalogFilters'
import Nav from './Nav/Nav'
import Head from './Head/Head'

export default function Catalog({ detail }) {
    const isBrands = detail.isBrands || detail.isPromo
    const [mode, setMode] = useState('creative')
    const [isExistFilters, setIsExistFilters] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [filters, setFilters] = useState(detail.filter)
    const [products, setProducts] = useState('updated')
    const animateContainer = useAnimationControls()

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

    const changeMode = async mode => {
        window.navigator?.vibrate?.(200)
        window.scrollTo({ behavior: 'smooth', top: 0 })
        await animateContainer.start({ opacity: 0, transition: { duration: 0.1 } })
        setMode(mode)
        await animateContainer.start({ y: 50, transition: { duration: 0.3 } })
        animateContainer.start({ y: 0, opacity: 1, transition: { duration: 0.2, ease: 'easeInOut' } })
    }

    useEffect(() => {
        updateProducts()
        updateFastFilters()
        updateSelectedFilters(filters)
    }, [filters])

    useEffect(() => {
        if (mode === 'creative') {
            // setProducts(cards)
        }
    }, [mode])

    useEffect(() => {
        setProducts(cards)
        setTimeout(() => {
            animateContainer.start({ y: 0, opacity: 1, transition: { duration: 0.2, ease: 'easeInOut' } })
        }, 300)
    }, [])

    return (
        <>
            <Head info={detail} isBrands={isBrands} isPromo={detail.isPromo} categoryName={detail.name} />
            <Nav
                mode={mode}
                isBrands={isBrands}
                setMode={changeMode}
                sortHandler={sortHandler}
                openFilters={openFilters}
                isExistFilters={isExistFilters}
                fastFilters={detail.fastFilters}
                resetAllHandler={resetAllHandler}
                selectFastFilter={selectFastFilter} />
            <div className='is-hidden--xl-up text--t5 text--bold text--upper text--center text--color-small'>НАЙДЕНО 668 ТОВАРОВ</div>
            <motion.div animate={animateContainer} initial={{ opacity: 0, y: 50 }} className={style.container}>
                <div style={{ width: '100%' }} className='d-flex flex--column'>
                    <PreviousButton isPrevButton={false} />

                    <CardList products={products} mode={mode} />

                    <Pagination />
                </div>
            </motion.div>

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
    const [nth, setNth] = useState([])

    const initCreativeCards = () => {
        if (mode !== 'creative') return
        if (window.innerWidth <= globalState.sizes.sm) return
        const newNth = []
        if (window.innerWidth > globalState.sizes.sm) {
            switch (globalState.currentSize) {
                case 'xxxl':
                    for (let i = 0; i < 10; i++) {
                        newNth.push(i * 10 + 2 + i)
                        newNth.push(i * 10 + 3 + i)
                    }
                    break;
                case 'xxl':
                    for (let i = 0; i < 10; i++) {
                        newNth.push(i * 8 + 1)
                        newNth.push(i * 8 + 2)
                    }
                    break;
                case 'xl':
                    for (let i = 0; i < 10; i++) {
                        newNth.push(i * 11)
                        const coef = i % 2 === 0 ? 6 : 5
                        newNth.push(i * 10 + coef + i)
                    }
                    break;
                case 'lg':
                    for (let i = 0; i < 10; i++) {
                        newNth.push(i * 9)
                    }
                    break;
                case 'md':
                    for (let i = 0; i < 10; i++) {
                        newNth.push(i * 3 + 2)
                    }
                    break;
                case 'sm':
                    for (let i = 0; i < 10; i++) {
                        newNth.push(i * 3 + 2)
                    }
                    break;

                default:
                    break;
            }
        }
        setNth(newNth)
    }

    const debounceResize = debounce(initCreativeCards, 500)

    useEffect(() => {
        initCreativeCards()
    }, [mode])

    useEffect(() => {
        window.addEventListener('resize', debounceResize)

        return () => {
            window.removeEventListener('resize', debounceResize)
        }
    }, [])

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
            {products.map((product, index) => (
                <Card key={product.id} info={product} index={index} mode={mode} nth={nth} />
            ))}
        </div>
    )
}
