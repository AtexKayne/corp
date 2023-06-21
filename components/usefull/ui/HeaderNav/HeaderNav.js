import { useState, useEffect, useRef } from 'react'
import { catalogNav } from '../../../helpers/categories'
import { globalState } from '../../../helpers/globalState'

import Link from 'next/link'
import style from './Header-nav.module.scss'

export default function HeaderNav({ isOpen, setIsOpen, isHeaderFixed }) {
    const catalog = catalogNav.data
    const [categoryLevels, setCategoryLevels] = useState([])
    const [selected, setSelected] = useState({})
    // const categoryLevels = []
    const panelLinks = [
        { text: 'Хиты', link: '/' },
        { text: 'Новинки', link: '/' },
        { text: 'Идеи для подарков', link: '/' },
        { text: 'Подборки', link: '/set' },
        { text: 'Со скидкой', link: '/promo' },
    ]

    const reqursiveSet = (array, index) => {
        const elements = []
        array.forEach(item => {
            elements.push(item)
            if (item.hasOwnProperty('include_sections')) {
                reqursiveSet(item.include_sections, index + 1)
            }
        })
        setCategoryLevels(prev => {
            prev[index] = prev[index] ? [...prev[index], ...elements] : [...elements]
            return prev
        })
    }

    useEffect(() => {
        reqursiveSet(catalog, 0)
        if (!globalState.body) return

        if (isOpen) globalState.body.addClass('overflow-hidden')
        else globalState.body.removeClass('overflow-hidden')

        return () => {
            setCategoryLevels([])
        }
    }, [isOpen])


    return (
        <div data-open={isOpen} data-fixed={isHeaderFixed} className={style.navWrapper}>
            <div className={style.background} />
            <div className={style.containerWrapper}>
                <div className={`${style.container} container`}>
                    <div className={style.panel}>
                        {panelLinks.map(link => <PanelNav key={link.text} text={link.text} link={link.link} />)}
                    </div>
                    {categoryLevels && categoryLevels.length
                        ? categoryLevels.map((level, index) => (
                            <div key={index} className={style.column}>
                                {level.map((cat, index) => (
                                    <Cat info={cat} selected={selected} setSelected={setSelected} key={`${index}`} />
                                ))}
                            </div>
                        ))
                        : null
                    }
                </div>
            </div>

        </div>
    )
}

function Cat({ info, selected, setSelected }) {
    const hoverHandler = () => {
        let id
        if (info.depth_level === 1) {
            id = info.id
        } else if (info.depth_level > 1) {
            id = info.parent_id
        }
        setSelected({id, lvl: info.depth_level})
    }
    return (
        <Link href={`/catalog${info.url}`}>
            <a
                onMouseEnter={hoverHandler}
                href={`/catalog${info.url}`}
                data-selected={selected.id === info.parent_id}
                className={`${style.catalogLink} mb-0.8:xxl mr-1:lg mr-0:xxl`}>
                {info.name}
            </a>
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