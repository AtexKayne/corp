import { cards, filters } from '../../components/helpers/constants'
import style from '../../styles/module/Catalog/Catalog.module.scss'
import { categories } from '../../components/helpers/categories'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import Image from 'next/image'
import Icon from '../../components/Icon'
import Card from '../../components/product/Card'
import MainLayout from '../../layout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import InputRange from '../../components/usefull/form/InputRange'
import ColorPicker from '../../components/usefull/form/ColorPicker'
import ItemsPicker from '../../components/usefull/form/ItemsPicker'
import InputSwitch from '../../components/usefull/form/InputSwitch'
import { globalState } from '../../components/helpers/globalState'
import ItemChecker from '../../components/usefull/form/ItemChecker'

export default function Catalog({ detail }) {
    const [activeCategory, setActiveCategory] = useState(detail.currentCategory.parent_id ?? detail.currentCategory.id)
    const [activeSubCategory, setActiveSubCategory] = useState(detail.currentCategory.id)
    const [categoryName, setCategoryName] = useState(detail.currentCategory.name)
    const [filters, setFilters] = useState(detail.currentCategory.filter)
    const [isSidebarHidden, setIsSidebarHidden] = useState('new')
    const [selectedFilter, setSelectedFilter] = useState({})
    const [info, setInfo] = useState(detail.currentCategory)
    const [products, setProducts] = useState(false)
    const refTitle = useRef(null)
    const router = useRouter()

    useEffect(() => {
        globalState.catalog = {
            setSelectedFilter,
        }
        setProducts(cards)
        setIsSidebarHidden(window.innerWidth < globalState.sizes.xl)
    }, [])

    useEffect(() => {
        globalState.catalog.selectedFilter = selectedFilter
    }, [selectedFilter])
    

    const toggleSidebar = () => {
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

    const updateFilters = filters => {
        const updated = [
            { code: 'price', name: 'Цена', id: 666 },
            ...filters,
            { code: 'market', name: 'Есть в ФМ', id: 566 },
            { code: 'available', name: 'Только в наличии', id: 466 },
        ]
        if (window.innerWidth < globalState.sizes.xl) {
            return updated
        } else {
            setFilters(updated)
        }

        return null
    }

    const closeWrapper = () => {
        if (window.innerWidth >= globalState.sizes.xl) return
        setTimeout(() => setIsSidebarHidden(true), 600)
    }

    const updateCategoryName = name => {
        refTitle.current.style.opacity = 0
        setTimeout(() => {
            setCategoryName(name)
            refTitle.current.style.opacity = 1
        }, 300)
    }

    const selectCategory = info => {
        setInfo(info)
        setActiveCategory(info.id)
        setActiveSubCategory(info.id)
        updateCategoryName(info.name)
        updateFilters(info.filter)
        routerPush(info.url)
        // closeWrapper()
    }

    const selectSubCategory = info => {
        setInfo(info)
        setActiveSubCategory(info.id)
        updateCategoryName(info.name)
        updateFilters(info.filter)
        routerPush(info.url)
        closeWrapper()
    }

    const resetSelection = () => {
        setActiveCategory(false)
        setActiveSubCategory(false)
        updateCategoryName('Каталог товаров')
        setFilters(false)
        routerPush('main')
    }

    const openFilters = () => {
        const filter = updateFilters(info.filter)
        if (filter) {
            globalState.modal.setTemplate('filters')
            globalState.modal.setIsZero(true)
            globalState.modal.setData(filter)
            globalState.modal.setIsOpen(true)
        }
    }

    return (
        <MainLayout title={`Каталог | ${detail.currentCategory.name}`}>
            <Breadcrumbs />
            <div className={`${style.head} row mb-2 mb-3:md`}>
                <div data-shown={!isSidebarHidden} className={`${style.title}`}>
                    <h1 onClick={toggleSidebar} ref={refTitle} className={`text--a2 text--bold`}>{categoryName}</h1>
                    <Icon name='dropdown' external={style.titleArrow} width='20' height='20' />
                </div>
                <div className={`${style.share} is-hidden--sm-down ml-1.5`}>
                    share
                </div>
            </div>
            <div className='d-flex mb-2'>
                <div className={`${style.wrapper} is-hidden--lg-down`}>
                    <div data-selected={!!activeCategory} className={`${style.selector} d-flex flex--align-center text--t5 text--upper text--bold`}>
                        <span>Категории</span>
                        <span className='is-hidden--xl'>&nbsp;и фильтры</span>
                        <div className='mr-0.5' />
                        <InputSwitch onAfterChange={toggleSidebar} isActive={true} />
                    </div>
                </div>
                <div className='d-flex col pl-3:xl pr-1:xl flex--between'>
                    <div className='is-hidden--lg-down text--t5 text--bold text--upper text--color-small'>НАЙДЕНО 668 ТОВАРОВ</div>
                    <div className='text--t5 text--bold text--upper'>Популярные</div>
                    {filters && filters.length
                        ? <div onClick={openFilters} className='is-hidden--xl-up text--t5 text--bold text--upper'>фильтры</div>
                        : null
                    }

                </div>
            </div>
            <div className='d-flex'>
                <div data-hidden={isSidebarHidden} className={style.wrapper}>
                    <div className={`${style.categories}`} data-selected={!!activeCategory}>
                        <div className={style.additional}>
                            <Link href={`/catalog/hit`}>
                                <a href={`/catalog/hit`} className={style.category}>
                                    <Image src='/images/catalog/categorys/hit-xs.svg' width='24' height='24' alt='Хиты' />
                                    <div className='text--t4'>Хиты</div>
                                </a>
                            </Link>
                            <Link href={`/catalog/new`}>
                                <a href={`/catalog/new`} className={style.category}>
                                    <Image src='/images/catalog/categorys/new-xs.svg' width='24' height='24' alt='Новинки' />
                                    <div className='text--t4'>Новинки</div>
                                </a>
                            </Link>
                        </div>

                        <div onClick={resetSelection} className={`${style.catalogPrev} text--t4 text--bold`}>
                            <Icon name='chevronLeft' width='16' height='16' />
                            <span>Каталог товаров</span>
                        </div>

                        <div>
                            {detail.categories
                                ? detail.categories.map(category => {
                                    return (
                                        <div data-active={activeCategory === category.id} key={category.id} className={style.categoryWrapper}>
                                            <div onClick={() => selectCategory(category)} data-selected={activeSubCategory === category.id} className={style.category}>
                                                <span className={style.categoryImage}>
                                                    <Image src={category.img_mini} width='24' height='24' alt={category.name} />
                                                </span>
                                                <span className={style.categoryIcon}>
                                                    <Icon name='chevronLeft' width='16' height='16' />
                                                </span>
                                                <div className='text--t4'>{category.name}</div>
                                            </div>
                                            {
                                                category.include_sections
                                                    ? category.include_sections.map(include => {
                                                        return (
                                                            <div onClick={() => selectSubCategory(include)} data-selected={activeSubCategory === include.id} key={include.id} className={style.subcategory}>
                                                                <div className='text--t4'>{include.name}</div>
                                                            </div>
                                                        )
                                                    }) : null
                                            }
                                        </div>
                                    )
                                }) : null}
                        </div>
                    </div>

                    {filters && filters.length
                        ? <div className={style.filters}>
                            {
                                filters.map(filter => <Filter key={filter.id} name={filter.name} code={filter.code} />)
                            }
                        </div>
                        : null
                    }
                </div>

                <div className='d-flex flex--column'>
                    <div data-show={isSidebarHidden} className={style.cardsContainer}>
                        {products && products.length
                            ? products.map(product => (
                                <div key={product.id} className={style.cardWrapper}>
                                    <Card info={product} updated={[isSidebarHidden]} />
                                </div>
                            )) : null
                        }

                    </div>
                    <div className={`${style.pagination}`}>
                        <div className={`${style.showBtn} btn btn--primary btn--fill`}>
                            <span className='text--upper text--p6 text--bold'>показать еще</span>
                        </div>

                        <div className={style.paginationNav}>
                            <div>
                                <span className='text--upper text--p6'>показывать по</span>
                                <span className='text--upper text--p5 text--bold ml-0.5'>24</span>
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
                </div>

            </div>
        </MainLayout>
    )
}

function Filter({ name, code }) {
    const { colors, brands, pitanie, proizvodstvo, ves } = filters
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

    if (code !== 'market' && code !== 'available') {
        return (
            <div data-open={isOpen} className={style.filter}>
                <div onClick={toggleHandler} className={style.filterHeader}>
                    <div className='text--t5 text--upper text--bold'>
                        <div className='p-relative'>
                            <span>{name}</span>
                            {
                                selectedFilters !== 0
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
            </div>
        )
    } else {
        return (
            <div className={style.checker}>
                {code === 'market' || code === 'available' ? <ItemChecker text={name} code={code} /> : null}
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    const queryCategory = context.query.category
    let resp
    let currentCategory = {
        name: 'Каталог товаров',
        id: 0,
        parent_id: 0,
        filter: false
    }
    const json = {}
    const getIncludes = obj => {
        const includes = []
        for (const property in obj) {
            includes.push(obj[property])
        }
        return includes
    }

    if (categories.data) {
        const data = []

        for (const property in categories.data) {
            // const url = categories.data[property].url.split('catalog/')[1]
            // categories.data[property].url = url
            currentCategory = categories.data[property].url.includes(queryCategory)
                ? categories.data[property]
                : currentCategory
            if (categories.data[property].hasOwnProperty('include_sections')) {
                const includes = getIncludes(categories.data[property].include_sections)
                categories.data[property].include_sections = includes

                if (currentCategory.id === 0) {
                    categories.data[property].include_sections.forEach(include => {
                        currentCategory = include.url.includes(queryCategory)
                            ? include
                            : currentCategory
                    })
                }
            }
            // categories.data[property].url = 'catalog'
            data.push(categories.data[property])
        }

        json.categories = data
    }

    json.currentCategory = currentCategory

    // json = persone
    // try {
    //   resp = await fetch(`${process.env.API_URL}/team/${context.query.name}/?lang=ru`)
    //   json = await resp.json()
    // } catch (error) {
    //   json = persone
    // }

    return {
        props: {
            detail: json,
        }
    }
}