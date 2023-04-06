import { useState, useEffect, useRef } from 'react'
import { catalogNav } from '../../../helpers/categories'
import { globalState } from '../../../helpers/globalState'

import Link from 'next/link'
import style from './Header-nav.module.scss'

export default function HeaderNav({ isOpen, setIsOpen, isHeaderFixed }) {
    const catalog = catalogNav.data
    const panelLinks = [
        { text: 'Хиты', link: '/' },
        { text: 'Новинки', link: '/' },
        { text: 'Идеи для подарков', link: '/' },
        { text: 'Подборки', link: '/set' },
        { text: 'Со скидкой', link: '/promo' },
    ]
    useEffect(() => {
        if (!globalState.body) return

        if (isOpen) globalState.body.addClass('overflow-hidden')
        else globalState.body.removeClass('overflow-hidden')
    }, [isOpen])


    return (
        <div data-open={isOpen} data-fixed={isHeaderFixed} className={style.navWrapper}>
            <div className={style.background} />
            <div className={style.containerWrapper}>
                <div className={`${style.container} container`}>
                    <div className={style.panel}>
                        {panelLinks.map(link => <PanelNav key={link.text} text={link.text} link={link.link} />)}
                    </div>
                    <div className={style.column}>
                        {catalog.map(cat => <Cat info={cat} key={cat.id} />)}
                    </div>
                    <div className={style.column}></div>
                    <div className={style.column}></div>
                    <div className={style.column}></div>
                </div>
            </div>

        </div>
    )
}

function Cat({ info, selected, setSelected }) {
    return (
        <Link href={info.url}>
            <a href={info.url} data-selected={selected} className={`${style.catalogLink} mb-0.8:xxl mr-1:lg mr-0:xxl`}>{info.name}</a>
        </Link>
    )
}

function PanelNav({ link, text }) {
    return (
        <Link href={link}>
            <a href={link} className={`${style.panelLink} mb-0.8:xxl mr-1:lg mr-0:xxl`}>{text}</a>
        </Link>
    )
}