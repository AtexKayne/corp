import style from '../../styles/module/brand/brand-numbers.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useEffect, useRef, useContext, useState } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

function Number({number, index, numbersCount, scrollPosition, listAnimation}) {
    const animation = useAnimationControls()
    const isAnimated = useRef(false)

    useEffect(() => {
        if (scrollPosition >= index * 100) {
            if (!isAnimated.current) {
                isAnimated.current = true
                animation.start({ y: '-50%', transition: { duration: 1 } })
                listAnimation.start({ x: `${(numbersCount - index) * 100}px`, transition: { duration: 1 } })
            }
        } else {
            if (isAnimated.current) {
                isAnimated.current = false
                animation.start({ y: '100%', transition: { duration: 1 } })
                listAnimation.start({ x: `${(numbersCount - index) * 100}px`, transition: { duration: 1 } })
            }
        }
    }, [scrollPosition]);


    return (
        <div className={style.cardWrapper}>
            <motion.div
                initial={{ y: '100%', x: `${index * -100}px`, rotate: (index - numbersCount / 2) * 5 }}
                animate={animation}
                className={style.card}>
                <div className={`${style.cardNumber} text--g2`}>{number.number}</div>
                <div className={`${style.cardText} text--t2`}>{number.text}</div>
            </motion.div>
        </div>
    )
}

export default function BrandNumbers({ numbers }) {
    const refContainer = useRef(null)
    const refStartPos = useRef(null)
    const refSection = useRef(null)
    const { scroll } = useContext(SmoothScrollContext)
    const listAnimation = useAnimationControls()
    const [scrollPosition, setScrollPosition] = useState(-10)

    useEffect(() => {
        if (!scroll) return

        let isScrolling = false
        const scrollHandler = event => {
            if (!refContainer.current.classList.contains('is-inview')) return
            if (!refStartPos.current) refStartPos.current = Math.floor(event.scroll.y)
            if (isScrolling) return

            isScrolling = true
            setScrollPosition(event.scroll.y - refStartPos.current)
            setTimeout(() => isScrolling = false, 100)
        }

        scroll.on('scroll', scrollHandler)

        const observerHandler = entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) refContainer.current.classList.remove('is-inview')
                else if (refStartPos.current) refContainer.current.classList.add('is-inview')
            })
        }
        const observer = new IntersectionObserver(observerHandler, { threshold: 0 })
        observer.observe(refSection.current)

        return () => {
            scroll.off('scroll', scrollHandler)
            observer.disconnect()
        }
    }, [scroll]);

    return (
        <section ref={refSection} id='numbers' style={{ height: `calc(100vh + ${numbers.length * 100}px)` }} data-scroll-section>
            <div ref={refContainer} data-scroll data-scroll-sticky data-scroll-target='#numbers' className={style.container}>
                <h2 className={`${style.title} text--h1 pb-1`}>Цифры</h2>
                <motion.div initial={{ x: `${numbers.length * 100}px` }} animate={listAnimation} className={style.cardList}>
                    {numbers.map((number, index) => (
                        <Number 
                            key={number.text}
                            number={number}
                            index={index}
                            listAnimation={listAnimation}
                            scrollPosition={scrollPosition}
                            numbersCount={numbers.length}/>
                    ))}
                </motion.div>
            </div>

        </section>
    )
}
