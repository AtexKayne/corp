import Image from 'next/image'
import { debounce } from '../helpers/debounce'
import { useState, useEffect, useRef } from 'react'
import style from '../../styles/module/Product/Card.module.scss'
import Icon from '../Icon'
import CardBuy from './CardBuy'

export default function Card({ info }) {
    const [count, setCount] = useState(0)
    const [activeImage, setActiveImage] = useState(0)
    const [isNotify, setIsNotify] = useState(false)
    const refImages = useRef(null)
    const refRect = useRef(false)

    const resizeHandler = () => {
        refRect.current = refImages.current.getBoundingClientRect()
    }

    const debounceResize = debounce(resizeHandler, 60)

    useEffect(() => {
        refRect.current = refImages.current.getBoundingClientRect()
        window.addEventListener('resize', debounceResize)

        return () => {
            window.removeEventListener('resize', debounceResize)
        }
    }, [])


    const mouseMoveHandler = event => {
        const c = event.clientX - refRect.current.x
        const t = refRect.current.width / info.images.length
        const r = Math.min(info.images.length - 1, Math.floor(c / t))
        setActiveImage(r)
    }

    

    return (
        <div className={style.card}>
            <div ref={refImages} onMouseLeave={() => setActiveImage(0)} onMouseMove={mouseMoveHandler} className={style.images}>
                {info.images.map((image, index) => (
                    <div key={image} data-active={activeImage === index} className={style.image}>
                        <Image layout='fill' alt={info.primaryName} src={image} />
                    </div>
                ))}
                <div className={`${style.nav}`}>
                    {info.images.map((image, index) => (
                        <div key={image} data-active={activeImage === index} />
                    ))}
                </div>
            </div>
            <div className='text--t6 text--normal text--upper pb-0.6 pt-1.5'>{info.primaryName}</div>
            <div className='text--t4 text--normal text--upper pb-1'>{info.secondaryName}</div>
            {!info.isProfi && info.values[0].max !== 0
                ? <div className='text--t2 text--normal pb-0.8'>
                    <span data-hidden={!count} className={`${style.basket} text--t5 text--normal text--color-primary`}>
                        <Icon name='basket' width='19' height='16' />
                        <span>{count} шт x</span>
                    </span>
                    <span className={style.price}>
                        <span>{info.values[0].price.actual} ₽</span>
                        {info.values[0].price.old
                            ? <span className={`${style.priceOld} text--t3 text--bold`}>{info.values[0].price.old} ₽</span> : null
                        }
                    </span>
                </div> : null
            }

            {info.values[0].max === 0
                ? <div className='text--t2 text--normal pb-0.8'>
                    <span className={`text--color-tetriary pr-0.5 ${isNotify ? '' : 'is-hidden'}`}>
                        <Icon name='bellFill' width='14' height='14' />
                    </span>
                    <span>Нет в наличии</span>
                </div> : null
            }
            <div className={style.colors}>
                <div className={style.color} data-color='black' />
                <div className='text--t6 text--upper text--normal'>Черный</div>
            </div>

            <div className={`${style.buyBtn} mt-2`}>
                <CardBuy
                    isProfi={info.isProfi}
                    image={info.images[0]}
                    setInBasket={setCount}
                    max={info.values[0].max}
                    name={info.secondaryName}
                    isNotify={isNotify}
                    activeValue={info.values[0]}
                    setIsNotify={setIsNotify}
                />
            </div>
        </div>
    )
}
