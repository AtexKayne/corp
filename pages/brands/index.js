import { brands } from '../../components/helpers/constants'
import style from '../../styles/module/Brands/Brands.module.scss'
import { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import Icon from '../../components/Icon'
import MainLayout from '../../layout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import Sticky from '../../components/usefull/Sticky'


export default function Brands({ detail }) {
    const refSearchedChildren = useRef(null)
    const [searchValue, setSearchValue] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)
    const refInput = useRef(null)
    const refItems = useRef(null)

    const clickSearchHandler = () => {
        refInput.current.focus()
        window.scrollTo({ top: 0, left: 0 })
    }

    const searchHandler = event => {
        const value = event.target.value.toLowerCase()
        setSearchValue(!!value)
        const items = Array.from(refItems.current)
        let itemCount = 0
        items.forEach(item => {
            // if (value) {
            //     const html = item.innerHTML
            //     const removeB = html.replaceAll('</b>', '').replace('<b>', '')
            //     item.innerHTML = removeB

            //     if (removeB.toLowerCase().includes(value)) {
            //         let val = value
            //         if (!removeB.includes(value)) val = value[0].toUpperCase() + value.slice(1)
            //         const replaced = removeB.replaceAll(val, `<b>${val}</b>`)
            //         item.style.display = 'block'
            //         item.innerHTML = replaced
            //         itemCount++
            //     } else item.style.display = 'none'
            // } else {
            //     item.style.display = ''
            //     itemCount++
            // }

            if (value) {
                if (item.innerHTML.toLowerCase().includes(value)) {
                    item.style.display = 'block'
                    itemCount++
                } else item.style.display = 'none'
            } else {
                item.style.display = ''
                itemCount++
            }
        })
        setIsEmpty(!!itemCount)
    }

    useEffect(() => {
        refItems.current = refSearchedChildren.current.querySelectorAll(`.${style.brand}`)
    }, [])


    return (
        <MainLayout title={`Бренды`}>
            <Breadcrumbs link='Бренды' />
            <h1 className='text--h4 mb-5'>Бренды</h1>

            <Sticky external={style.brandSearch} fixed={style.brandSearchFixed} offset={120}>
                <div className={`${style.search}`}>
                    <label className='input-search'>
                        <input ref={refInput} onChange={searchHandler} type='text' className='input' placeholder='Поиск по брендам' />
                        <Icon external='input-search__icon' name='search' width='18' height='18' />
                    </label>
                </div>
                <div data-value={searchValue} className={style.brandLetters}>
                    {detail && detail.length
                        ? detail.map(item => (
                            <a key={item.letter} href={`#${item.letter}`} className='text--t3 text--bold'>{item.letter}</a>
                        )) : null
                    }

                    <div onClick={clickSearchHandler} className={style.searchIcon}>
                        <Icon name='search' width='18' height='18' />
                    </div>
                </div>
            </Sticky>

            <div ref={refSearchedChildren} data-value={searchValue} className={style.searchChildren}>
                {detail && detail.length
                    ? detail.map(item => <BrandLine key={item.letter} letter={item.letter} brands={item.brands} />)
                    : null
                }
            </div>

            <div data-empty={!isEmpty} className={`${style.empty} text--t2 text--normal text--color-disabled`}>
                Такой бренд не найден
            </div>
        </MainLayout>
    )
}

function BrandLine({ letter, brands }) {
    return (
        <section id={letter} className={style.brandsLine}>
            <div className={`${style.letter} text--p1 text--bold`}>{letter}</div>
            {brands && brands.length
                ? brands.map(brand => (
                    <div key={brand.name} className={`${style.brand} text--t4 text--normal`}>{brand.name}</div>
                )) : null
            }
        </section>
    )
}

export async function getServerSideProps(context) {
    let resp, json

    json = brands

    return {
        props: {
            detail: json,
        }
    }
}