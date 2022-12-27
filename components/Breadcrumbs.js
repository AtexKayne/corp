// import { useState, useEffect, useRef } from 'react'
import style from '../styles/module/Breadcrumbs.module.scss'

export default function Breadcrumbs() {

    return (
        <div className={`${style.breadcrumbs} text--p5 text--color-small`}>
            <div className={style.inner}>
                <span>Главная</span>
                <span>Каталог</span>
                <span>Косметика для волос</span>
                <span>Лечение волос</span>
                <span>Бальзамы и кондиционеры</span>
            </div>
        </div>
    )
}