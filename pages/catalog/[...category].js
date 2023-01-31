import { useState, useEffect, useRef } from 'react'
import { catalog } from '../../components/helpers/constants'
import style from '../../styles/module/Catalog/Catalog.module.scss'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'

import MainLayout from '../../layout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import Image from 'next/image'
import Link from 'next/link'

export default function Catalog({ detail }) {

    return (
        <MainLayout title={'Каталог'}>
            <Breadcrumbs />
            <div className='row mb-3'>
                <h1 className='text--h4 text--bold'>Каталог товаров</h1>
                <div className={`${style.share} ml-1.5`}>
                    share
                </div>
            </div>
            <div className='row mb-1'>
                <div className='col col--xl-3'>
                    <div className='text--t5 text--upper text--bold'>Категории</div>
                </div>
                <div className='col col--xl-9'>
                    <div className='d-flex flex--between'>
                        <div className='text--t5 text--bold text--upper text--color-small'>НАЙДЕНО 668 ТОВАРОВ</div>
                        <div className='text--t5 text--bold text--upper'>Популярные</div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col col--xl-3'>
                    <div className={style.categories}>
                        <Link href={`/catalog/hit`}>
                            <a href={`/catalog/hit`} className={style.category}>
                                <Image src='/images/catalog/categorys/hit-xs.svg' width='24' height='24' alt='Хиты' />
                                <div className='text--t4 text--normal'>Хиты</div>
                            </a>
                        </Link>
                        <Link href={`/catalog/new`}>
                            <a href={`/catalog/new`} className={style.category}>
                                <Image src='/images/catalog/categorys/new-xs.svg' width='24' height='24' alt='Новинки' />
                                <div className='text--t4 text--normal'>Новинки</div>
                            </a>
                        </Link>
                        <div className='pt-1'/>
                        {detail.categories
                            ? detail.categories.map(category => (
                                <Link href={`/catalog/${category.slug}`} key={category.name}>
                                    <a href={`/catalog/${category.slug}`} className={style.category}>
                                        <Image src={category.icon} width='24' height='24' alt={category.name} />
                                        <div className='text--t4 text--normal'>{category.name}</div>
                                    </a>
                                </Link>
                            )) : null
                        }
                    </div>
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

export async function getServerSideProps(context) {
    let resp, json
    json = catalog

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