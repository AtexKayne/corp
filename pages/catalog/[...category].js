import { cards, filters } from '../../components/helpers/constants'
import style from '../../styles/module/Catalog/Catalog.module.scss'
import { globalState } from '../../components/helpers/globalState'
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
import ItemChecker from '../../components/usefull/form/ItemChecker'

export default function Catalog({ detail }) {
    const c = detail.currentCategory
    const parentInfo = c.parent_id !== null
        ? detail.categories.filter(category => category.id === c.parent_id)[0]
        : c
    const [activeCategory, setActiveCategory] = useState(c.parent_id ?? c.id)
    const [activeSubCategory, setActiveSubCategory] = useState(c.id)
    const [isSidebarHidden, setIsSidebarHidden] = useState('new')
    const [selectedFilter, setSelectedFilter] = useState({})
    const [categoryName, setCategoryName] = useState(c.name)
    const [titleOpacity, setTitleOpacity] = useState(false)
    const [products, setProducts] = useState('updated')
    const [filters, setFilters] = useState(c.filter)
    const [info, setInfo] = useState(c)
    const refTitle = useRef(null)
    const router = useRouter()

    useEffect(() => {
        globalState.catalog = {
            setSelectedFilter,
        }
        setProducts(cards)
        setIsSidebarHidden(window.innerWidth < globalState.sizes.xl)
    }, [])

    const updateProducts = () => {
        setProducts('updated')
        setTimeout(() => setProducts(cards), 1500)
    }

    useEffect(() => {
        globalState.catalog.selectedFilter = selectedFilter
        updateProducts()
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
            ...filters,
            { code: 'market', name: 'Есть в ФМ', id: 566 },
            { code: 'available', name: 'Только в наличии', id: 466 },
        ]

        return window.innerWidth < globalState.sizes.xl
            ? updated
            : setFilters(updated)
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
        setInfo(info)
        setActiveCategory(info.id)
        setActiveSubCategory(info.id)
        updateCategoryName(info.name)
        updateFilters(info.filter)
        routerPush(info.url)
        updateProducts()
        // closeWrapper()
    }

    const selectSubCategory = info => {
        setInfo(info)
        setActiveSubCategory(info.id)
        updateCategoryName(info.name)
        updateFilters(info.filter)
        routerPush(info.url)
        closeWrapper()
        updateProducts()
    }

    const resetSelection = () => {
        if (detail.isBrands) {
            router.push('/brands')
        } else {
            setActiveCategory(false)
            setActiveSubCategory(false)
            updateCategoryName('Каталог товаров')
            setFilters(false)
            routerPush('main')
            updateProducts()
        }
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
        <MainLayout title={`Каталог | ${c.name}`}>
            <Breadcrumbs theme={parentInfo ? parentInfo.theme : false} />

            <Head
                info={parentInfo}
                isBrands={detail.isBrands}
                categoryName={categoryName}
                titleOpacity={titleOpacity}
                toggleSidebar={toggleSidebar}
                isSidebarHidden={isSidebarHidden} />

            <div className='d-flex mb-2 p-relative'>
                <SidebarHead activeCategory={activeCategory} toggleSidebar={toggleSidebar} />

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
                        <Addition isBrands={detail.isBrands} />

                        <div onClick={resetSelection} className={`${style.catalogPrev} text--t4 text--bold`}>
                            <Icon name='chevronLeft' width='16' height='16' />
                            <span>{detail.isBrands ? 'Все бренды' : 'Каталог товаров'}</span>
                        </div>

                        <Categories
                            categories={detail.categories}
                            activeCategory={activeCategory}
                            selectCategory={selectCategory}
                            selectSubCategory={selectSubCategory}
                            activeSubCategory={activeSubCategory} />
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

                <div style={{width: '100%'}} className='d-flex flex--column'>
                    <CardList products={products} isSidebarHidden={isSidebarHidden} />

                    <Pagination />
                </div>

            </div>
        </MainLayout>
    )
}

function Head({ toggleSidebar, isSidebarHidden, categoryName, titleOpacity, isBrands, info }) {
    const [imageOverlay, setImageOverlay] = useState(null)
    const [imageLogo, setImageLogo] = useState('/icons/icon-empty.svg')
    const [themeHead, setThemeHead] = useState('ui-light')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (isBrands && info.parent_id === null) {
            setDescription(info.description)
            setImageOverlay(info.img_big ? info.img_big : false)
            setImageLogo(info.logo)
            if (info.theme === 'dark') {
                globalState.header.setTheme('ui-dark')
                setThemeHead('ui-dark')
            }
        }
    }, [info])

    if (isBrands) {
        // return null
        return (
            <div className={`${themeHead} ${imageOverlay ? 'mb-3 mb-6:lg' : 'mb-3'}`}>
                {imageOverlay
                    ? <div className={style.imageOverlay}><Image src={imageOverlay} layout='fill' alt={info.name} /></div>
                    : null
                }

                <div className={style.brandHead}>
                    {imageOverlay
                        ? null
                        : <div className='mr-1.5 px-1 py-1 is-hidden--md-down'><Image src={imageLogo} width='100' height='100' alt={info.name} /></div>
                    }
                    <div className={style.brandInfo}>
                        <div className={`${style.brandDescription} text--p2 text--normal mb-1 is-hidden--md-down`}>{description}</div>

                        <div className={`${style.head} row mb-1`}>
                            <div data-shown={!isSidebarHidden} data-opacity={titleOpacity} className={`${style.title}`}>
                                <h1 onClick={toggleSidebar} className={`text--a2 text--bold`}>{categoryName}</h1>
                                <Icon name='dropdown' external={style.titleArrow} width='20' height='20' />
                            </div>

                            <Share isBrands={isBrands} name={info.name} />
                        </div>

                        <div className={`${style.aboutBrand} text--t5 text--upper text--bold`}>Подробнее о бренде</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`${style.head} row mb-2 mb-3:md`}>

                <div data-shown={!isSidebarHidden} data-opacity={titleOpacity} className={`${style.title}`}>
                    <h1 onClick={toggleSidebar} className={`text--a2 text--bold`}>{categoryName}</h1>
                    <Icon name='dropdown' external={style.titleArrow} width='20' height='20' />
                </div>

                {info ? <Share isBrands={isBrands} name={info.name} /> : null}
            </div>
        )
    }
}

function Share({ name, isBrands }) {
    const [isOpen, setIsOpen] = useState(false)

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
        <div data-open={isOpen} className={`${style.share} is-hidden--sm-down ml-1.5`}>
            <div onClick={open} className={style.iconShare}>
                <Icon name='share' width='24' height='24' />
            </div>
            <div className={style.additionalShare}>
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

function Addition({ isBrands }) {
    if (isBrands) return null

    return (
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
    )
}

function Categories({ categories, activeCategory, activeSubCategory, selectCategory, selectSubCategory }) {
    if (!categories) return null

    return (
        <div>
            {categories.map(category => {
                return (
                    <div data-active={activeCategory === category.id} key={category.id} className={style.categoryWrapper}>
                        <div onClick={() => selectCategory(category)} data-selected={activeSubCategory === category.id} className={style.category}>
                            <span className={style.categoryImage}>
                                <Image src='/icons/icon-empty.svg' width='24' height='24' alt={category.name} />
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
            })}
        </div>
    )
}

function Pagination() {
    return (
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
    )
}

function SidebarHead({ activeCategory, toggleSidebar }) {
    return (
        <div className={`${style.wrapper} is-hidden--lg-down`}>
            <div data-selected={!!activeCategory} className={`${style.selector} d-flex flex--align-center text--t5 text--upper text--bold`}>
                <span>Категории</span>
                <span className='is-hidden--xl'>&nbsp;и фильтры</span>
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

export async function getServerSideProps(context) {
    const queryCategory = context.query.category
    let resp
    let currentCategory = {
        name: 'Каталог товаров',
        id: 0,
        parent_id: 0,
        filter: false,
    }
    const json = {
        categories: categories.data
    }

    if (categories.data) {
        categories.data.forEach(property => {
            currentCategory = property.url.includes(`/${queryCategory}/`) ? property : currentCategory

            if (Array.isArray(property['include_sections'])) {
                property.include_sections.forEach(include => {
                    currentCategory = include.url.includes(`/${queryCategory}/`) ? include : currentCategory
                })
            }
        })
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