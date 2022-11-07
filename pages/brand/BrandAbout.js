import style from '../../styles/module/brand/brand-about.module.scss'
import Image from 'next/image'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useContext, useEffect, useRef } from 'react'
import InfoLine from '../../components/InfoLine'

export default function BrandAbout({ about, imagePosition, setImagePosition }) {
    const { scroll } = useContext(SmoothScrollContext)
    const refSection = useRef(null)
    const refOffsetTop = useRef(false)
    useEffect(() => {
        if (!scroll) return
        const scrollHandler = event => {
            if (!refSection.current.hasAttribute('data-scroll-section-inview')) return
            if (!refOffsetTop.current) refOffsetTop.current = refSection.current.offsetTop
            const scrollPosition = event.scroll.y - refOffsetTop.current
            
            if (scrollPosition > -100) setImagePosition('scrollbar')
            else setImagePosition('about')

        }
        scroll.on('scroll', scrollHandler)

        return () => {
            scroll.off('scroll', scrollHandler)
        }
    }, [scroll])

    return (
        <section 
            id='about'
            ref={refSection}
            data-scroll-section
            // data-scroll-speed='10'
            style={{minHeight: 0}}
            className={style.container}>
            <div className='col col--60 pr-1'>
                <InfoLine textBold={'Страна происхождения'} textThin={about ? about.country : ''}/>
                <p className='text--t2'>{ about ? about.description : '' }</p>
            </div>
            <div className='col col--40 col--center'>
                <div className={style.image} data-position={imagePosition}>
                    <Image src={about ? about.image : ''} width='240' height='240' alt={ about ? about.name : '' }/>
                </div>
            </div>
        </section>
    )
}
