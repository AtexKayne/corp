import style from './style.module.scss'
import OldPrice from '../../Univ/OldPrice/OldPrice'

export default function CardPrice({ info }) {

    if (info.max === 0) {
        return (
            <div className={`${style.price} text--t2 text--normal`}>
                <span>Нет <nobr>в наличии</nobr></span>
            </div>
        )
    }

    if (info.isProfi) {
        return (
            <div className={`${style.price}`} />
        )
    }

    return (
        <span className={`${style.price} text--t2 text--normal`}>
            <span>{info.price.actual.toLocaleString()} ₽</span>
            {info.price.old ? <OldPrice price={info.price.old.toLocaleString()} /> : null}
        </span>
    )
}
