import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import style from '/styles/module/Breadcrumbs.module.scss'

export default function Breadcrumbs({ link, theme }) {
    const refBreadcrumbs = useRef(null)
    const refInner = useRef(null)

    useEffect(() => {
        const scrollWidth = refBreadcrumbs.current.scrollWidth
        const clientWidth = refInner.current.clientWidth

        setTimeout(() => {
            if (scrollWidth <= clientWidth || !refBreadcrumbs.current) return
            refBreadcrumbs.current.scrollTo({
                left: scrollWidth,
                behavior: 'smooth'
            })
        }, 1000);
    }, [])


    return (
        <div ref={refBreadcrumbs} className={`${style.breadcrumbs} ${theme === 'dark' ? 'ui-dark' : ''} text--p5 text--color-small`}>
            <div ref={refInner} data-theme={theme === 'dark' ? 'ui-dark' : 'ui-light'} className={style.inner}>
                <Link href='/'>
                    <a href='/'>Главная</a>
                </Link>
                {Array.isArray(link)
                    ? link.map(element => (
                        <Link key={element} href={element.split('|')[1]}>
                            <a href={element.split('|')[1]}>{element.split('|')[0]}</a>
                        </Link>
                    ))
                    : <>
                        <span>Каталог</span>
                        <span>Косметика для волос</span>
                        <span>Лечение волос</span>
                        <span>Бальзамы и кондиционеры</span>
                    </>
                }
            </div>
        </div>
    )
}