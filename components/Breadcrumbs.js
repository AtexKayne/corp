import { useState, useEffect, useRef } from 'react'
import style from '../styles/module/Breadcrumbs.module.scss'

export default function Breadcrumbs() {
    const refBreadcrumbs = useRef(null)
    const refInner = useRef(null)

    useEffect(() => {
        const scrollWidth = refBreadcrumbs.current.scrollWidth
        const clientWidth = refInner.current.clientWidth

        setTimeout(() => {
            if (scrollWidth <= clientWidth) return
            refBreadcrumbs.current.scrollTo({
                left: scrollWidth,
                behavior: 'smooth'
            })
        }, 2000);
    }, [])


    return (
        <div ref={refBreadcrumbs} className={`${style.breadcrumbs} text--p5 text--color-small`}>
            <div ref={refInner} className={style.inner}>
                <span>Главная</span>
                <span>Каталог</span>
                <span>Косметика для волос</span>
                <span>Лечение волос</span>
                <span>Бальзамы и кондиционеры</span>
            </div>
        </div>
    )
}