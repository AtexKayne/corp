import style from '../../styles/module/brand/brand-media.module.scss'
import { useEffect, useRef, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Arrow from '../../components/Arrow'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { motion, useTransform, useMotionValue } from 'framer-motion'

export default function BrandMedia({ media }) {
    const refContainer = useRef(null)
    const refSection = useRef(null)
    const refWrapper = useRef(null)
    const refStartPos = useRef(null)
    const { scroll } = useContext(SmoothScrollContext)
    const y = useMotionValue(0)
    const scrollPosition = useTransform(y, [0, media.length * 150], ['-80%', '20%'])

    useEffect(() => {
        if (!scroll) return
        let isScrolling = false
        const images = Array.from(refWrapper.current.childNodes)
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        images.forEach((image, index) => {
            const rect = image
            image.style.marginTop = getRandomInt(40) + 'px'
        })
        const scrollHandler = event => {
            if (!refContainer.current.classList.contains('is-inview')) return
            if (!refStartPos.current) refStartPos.current = Math.floor(event.scroll.y)
            y.set(event.scroll.y - refStartPos.current)
            if (!isScrolling) {
                isScrolling = true
                setTimeout(() => {
                    images.forEach((image, index) => {
                        const rect = image
                        if (index === 0) {
                            console.log(rect);
                        }
                    })
                    isScrolling = false
                }, 1000)
            }
        }

        const observerHandler = entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) refContainer.current.classList.remove('is-inview')
                else if (refStartPos.current) refContainer.current.classList.add('is-inview')
            })
        }
        const observer = new IntersectionObserver(observerHandler, { threshold: 0 })
        observer.observe(refSection.current)
        scroll.on('scroll', scrollHandler)

        return () => {
            scroll.off('scroll', scrollHandler)
            observer.disconnect()
        }
    }, [scroll])

    return (
        <section ref={refSection} id='media' style={{ height: `${media.length * 150}px`, marginTop: '-1px' }} data-scroll-section>
            <div ref={refContainer} data-scroll data-scroll-sticky data-scroll-target='#media' className={style.container}>
                <h2 className={`${style.title} text--h1 pb-1 c-hover`}>
                    Медиа
                    <Arrow />
                </h2>

                <div className={style.wrapper}>
                    <motion.div ref={refWrapper} style={{ x: scrollPosition, width: `calc(15vw * ${media.length / 2})` }} className={style.inner}>
                        {media.map((element, index) => (
                            // @TODO Replace key
                            <div className={`${style.image} c-hover`} key={index}>
                                <Image src={element} alt='media' width='276' height='276' />
                            </div>
                        ))}
                    </motion.div>
                    <div className={style.background} />
                </div>
            </div>
        </section>
    )
}



// import Image from 'next/image'

// export default function BrandHistory({ history }) {
//     const refContainer = useRef(null)
//     const refStartPos = useRef(null)
//     const refSection = useRef(null)
//     const { scroll } = useContext(SmoothScrollContext)
//     const rotatesPos = []
//     const rotatesNeg = []
//     const anglesPos = [0, 30, 60, 90, 120, 150, 180]
//     const anglesNeg = [0, -30, -60, -90, -120, -150, -180]
//     const y = useMotionValue(0)

//     for (let index = 0; index < history.length; index++) {
//         const coef = index * 600
//         const positions = []
//         for (let i = 0; i <= 6; i++) {
//             const smallCoef = (index !== history.length - 1 || i !== 6) ? 100 : 100
//             positions.push(i * smallCoef + coef)
//         }
//         const rotatePos = useTransform(y, [...positions], [...anglesPos])
//         const rotateNeg = useTransform(y, [...positions], [...anglesNeg])
//         rotatesPos.push(rotatePos)
//         rotatesNeg.push(rotateNeg)
//     }

//     useEffect(() => {
//         if (!scroll) return

//         const scrollHandler = event => {
//             if (!refContainer.current.classList.contains('is-inview')) return
//             if (!refStartPos.current) refStartPos.current = Math.floor(event.scroll.y)
//             // if (refStartPos.current > event.scroll.y + 20 || refSection.current.clientHeight + 100 < event.scroll.y) return
//             y.set(event.scroll.y - refStartPos.current)
//         }

//         scroll.on('scroll', scrollHandler)

//         return () => {
//             scroll.off('scroll', scrollHandler)
//         }
//     }, [scroll]);

//     return (
//         <section ref={refSection} id='history' style={{ height: `${history.length * 600}px`, marginTop: '-1px' }} data-scroll-section>
//             <div ref={refContainer} data-scroll data-scroll-sticky data-scroll-target='#history' className={style.container}>
//                 <h2 className={`${style.title} text--h1 pb-1`}>История успеха</h2>

//                 <div className={style.historyContainer}>
//                     {history.map((element, index) => (
//                         <motion.div
//                             style={{ rotate: rotatesPos[index], zIndex: history.length - index }}
//                             key={element.name}
//                             className={style.historyWrapper}>
//                             <motion.div
//                                 className={style.historyInner}
//                                 style={{ rotate: rotatesNeg[index] }}>

//                                 <h3 className={`${style.historyInfo} text--g4`}>{element.name}</h3>
//                                 <p className={`${style.historyInfo} text--t1`}>{element.city}</p>
//                                 <p className={`${style.historyInfo} text--t1 text--bold`}>{element.place}</p>
//                                 <div className={style.historyImage}>
//                                     <Image src={element.image} alt={element.name} width='1495' height='663' />
//                                 </div>
//                             </motion.div>

//                             <motion.div className={style.lines}>
//                                 <motion.div>
//                                     {element.name}
//                                 </motion.div>
//                             </motion.div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     )
// }
