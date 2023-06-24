import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import Icon from '../../../../Icon'

export default function CardPrice({ value, isProfi, mode, countInBasket }) {

    return (
        <>
            {!isProfi && value.max !== 0
                ? <div className={`${style.priceContainer} text--t2 text--normal pb-0.8`}>

                    <span data-hidden={!countInBasket} className={`${style.basket} text--t5 text--normal text--color-primary`}>
                        <Icon name='basket' width='19' height='16' />
                        <span>{countInBasket} шт x</span>
                    </span>

                    <span className={style.price}>
                        <span>{value.price.actual} ₽</span>
                        {value.price.old
                            ? <span className={`${style.priceOld} text--t3 text--bold`}>{value.price.old} ₽</span> : null
                        }
                    </span>
                    
                </div> : null
            }

            {value.art && mode === 'inline'
                ? <div className={`${style.art} text--t6 text--normal text--color-small`}>{value.art}</div> : null
            }

            <div className={`${style.bonuses} text--t5 text--normal text--color-small`}>
                {value.bonuses && mode === 'inline'
                    ? <>
                        <span>{value.bonuses}</span>
                        <span className='color--primary'>
                            <svg width='10' height='14' viewBox='0 0 10 14'>
                                <path fillRule='evenodd' clipRule='evenodd' d='M6.70059 7.3973L9.23541 11H7.51588L5.15894 7.53223H3.306V11H1.82365V7.54218L0.505289 7.54821L0.499512 6.36054L1.82365 6.35449V2H5.98906C7.87165 2 9.1613 3.10645 9.1613 4.76612C9.1613 6.38531 7.96059 7.24888 6.70059 7.3973ZM5.79635 6.34483C6.86365 6.34483 7.63447 5.71065 7.63447 4.76612C7.63447 3.82159 6.86365 3.18741 5.79635 3.18741H3.306V6.34483H5.79635Z' fill='#E21B25' />
                            </svg>
                        </span>
                    </>
                    : null
                }
            </div>

            {value.max === 0
                ? <div className={`${style.priceContainer} text--t2 text--normal pb-0.8`}>
                    <span>Нет в наличии</span>
                </div> : null
            }
        </>
    )
}
