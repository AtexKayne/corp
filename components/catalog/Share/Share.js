import Icon from '../../Icon'
import Favourite from '../../usefull/Favourite'
import style from '../Catalog.module.scss'
import { useState } from 'react'

export default function Share({ name, isPromo, isBrands }) {
    const [isOpen, setIsOpen] = useState(false)

    const info = {
        primary: `${isBrands ? 'Бренд' : 'Раздел'} ${name}`,
        image: false,
    }

    const documentClick = () => {
        setIsOpen(false)
        document.removeEventListener('click', documentClick)
    }

    const open = () => {
        if (isOpen) {
            setIsOpen(false)
            document.removeEventListener('click', documentClick)
        } else {
            setIsOpen(true)
            setTimeout(() => document.addEventListener('click', documentClick), 200)
        }
    }

    const copyHandler = () => {
        setIsOpen(false)
        globalState.popover.open([`${isBrands ? 'Бренд' : 'Раздел'} ${name}`, 'ссылка скопирована в буфер обмена'], false)
    }

    return (
        <div data-open={isOpen} className={`${style.share}`}>
            {!isPromo
                ? <div className={style.favourite}>
                    <Favourite width='24' height='21' info={info} />
                </div> : <div className='mr-1.5:xl' />
            }

            <div onClick={open} className={`${style.iconShare} is-hidden--sm-down`}>
                <Icon name='share' width='24' height='24' />
            </div>
            <div className={`${style.additionalShare} ui-light is-hidden--sm-down`}>
                <div className={`${style.iconShare} btn btn--grey btn--xs`}>
                    <Icon name='VK' width='15' height='15' />
                </div>
                <div className={`${style.iconShare} btn btn--grey btn--xs`}>
                    <Icon name='telegram' width='15' height='15' />
                </div>
                <div onClick={copyHandler} className={`${style.iconShare} btn btn--grey btn--xs`}>
                    <Icon name='link' width='15' height='15' />
                </div>
            </div>
        </div>
    )
}
