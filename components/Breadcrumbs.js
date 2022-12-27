import { useState, useEffect, useRef } from 'react'
import useDeviceDetect from '../components/helpers/useDeviceDetect'

export default function Breadcrumbs() {
    const { isMobile } = useDeviceDetect()

    return (
        <div>
            <span>Главная ></span>
            <span>Каталог ></span>
            <span>Косметика для волос ></span>
            <span>Лечение волос ></span>
            <span>Бальзамы и кондиционеры</span>
        </div>
    )
}