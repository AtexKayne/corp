import { useState, useEffect, useRef } from 'react'
import { numWord } from '../../components/helpers/generator'
import { favourite } from '../../components/helpers/constants'
import { globalState } from '../../components/helpers/globalState'
import style from '../../styles/module/Favourite/Favourite.module.scss'

import Link from 'next/link'
import Image from 'next/image'
import Icon from '../../components/Icon'
import MainLayout from '../../layout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import Tabs from '../../components/usefull/Tabs'
import Card from '../../components/product/Card'
import Favourite from '../../components/usefull/Favourite'


export default function FavouritePage({ detail }) {
    const [isEmpty, setIsEmpty] = useState(false)
    useEffect(() => {
        setIsEmpty(window.location.href.includes('empty'))
    }, [])
    
    return (
        <MainLayout title={`Избранное`}>
            <Breadcrumbs link={['Избранное|/favourite']} />
            <h1 className='text--h4 mb-2 mt-2 mt-1.5:md mt-2:lg'>Избранное</h1>
            <Tabs tabs={['Товары', 'Бренды', 'Разделы']}>
                <>
                    <div className={style.tabsInner}>
                        {detail.products && detail.products.length && !isEmpty
                            ? <Products items={detail.products} />
                            : <EmptyProducts />
                        }
                    </div>

                    <div className={style.tabsInner}>
                        {detail.brands && detail.brands.length && !isEmpty
                            ? <Brands items={detail.brands} />
                            : <EmptyBrands />
                        }
                    </div>

                    <div className={style.tabsInner}>
                        {detail.chapters && detail.chapters.length && !isEmpty
                            ? <Chapters items={detail.chapters} />
                            : <EmptyChapters />
                        }
                    </div>
                </>
            </Tabs>
            <div className='pb-5' />
        </MainLayout>
    )
}

function Products({ items }) {
    return (
        <div className={style.tabInner}>
            <div className={`${style.countItems} text--t6 text--bold text--upper text--sparse text--color-small`}>
                {items.length} {numWord(items.length, ['Товар','Товара','Товаров'])}
            </div>
            <div className={style.productsContainer}>
                {items.map(item => (
                    <div key={item.id} className={style.cardWrapper}>
                        <Card info={item} updated={[]} />
                    </div>
                ))}
            </div>
        </div>
    )
}

function Brands({ items }) {
    return (
        <div className={style.tabInner}>
            <div className={`${style.countItems} text--t6 text--bold text--upper text--sparse text--color-small`}>
                {items.length} {numWord(items.length, ['Бренд','Бренда','Брендов'])}
            </div>

            <div className={style.brandsContainer}>
                {items.map(item => (
                    <div key={item.id} className={style.brandItem}>
                        <span className={style.brandImage}>
                            <Image src={item.logo} alt={item.name} layout='fill' />
                        </span>
                        <span className='text--a7 text--upper'>{item.name}</span>
                        <span className={`${style.iconFav}`}>
                            <Favourite width='16' height='16' size='xl' info={{ primary: `Бренд ${item.name}` }} isActive={true} />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Chapters({ items }) {
    const info = { primary: '', image: false }
    return (
        <div className={style.tabInner}>
            <div className={`${style.countItems} text--t6 text--bold text--upper text--sparse text--color-small`}>
                {items.length} {numWord(items.length, ['Раздел','Раздела','Разделов'])}
            </div>

            <div className={style.chaptersContainer}>
                {items.map(item => (
                    <div key={item.id} className={style.chapterItem}>
                        <span className='text--a5 text--bold'>{item.name}</span>
                        <span className={`${style.iconFav}`}>
                            <Favourite width='16' height='16' size='xl' info={{ primary: `Раздел ${item.name}` }} isActive={true} />
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function EmptyWrapper({ children }) {
    const [time, setTime] = useState('9:41')
    useEffect(() => {
        const data = new Date()
        const hour = data.getHours()
        const minutes = data.getMinutes()
        setTime(`${hour}:${minutes}`)
    }, [])

    return (
        <div className='d-flex flex--justify-center is-decorative'>
            <div className={style.emptyContainer}>
                <div className={style.emptyInner}>
                    <div className={style.emptyMobile}>
                        <span className='text--t6'>{time}</span>
                        <div />
                        <span>
                            <Image src='/images/favourite/right-side.png' width='47' height='8' alt='mob icons' />
                        </span>
                    </div>
                    {children}
                </div>
            </div>

        </div>
    )
}

function EmptyProducts() {
    return (
        <>
            <div className={style.emptyText}>
                Добавляйте товары в избранное, чтобы вернуться к ним позже
            </div>
            <a href='#' className={`${style.emptyButton} mt-2 mb-4 btn btn--md btn--primary`}>
                <span className='text--p5 text--upper text--sparse text--bold'>Перейти к каталогу</span>
            </a>

            <EmptyWrapper>
                <div className={style.productInner}>
                    <div className={style.productCards}>
                        <div className='is-hidden--md-down'><Icon name='heartMD' width='21' height='18' /></div>
                        <div><Icon name='heartMD' width='21' height='18' /></div>
                        <div><Icon name='heartFill' width='21' height='18' /></div>
                    </div>
                </div>
            </EmptyWrapper>
        </>
    )
}

function EmptyBrands() {
    return (
        <>
            <div className={style.emptyText}>
                Добавляйте в избранное бренды со страницы брендов, чтобы быстрее к ним возвращаться
            </div>
            <a href='#' className={`${style.emptyButton} mt-2 mb-4 btn btn--md btn--primary`}>
                <span className='text--p5 text--upper text--sparse text--bold'>Выбрать бренд</span>
            </a>
            <EmptyWrapper>
                <div className={style.brandsInner}>
                    <div className={`${style.emptyBreadcrumbs} is-hidden--lg-down mb-2 mb-1.5:xl mb-3:xxl mb-4:xxxl`}>
                        <Breadcrumbs link={['Бренды|/brands']} />
                    </div>
                    <div className={`${style.brandsTitle} mb-1 mb-1.5:md mb-1.5:xl mb-2:xxl`}>
                        <div className={`${style.brandLogo} is-hidden--md-down`}>
                            <Image src='/images/brands/logos/image-1.png' width='85' height='85' alt='brand logo' />
                        </div>
                        <div className={style.brandInfo}>
                            <span className='text--p2 text--normal is-hidden--sm-down'>Финские средства по уходу за волосами</span>
                            <span className={style.brandName}>
                                <span className='text--h3'>Sim Sensitive</span>
                                <Icon name='heartFill' width='26' height='24' external='text--color-primary' />
                                <Icon name='share' width='24' height='24' external='is-hidden--sm-down' />
                            </span>
                            <span className='text--t3 text--sparse text--upper'>Подробнее о бренде</span>
                        </div>
                    </div>
                    <div className={style.emptyFillersCard}>
                        <div /><div />
                    </div>
                </div>
            </EmptyWrapper>
        </>
    )
}

function EmptyChapters() {
    return (
        <>
            <div className={style.emptyText}>
                Добавляйте в избранное разделы каталога, чтобы быстрее к ним возвращаться
            </div>
            <a href='#' className={`${style.emptyButton} mt-2 mb-4 btn btn--md btn--primary`}>
                <span className='text--p5 text--upper text--sparse text--bold'>Перейти к разделам каталога</span>
            </a>
            <EmptyWrapper>
                <div className={style.chaptersInner}>
                    <div className={`${style.emptyBreadcrumbs} is-hidden--lg-down mb-2 mb-1.5:xl mb-3:xxl mb-4:xxxl`}>
                        <Breadcrumbs link={['Каталог|/catalog', 'Для барберов|/catalog', 'Машинки|/catalog']} />
                    </div>
                    <div className={`${style.chaptersTitle} mb-1 mb-1.5:md mb-1.5:xl mb-2:xxl`}>
                        <span className='text--h3'>Машинки</span>
                        <Icon name='heartFill' width='26' height='24' external='text--color-primary' />
                        <Icon name='share' width='24' height='24' />
                    </div>
                    <div className={style.emptyFillers}>
                        <div /><div /><div /><div />
                    </div>
                    <div className={style.emptyFillersCard}>
                        <div /><div />
                    </div>
                </div>
            </EmptyWrapper>
        </>
    )
}

export async function getServerSideProps(context) {
    let resp, json

    json = favourite

    return {
        props: {
            detail: json,
        }
    }
}