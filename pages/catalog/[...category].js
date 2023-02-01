import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'
import { catalog, filters } from '../../components/helpers/constants'
import { categories } from '../../components/helpers/categories'
import style from '../../styles/module/Catalog/Catalog.module.scss'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'

import MainLayout from '../../layout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import Image from 'next/image'
import Link from 'next/link'
import Icon from '../../components/Icon'
import InputRange from '../../components/usefull/form/InputRange'
import ColorPicker from '../../components/usefull/form/ColorPicker'
import ItemsPicker from '../../components/usefull/form/ItemsPicker'

export default function Catalog({ detail }) {
    const [categoryName, setCategoryName] = useState('Каталог товаров')
    const [activeSubCategory, setActiveSubCategory] = useState(0)
    const [activeCategory, setActiveCategory] = useState(0)
    const [filters, setFilters] = useState(false)
    const router = useRouter()

    const routerPush = url => {
        const link = url.includes('catalog/') ? url.split('catalog/')[1] : url
        router.push(link)
    }

    const updateFilters = filters => {
        const updated = [
            { code: 'price', name: 'Цена', id: 666 }, ...filters
        ]
        setFilters(updated)
    }

    const selectCategory = info => {
        setActiveCategory(info.id)
        setActiveSubCategory(info.id)
        setCategoryName(info.name)
        updateFilters(info.filter)
        routerPush(info.url)
    }
    const selectSubCategory = info => {
        setActiveSubCategory(info.id)
        setCategoryName(info.name)
        updateFilters(info.filter)
        routerPush(info.url)
    }

    const resetSelection = () => {
        setActiveCategory(false)
        setActiveSubCategory(false)
        setCategoryName('Каталог товаров')
        setFilters(false)
        routerPush('main')
    }
    useEffect(() => {
        console.log(detail);
    }, [])


    return (
        <MainLayout title={'Каталог'}>
            <Breadcrumbs />
            <div className='row mb-3'>
                <h1 className='text--h4 text--bold'>{categoryName}</h1>
                <div className={`${style.share} ml-1.5`}>
                    share
                </div>
            </div>
            <div className='row mb-2'>
                <div className='col col--xl-3'>
                    <div data-selected={!!activeCategory} className={`${style.selector} text--t5 text--upper text--bold`}>
                        <span>Категории</span>
                        <span>&nbsp;и фильтры</span>
                    </div>
                </div>
                <div className='col col--xl-9'>
                    <div className='d-flex flex--between'>
                        <div className='text--t5 text--bold text--upper text--color-small'>НАЙДЕНО 668 ТОВАРОВ</div>
                        <div className='text--t5 text--bold text--upper'>Популярные</div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col col--xl-3 pr-1'>
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


                        <div className=''>
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

                    {
                        filters && filters.length
                            ? <div className={style.filters}>
                                {
                                    filters.map(filter => <Filter key={filter.id} name={filter.name} code={filter.code} />)
                                }
                            </div>
                            : null
                    }

                </div>
                <div className='col col--xl-3'>
                    v
                </div>
                <div className='col col--xl-3'>
                    v
                </div>
                <div className='col col--xl-3'>
                    v
                </div>

            </div>
        </MainLayout>
    )
}

function Filter({ name, code }) {
    const {colors, brands, pitanie, proizvodstvo, ves} = filters

    const [isOpen, setIsOpen] = useState(true)
    const [selectedFilters, setSelectedFilters] = useState(0)

    const toggleHandler = () => {
        setIsOpen(!isOpen)
    }
    const changeHandler = (event, type) => {
        if (type === 'picker') {
            if (event.target.checked) setSelectedFilters(prev => prev + 1)
            else setSelectedFilters(prev => prev - 1)
        } else {
            setSelectedFilters('')
        }
        console.log(event, type)
    }

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

            { code === 'price' ? <InputRange min={0} max={15000} onAfterChange={event => changeHandler(event, 'price')} /> : null }
            { code === 'color' ? <ColorPicker colors={colors} onAfterChange={event => changeHandler(event, 'picker')} /> : null }
            { code === 'brand' ? <ItemsPicker items={brands} onAfterChange={event => changeHandler(event, 'picker')} /> : null }
            { code === 'pitanie' ? <ItemsPicker items={pitanie} onAfterChange={event => changeHandler(event, 'picker')} /> : null }
            { code === 'proizvodstvo' ? <ItemsPicker items={proizvodstvo} onAfterChange={event => changeHandler(event, 'picker')} /> : null }
            { code === 'weight_filter' || code === 'ves' ? <ItemsPicker items={ves} onAfterChange={event => changeHandler(event, 'picker')} /> : null }
            
        </div>
    )
}



export async function getServerSideProps(context) {
    let resp
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
            if (categories.data[property].hasOwnProperty('include_sections')) {
                const includes = getIncludes(categories.data[property].include_sections)
                categories.data[property].include_sections = includes
            }
            // categories.data[property].url = 'catalog'
            data.push(categories.data[property])
        }

        json.categories = data
    }

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