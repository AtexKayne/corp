import style from '../../styles/module/brand/brand-image.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useContext } from 'react'

export default function BrandImage({ image }) {
    const { scroll } = useContext(SmoothScrollContext)
    const scrollHandler = event => {
        event.deltaY > 0 && scroll && scroll.scrollTo('#about')
    }
        
    return (
        <section id='image' data-scroll-section>
            <div data-scroll data-scroll-speed='10' onWheel={scrollHandler} className={style.image} style={{ backgroundImage: `url(${image})` }}>

            </div>
        </section>
    )
}
