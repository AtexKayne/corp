import style from './style.module.scss'
import OldPrice from '../../Univ/OldPrice/OldPrice'

export default function CardPrice({ info }) {

    if (info.max === 0) {
        return (
            <div className={`${style.priceContainer} text--t2 text--normal`}>
                <span>Нет в наличии</span>
            </div>
        )
    }

    if (info.isProfi) {
        return null
    }

    return (
        <div className={`${style.priceContainer} text--t2 text--normal`}>
            <span className={style.price}>
                <span>{info.price.actual.toLocaleString()} ₽</span>
                {info.price.old ? <OldPrice price={info.price.old.toLocaleString()} /> : null}
            </span>
        </div>
    )
}
