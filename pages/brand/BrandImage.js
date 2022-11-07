import style from '../../styles/module/brand/brand-image.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { ThemeContext } from '../../components/helpers/ThemeContext'
import { useContext, useEffect, useState, useRef } from 'react'
import { motion, useTransform, useMotionValue } from 'framer-motion'

export default function BrandImage({ image, about }) {
    const { scroll } = useContext(SmoothScrollContext)
    const { theme, setTheme } = useContext(ThemeContext)
    const [leftPosition, setLeftPosititon] = useState(0)
    const refImage = useRef(null)
    const y = useMotionValue(0)
    const scaleTransform = useTransform(y, [0, 600], [1, 0.4])
    const yTransform = useTransform(y, [500, 550], [0, -300])

    useEffect(() => {
        if (!scroll) return
        const scrollHandler = event => {
            const scrollY = event.scroll.y
            y.set(scrollY)
            if (scrollY > 200 && theme !== 'ui-light') setTheme('ui-light')
            else if (scrollY <= 200 && theme !== 'ui-transparent') setTheme('ui-transparent')
        }

        scroll.on('scroll', scrollHandler)

        return () => {
            scroll.off('scroll', scrollHandler)
        }
    }, [scroll])

    useEffect(() => {
        setTheme('ui-transparent')
        setTimeout(() => {
            const offsetX = refImage.current.getBoundingClientRect().x
            setLeftPosititon(-offsetX)
        }, 700)
    }, []);

    return (
        <section id='image' data-scroll-section style={{ minHeight: '100vh' }}>
            <motion.div data-scroll data-sticky data-scroll-target='#image' className={`${theme} p-relative`}>
                <motion.div ref={refImage} className={style.image} style={{ backgroundImage: `url(${image})`, x: leftPosition, scale: scaleTransform, y: yTransform }} />
                <h1 className={`${style.title} text--h1`}>{ about ? about.name : '' }</h1>
            </motion.div>
        </section>
    )
}
