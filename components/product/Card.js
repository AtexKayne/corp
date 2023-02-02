import Image from 'next/image'
import { debounce } from '../helpers/debounce'
import { useState, useEffect, useRef } from 'react'
import style from '../../styles/module/Product/Card.module.scss'
import Icon from '../Icon'
import CardBuy from './CardBuy'

export default function Card({ info }) {
    const [count, setCount] = useState(0)
    const [activeImage, setActiveImage] = useState(0)
    const refImages = useRef(null)
    const refRect = useRef(false)

    useEffect(() => {
        refRect.current = refImages.current.getBoundingClientRect()

        refRect.current.x = refRect.current.x * 1.05
        refRect.current.width = refRect.current.width * 1.1
        console.log(refRect.current);
    }, [])
    

    const mouseMoveHandler = event => {
        const c = event.screenX - refRect.current.x
        const t = refRect.current.width / info.images.length
        const r = Math.min(info.images.length - 1, Math.floor(c/t))
        setActiveImage(r)
    }

    // const debounceMouseMove = debounce(mouseMoveHandler, 30)

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
            <div className='text--t6 text--normal text--upper pb-0.6 pt-1.5'>{info.secondaryName}</div>
            <div className='text--t4 text--normal text--upper pb-1'>{info.primaryName}</div>
            <div className='text--t2 text--normal pb-0.8'>
                <span data-hidden={!count} className={`${style.basket} text--t5 text--normal text--color-primary`}>
                    <Icon name='basket' width='19' height='16' /> 
                    <span>{count} шт x</span>
                </span>
                <span>{info.price} ₽</span>
            </div>
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
                    activeValue={info.values[0]}
                />
            </div>
        </div>
    )
}
