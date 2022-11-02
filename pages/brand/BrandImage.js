import style from '../../styles/module/brand/brand-image.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useContext, useEffect, useState, useRef } from 'react'

export default function BrandImage({ image }) {
    const { scroll } = useContext(SmoothScrollContext)
    const scrollHandler = event => {
        event.deltaY > 0 && scroll && scroll.scrollTo('#about')
    }
    const [leftPosition, setLeftPosititon] = useState(0)
    const refImage = useRef()
    useEffect(() => {
        const offsetX = refImage.current.getBoundingClientRect().x
        setLeftPosititon(-offsetX)
    }, []);
        
    return (
        <section id='image' data-scroll-section className='p-relative'>
            <div ref={refImage} onWheel={scrollHandler} className={style.image} style={{ backgroundImage: `url(${image})`, transform: `translateX(${leftPosition}px)` }}>

            </div>
        </section>
    )
}
