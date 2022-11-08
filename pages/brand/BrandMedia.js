import style from '../../styles/module/brand/brand-media.module.scss'
import { useEffect, useRef, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Arrow from '../../components/Arrow'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { motion, useTransform, useMotionValue } from 'framer-motion'

export default function BrandMedia({ media = [] }) {
    const refContainer = useRef(null)
    const refSection = useRef(null)
    const refWrapper = useRef(null)
    const refStartPos = useRef(null)
    const { scroll } = useContext(SmoothScrollContext)
    const y = useMotionValue(0)
    const scrollPosition = useTransform(y, [0, media.length * 150], ['-80%', '20%'])
    function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    useEffect(() => {
        // if (!scroll) return
        // let isScrolling = false
        // const images = Array.from(refWrapper.current.childNodes)
        // function getRandomInt(max) {
        //     return Math.floor(Math.random() * max);
        // }
        // images.forEach((image, index) => {
        //     const rect = image
        //     image.style.marginTop = getRandomInt(40) + 'px'
        // })
        // const scrollHandler = event => {
        //     if (!refContainer.current.classList.contains('is-inview')) return
        //     if (!refStartPos.current) refStartPos.current = Math.floor(event.scroll.y)
        //     y.set(event.scroll.y - refStartPos.current)
        //     if (!isScrolling) {
        //         isScrolling = true
        //         setTimeout(() => {
        //             images.forEach((image, index) => {
        //                 const rect = image
        //                 if (index === 0) {
        //                     console.log(rect);
        //                 }
        //             })
        //             isScrolling = false
        //         }, 1000)
        //     }
        // }

        // const observerHandler = entries => {
        //     entries.forEach(entry => {
        //         if (!entry.isIntersecting) refContainer.current.classList.remove('is-inview')
        //         else if (refStartPos.current) refContainer.current.classList.add('is-inview')
        //     })
        // }
        // const observer = new IntersectionObserver(observerHandler, { threshold: 0 })
        // observer.observe(refSection.current)
        // scroll.on('scroll', scrollHandler)

        // return () => {
        //     scroll.off('scroll', scrollHandler)
        //     observer.disconnect()
        // }
    }, [scroll])

    return (
        <section ref={refSection} id='media' style={{ height: `${media.length * 150}px`, marginTop: '-1px' }} data-scroll-section>
            <div
                ref={refContainer}
                // data-scroll
                // data-scroll-sticky
                // data-scroll-target='#media'
                className={style.container}>
                <h2 className={`${style.title} text--h1 pb-1 c-hover`}>
                    Медиа
                    <Arrow />
                </h2>

                {/* <div className={style.wrapper}>
                    <motion.div ref={refWrapper} style={{ x: scrollPosition, width: `calc(15vw * ${media.length / 2})` }} className={style.inner}> */}
                {media ?
                    media.map((element, index) => (
                        // @TODO Replace key
                        <div className={`${style.imageNew} c-hover`} key={index}>
                            <Image data-scroll data-scroll-speed={randomInteger(0, 3)} src={element} alt='media' width='276' height='276' />
                        </div>
                    )) : ''
                }
                {/* </motion.div>
                    <div className={style.background} />
                </div> */}
            </div>
        </section>
    )
}
