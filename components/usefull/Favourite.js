import Icon from '../Icon'
import { useState } from 'react'
import { globalState } from '../helpers/globalState'
import style from '../../styles/module/usefull/Favourite.module.scss'

export default function Favourite({ width, height, info, isActive = false, external = '' }) {
    const [isFavourite, setIsFavourite] = useState(isActive)

    const favouriteHandler = () => {
        const text = !isFavourite ? 'ТЕПЕРЬ В ИЗБРАННОМ' : 'БОЛЬШЕ НЕ В ИЗБРАННОМ'
        setIsFavourite(!isFavourite)
        globalState.popover.setTextPrimary(info.primary)
        globalState.popover.setImage(info.image)
        globalState.popover.setTextSecondary(text)
        globalState.popover.setIsBasket(false)
        globalState.popover.setIsOpen(true)
    }

    return (
        <div
            onClick={favouriteHandler}
            data-active={isFavourite}
            className={`${external} ${style.favourite}`}
            style={{minWidth: `${width}px`, minHeight: `${height}px`}}>

            <Icon name='heartMD' width={width} height={height} />
            <Icon name='heartFill' width={width} height={height} />
        </div>
    )
}