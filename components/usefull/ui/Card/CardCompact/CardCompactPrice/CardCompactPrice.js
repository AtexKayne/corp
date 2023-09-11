// import { useState, useEffect, useRef } from 'react'
import CardBuy from '../../CardBuy/CardBuy'
import CardCompactButton from '../CardCompactButton/CardCompactButton'
import style from './style.module.scss'

export default function CardCompactPrice({ info, count, onUpdateInBasket }) {

    return (
        <div className={style.price}>
            {!info.isProfi && info.max !== 0
                ? <div className={` text--t2 text--normal pb-0.8`}>
                    <div>{info.price.actual} ₽</div>
                    {info.price.old
                        ? <div className={`${style.priceOld} text--t3 text--bold`}>{info.price.old} ₽</div> : null
                    }
                </div> : null
            }

            {info.max === 0
                ? <div className={` text--t2 text--normal pb-0.8`}>
                    <span className='text--no-wrap'>Нет в наличии</span>
                </div> : null
            }

            <CardCompactButton count={count} info={info} onUpdateInBasket={onUpdateInBasket}/>
        </div>
    )
}