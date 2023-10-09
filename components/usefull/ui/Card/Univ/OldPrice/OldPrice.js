import style from './style.module.scss'

export default function OldPrice({ price }) {
    return (
        <div className={`${style.priceOld} text--t5 text--bold`}>{price} ₽</div>
    )
}
