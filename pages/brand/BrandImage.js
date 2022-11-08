import style from '../../styles/module/brand/brand-image.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { ThemeContext } from '../../components/helpers/ThemeContext'
import { useContext, useEffect, useState, useRef } from 'react'
import { motion, useTransform, useMotionValue } from 'framer-motion'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'

export default function BrandImage({ image, imageMobile, about }) {
    const { scroll } = useContext(SmoothScrollContext)
    const { theme, setTheme } = useContext(ThemeContext)
    const [leftPosition, setLeftPosititon] = useState(0)
    const refImage = useRef(null)
    const y = useMotionValue(0)
    const scaleTransform = useTransform(y, [0, 400], [1, 0.7])
    const yTransform = useTransform(y, [400, 550], [0, -400])
    const { isMobile } = useDeviceDetect()

    useEffect(() => {
        if (!scroll) return
        
        const scrollHandler = event => {
            const scrollY = event.scroll.y
            y.set(scrollY)
            if (scrollY > 200 && theme !== 'ui-light') setTheme('ui-light')
            else if (scrollY <= 200 && theme !== 'ui-transparent') setTheme('ui-transparent')
        }

        const mobileScrollHandler = event => {
            const scrollY = document.body.scrollTop
            y.set(scrollY)
            if (scrollY > 200 && theme !== 'ui-light') setTheme('ui-light')
            else if (scrollY <= 200 && theme !== 'ui-transparent') setTheme('ui-transparent')
        }

        if (isMobile) document.body.addEventListener('scroll', mobileScrollHandler)
        else scroll.on('scroll', scrollHandler)


        return () => {
            if (typeof window !== 'undefined') document.body.addEventListener('scroll', mobileScrollHandler)
            scroll.off('scroll', scrollHandler)
        }
    }, [scroll])

    useEffect(() => {
        setTheme('ui-transparent')
        if (isMobile) return
        setTimeout(() => {
            const offsetX = refImage.current.getBoundingClientRect().x
            setLeftPosititon(-offsetX)
        }, 700)
    }, [])

    const wheelHandler = event => {
        if (!scroll && !isMobile) return
        if (event.deltaY > 0 && y.get() < 350) {
            scroll.scrollTo(400)
        }
        if (event.deltaY < 0 && y.get() > 400) {
            scroll.scrollTo(0)
        }
    }

    return (
        <section onWheel={wheelHandler} id='image' data-scroll-section style={{ minHeight: '100vh' }}>
            <motion.div data-scroll data-sticky data-scroll-target='#image' className={`${theme} p-relative`}>
                <motion.div ref={refImage} className={style.image} style={{ backgroundImage: `url(${isMobile ? imageMobile : image})`, x: leftPosition, scale: scaleTransform, y: yTransform }} />
                <h1 className={`${style.title} text--h1`}>{about ? about.name : ''}</h1>
            </motion.div>
        </section>
    )
}
