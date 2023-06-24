import { useState } from 'react'
import style from './style.module.scss'
import Link from 'next/link'
import { globalState } from '../../../helpers/globalState'

export default function ColorPicker({ items = [], isChose = false }) {
    // @TODO Доделать разноцветный
    if (!items || !items.length) return null
    const [isActive, setIsActive] = useState(false)
    const [activeValueName, setActiveValueName] = useState(items[0].name)
    const [activeValueColor, setActiveValueColor] = useState(items[0].iconColor)

    const clickHandler = () => {
        setIsActive(false)
        document.removeEventListener('click', clickHandler)
    }

    const openHandler = () => {
        if (window.innerWidth >= globalState.sizes.lg) {
            if (!isActive) {
                setTimeout(() => document.addEventListener('click', clickHandler), 100)
            }
            setIsActive(!isActive)
        } else {
            globalState.modal.open('colorsSecond', true)
        }
    }

    const choseHandler = item => {
        setActiveValueName(item.name)
        setActiveValueColor(item.iconColor)
    }

    return (
        <div data-active={isActive} className={`${style.colorPicker} text--t4`}>
            <div onClick={openHandler} className={style.colorActive}>
                <span className={style.colorActiveIcon} style={{ backgroundColor: activeValueColor }} />
                <span className={style.colorActiveName}>{activeValueName}</span>
            </div>

            <div className={style.dropdown}>
                <div className={style.dropdownList}>
                    {items.map(item => {
                        let iconStyle = ''
                        const name = item.name.toLowerCase()
                        if (name === 'белый') {
                            iconStyle = style.iconWhite
                        } else if (name === 'разноцветный') {
                            iconStyle = style.iconColorfull
                        }
                        return isChose
                            ? <UnlinkedItem key={item.name} item={item} iconStyle={iconStyle} currentName={activeValueName} choseHandler={choseHandler} />
                            : <LinkedItem key={item.name} item={item} iconStyle={iconStyle} currentName={activeValueName} />
                    })}
                </div>
            </div>
        </div>
    )
}

function UnlinkedItem({ item, choseHandler, currentName, iconStyle }) {
    return (
        <div key={item.name} onClick={() => choseHandler(item)} data-active={currentName === item.name} className={style.colorItem}>
            <span className={`${style.colorItemIcon} ${iconStyle}`} style={{ backgroundColor: item.iconColor }} />
            <span className={style.colorItemName}>{item.name}</span>
        </div>
    )
}

function LinkedItem({ item, currentName, iconStyle }) {
    return (
        <Link key={item.name} href={item.link}>
            <div key={item.name} onClick={() => choseHandler(item)} data-active={currentName === item.name} className={style.colorItem}>
                <span className={`${style.colorItemIcon} ${iconStyle}`} style={{ backgroundColor: item.iconColor }} />
                <span className={style.colorItemName}>{item.name}</span>
            </div>
        </Link>
    )
}