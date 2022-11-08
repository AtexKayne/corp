import style from '../../styles/module/brand/brand-media.module.scss'
import { useEffect, useRef, useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Arrow from '../../components/Arrow'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { motion, useTransform, useMotionValue } from 'framer-motion'

export default function BrandMedia({ media = [] }) {
    const y = useMotionValue(0)
    const refInner = useRef(null)
    const refSection = useRef(null)
    const refWrapper = useRef(null)
    const [margin, setMargin] = useState('0')
    const [maxRange, setMaxRange] = useState(-240)
    const { scroll } = useContext(SmoothScrollContext)
    const scrollPosition = useTransform(y, [0, media.length * 150], ['-80%', '20%'])

    useEffect(() => {
        const clientRect = refWrapper.current.getBoundingClientRect()
        setMargin(`0 -${clientRect.x - 200}px`)
    }, [])

    useEffect(() => {
        let scrollWidth = 0
        const innerElements = Array.from(refInner.current.childNodes)
        innerElements.forEach(el => scrollWidth += el.offsetWidth + 20)
        setMaxRange(refWrapper.current.clientWidth - 70 - scrollWidth / 2.5)
    }, [margin])

    return (
        <section ref={refSection} id='media' data-scroll-section>
            <div className={style.container}>
                <h2 className={`${style.title} text--h1 pb-1 c-hover`}>
                    Медиа
                    <Arrow />
                </h2>

                <div ref={refWrapper} style={{ margin: margin }} className={`${style.wrapper} c-dragh`}>
                    <motion.div ref={refInner} drag='x' dragConstraints={{ left: maxRange, right: 0 }} className={style.inner}>
                        {media ?
                            media.map((element, index) => (
                                // @TODO Replace key
                                <div className={`${style.image} c-hover`} key={index}>
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
