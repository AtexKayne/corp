import Image from 'next/image'
import Arrow from '../../components/Arrow'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import style from '../../styles/module/brand/brand-media.module.scss'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'

export default function BrandMedia({ media = [] }) {
    const refInner = useRef(null)
    const refSection = useRef(null)
    const refWrapper = useRef(null)
    const { isMobile } = useDeviceDetect()
    const [hover, setHover] = useState(false)
    const [margin, setMargin] = useState('0')
    const animateWrapper = useAnimationControls()
    const [maxRange, setMaxRange] = useState(-240)
    const isInView = useInView(refInner, { once: true })

    useEffect(() => {
        if (isInView) {
            animateWrapper.start({ x: -150, pointerEvents: 'none', transition: { duration: 0.5, delay: 0.5 } })
                .then(() => animateWrapper.start({ x: 0, pointerEvents: 'all', transition: { duration: 0.5, delay: 0.5 } }))
                .then(() => animateWrapper.start({ x: maxRange * 1.1, transition: { duration: 60, delay: 1, type: 'tween' } }))
        }
    }, [isInView]);

    useEffect(() => {
        setTimeout(() => {
            const clientRect = refWrapper.current.getBoundingClientRect()
            if (isMobile) setMargin('30px calc(var(--spacing) * -1)')
            else setMargin(`0 -${clientRect.x - 200}px`)
        }, 300)
    }, [])

    useEffect(() => {
        if (isMobile) setMargin('30px calc(var(--spacing) * -1)')
    }, [isMobile])

    useEffect(() => {
        let scrollWidth = 0
        const innerElements = Array.from(refInner.current.childNodes)
        innerElements.forEach(el => scrollWidth += el.offsetWidth + 20)
        if (isMobile) setMaxRange(refWrapper.current.clientWidth - 40 - scrollWidth / 2.7)
        else setMaxRange(refWrapper.current.clientWidth - 90 - scrollWidth / 2.5)
    }, [margin])

    return (
        <section ref={refSection} id='media' data-scroll-section>
            <div className={style.container}>
                <h2 data-hover={hover} className={`${style.title} text--h1 pb-1 c-hover`}>
                    Медиа
                    <Arrow />
                </h2>

                <div ref={refWrapper} style={{ margin: margin }} className={`${style.wrapper} c-dragh`}>
                    <motion.div animate={animateWrapper} ref={refInner} drag='x' dragConstraints={{ left: maxRange, right: 0 }} className={style.inner}>
                        {media ?
                            media.map((element, index) => (
                                // @TODO Replace key
                                <div
                                    onMouseEnter={() => setHover(true)}
                                    onMouseLeave={() => setHover(false)}
                                    className={`${style.image} c-dragh`}
                                    key={index}>
                                    <Image src={element} alt='media' width='276' height='276' />
                                </div>
                            )) : ''
                        }

                        <div className={`${style.image} ${style.allMedia} c-hover`}>
                            <div>+{media.length} файлов</div>
                        </div>
                    </motion.div>
                    <div className={style.background} />
                </div>
            </div>
        </section>
    )
}
