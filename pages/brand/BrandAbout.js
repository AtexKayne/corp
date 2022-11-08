import style from '../../styles/module/brand/brand-about.module.scss'
import Image from 'next/image'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useContext, useEffect, useRef } from 'react'
import InfoLine from '../../components/InfoLine'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'

export default function BrandAbout({ about, imagePosition, setImagePosition }) {
    const { scroll } = useContext(SmoothScrollContext)
    const refSection = useRef(null)
    const refOffsetTop = useRef(false)
    const { isMobile } = useDeviceDetect()

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
            style={{ minHeight: 0 }}
            className={`${style.container} d-flex ${isMobile ? 'flex--column-reverse' : ''}`}>
            <div className='col col--60 pr-0 pr-1:md'>
                <InfoLine textBold={'Страна происхождения'} textThin={about ? about.country : ''} />
                <p className='text--t2 pt-2 pt-0:md'>{about ? about.description : ''}</p>
            </div>
            <div className={`col col--40 ${isMobile ? '' : 'col--center'}`}>
                <div className={style.image} data-position={imagePosition}>
                    <Image src={about ? about.image : ''} width={isMobile ? 153 : 240} height={isMobile ? 153 : 240} alt={about ? about.name : ''} />
                </div>
            </div>
        </section>
    )
}
