import style from '../../styles/module/brand-numbers.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useEffect, useRef, useContext } from 'react'
import { motion, useAnimationControls, useTransform } from 'framer-motion'

export default function BrandNumbers({ numbers }) {
    const refCardList = useRef(null)
    const refContainer = useRef(null)
    const refStartPos = useRef(null)
    const refSection = useRef(null)
    const { scroll } = useContext(SmoothScrollContext)
    const animations = []
    const listAnimation = useAnimationControls()

    for (let index = 0; index < numbers.length; index++) {
        const animation = useAnimationControls()
        animations.push(animation)
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    useEffect(() => {
        if (!scroll) return

        let currentCard = -1
        const scrollHandler = event => {
            if (!refContainer.current.classList.contains('is-inview')) return
            if (!refStartPos.current) refStartPos.current = Math.floor(event.scroll.y)
            if (refStartPos.current > event.scroll.y + 20 || refContainer.current.clientHeight > event.scroll.y) return

            const maxScrollHeight = refSection.current.clientHeight - refStartPos.current + 50
            const indexCard = Math.max(-1, Math.floor((event.scroll.y - refStartPos.current) / (maxScrollHeight / numbers.length)))

            if (currentCard === indexCard) return

            if (indexCard > currentCard) animations[indexCard].start({y: '-50%', transition: {duration: 1}})
            else if (currentCard >= 0) animations[currentCard].start({y: '100%', transition: {duration: 1}})
            
            currentCard = indexCard
            listAnimation.start({x: `${(numbers.length - indexCard) * 100}px`, transition: {duration: 1}})
        }
        
        scroll.on('scroll', scrollHandler)
        
        return () => {
            scroll.off('scroll', scrollHandler)
        }
    }, [scroll]);

    return (
        <section ref={refSection} id='numbers' style={{ height: `${numbers.length * 50}vh` }} data-scroll-section>
            <div ref={refContainer} data-scroll data-scroll-sticky data-scroll-target='#numbers' className={style.container}>
                <h2  className={`${style.title} text--h1 pb-1`}>Цифры</h2>
                <motion.div initial={{x: `${numbers.length * 100}px`}} animate={listAnimation} ref={refCardList} className={style.cardList}>
                    {numbers.map((number, index) => (
                        <div 
                            // data-scroll data-scroll-speed={(index + 1) / 3} 
                            className={style.cardWrapper}
                            key={number.text}>
                            <motion.div 
                                initial={{y: '100%', x: `${index * -100}px`, rotate: (index - numbers.length / 2) * 5 }}
                                animate={animations[index]}
                                className={style.card}>
                                <div className={`${style.cardNumber} text--g2`}>{number.number}</div>
                                <div className={`${style.cardText} text--t2`}>{number.text}</div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>

        </section>
    )
}
