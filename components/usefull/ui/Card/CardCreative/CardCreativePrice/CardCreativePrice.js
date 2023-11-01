import style from './style.module.scss'
import OldPrice from '../../Univ/OldPrice/OldPrice'

export default function CardCreativePrice({ info }) {

    if (info.max === 0) {
        return (
            <div className={`${style.price}`}>
                <span className={style.priceEmpty}>Нет <nobr>в наличии</nobr></span>
            </div>
        )
    }

    if (info.isProfi) {
        return null
    }

    return (
        <span className={`${style.price}`}>
            <span className={style.actualPrice}>{info.price.actual.toLocaleString()} ₽</span>
            {info.price.old ? <OldPrice price={info.price.old.toLocaleString()} /> : null}
        </span>
    )
}
