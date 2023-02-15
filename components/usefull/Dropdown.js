import Icon from '../Icon'
import { useState, useEffect, useRef } from 'react'
import style from '../../styles/module/usefull/Dropdown.module.scss'

export default function Dropdown({ children, title, external = '', afterChose }) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeValue, setActiveValue] = useState(title)
    const refChildList = useRef(null)

    const clickHandler = event => {
        setIsOpen(false)
        const target = event.target
        setActiveValue(target.innerHTML)
        const prevActive = refChildList.current.querySelector('[data-active="true"]')
        if (prevActive) prevActive.setAttribute('data-active', false)
        target.setAttribute('data-active', true)
        if (typeof afterChose === 'function') afterChose(target)
    }

    const documentClick = event => {
        if (event.target.closest(`.${style.dropdown}`)) {
            
        } else {
            setIsOpen(false)
            document.removeEventListener('click', documentClick)
        }
    }

    const setOpen = () => {
        setIsOpen(!isOpen)
        document.addEventListener('click', documentClick)
    }
    
    return (
        <div data-open={isOpen} className={style.dropdown}>
            <div onClick={setOpen} className={style.dropdownActive}>
                <span className={external}>{activeValue}</span>
                <Icon external={style.dropdownIcon} name='dropdown' width='16' height='16' />
            </div>

            <div ref={refChildList} onClick={clickHandler} className={style.dropList}>
                {children}
            </div>
        </div>
    )
}