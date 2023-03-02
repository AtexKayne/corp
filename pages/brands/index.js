import { brands } from '../../components/helpers/constants'
import style from '../../styles/module/Brands/Brands.module.scss'
import { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import Icon from '../../components/Icon'
import MainLayout from '../../layout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import Sticky from '../../components/usefull/Sticky'
import { globalState } from '../../components/helpers/globalState'


export default function Brands({ detail }) {
    const refSearchedChildren = useRef(null)
    const [searchValue, setSearchValue] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [stickyOffset, setStickyOffset] = useState(100)
    const refInput = useRef(null)
    const refItems = useRef(null)

    const clickSearchHandler = () => {
        refInput.current.focus()
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
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

    const navHandler = event => {
        event.preventDefault()
        const id = event.target.getAttribute('href')
        const element = document.querySelector(id)
        const topOffset = element.getBoundingClientRect().top + window.scrollY - (stickyOffset + 80)
        window.scrollTo({ top: topOffset, left: 0, behavior: 'smooth' })
    }

    const clearHandler = () => {
        refInput.current.value = ''
        searchHandler({ target: refInput.current })
    }

    const blurHandler = () => {
        refInput.current.setAttribute('data-changed', !!refInput.current.value)
    }

    useEffect(() => {
        setStickyOffset(window.innerWidth >= globalState.sizes.lg ? 100 : 50)
        refItems.current = refSearchedChildren.current.querySelectorAll(`.${style.brand}`)
    }, [])


    return (
        <MainLayout title={`Бренды`}>
            <Breadcrumbs link='Бренды' />
            <h1 className='text--h4 mb-2.5 mb-4:lg mt-2 mt-1.5:md mt-2:lg'>Бренды</h1>

            <Sticky external={style.brandSearch} fixed={style.brandSearchFixed} offset={stickyOffset}>
                <div className={`${style.search}`}>
                    <label className='input-search'>
                        <input onBlur={blurHandler} ref={refInput} onChange={searchHandler} type='text' className='input' placeholder='Поиск по брендам' />
                        <Icon external='input-search__icon' name='search' width='18' height='18' />
                        <span onClick={clearHandler} className='input-search__icon-clear'>
                            <Icon name='close' width='18' height='18' />
                        </span>
                    </label>
                </div>
                <div data-value={searchValue} className={style.brandLetters}>
                    {detail && detail.length
                        ? detail.map(item => (
                            <a
                                onClick={navHandler}
                                key={item.letter}
                                href={`#${item.letter === '0-9' ? 'num' : item.letter}`}
                                className='text--t3 text--bold'>{item.letter}</a>
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
            <div className='pb-2 pb-5:md' />
        </MainLayout>
    )
}

function BrandLine({ letter, brands }) {
    return (
        <section id={letter === '0-9' ? 'num' : letter} className={style.brandsLine}>
            <div className={`${style.letter} text--p1 text--bold`}>{letter}</div>
            {brands && brands.length
                ? brands.map(brand => (
                    <Link key={brand.name} href={`/brands/${brand.code}`}>
                        <a href={`/brands/${brand.code}`} className={`${style.brand} text--t4 text--normal`}>{brand.name}</a>
                    </Link>
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