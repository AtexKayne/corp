import style from '../../styles/module/brand/brand-history.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useEffect, useRef, useContext } from 'react'
import { motion, useAnimationControls, useTransform, useMotionValue } from 'framer-motion'
import Image from 'next/image'

export default function BrandHistory({ history }) {
    const refHistoryList = useRef(null)
    const refContainer = useRef(null)
    const refStartPos = useRef(null)
    const refSection = useRef(null)
    const { scroll } = useContext(SmoothScrollContext)
    const animations = []
    const y = useMotionValue(0)
    const clipPath = useTransform(
        y,
        // Map x from these values:
        [0, 100, 200, 300, 400, 500, 600],
        // Into these values:
        [
            'polygon(100% 0%, 100% 100%, 50% 100%, 0% 100%, 0% 0%)',
            'polygon(100% 0%, 100% 100%, 50% 100%, 0% 50%, 0% 0%)',
            'polygon(100% 0%, 100% 100%, 50% 100%, 0% 0%, 0% 0%)',
            'polygon(100% 0%, 100% 100%, 50% 100%, 50% 0%, 50% 0%)',
            'polygon(100% 0%, 100% 100%, 50% 100%, 100% 0%, 100% 0%)',
            'polygon(100% 50%, 100% 100%, 50% 100%, 100% 50%, 100% 50%)',
            'polygon(100% 100%, 100% 100%, 50% 100%, 100% 100%, 100% 100%)'
        ]
    )
    for (let index = 0; index < history.length; index++) {
        const animation = useAnimationControls()
        animations.push(animation)
    }

    useEffect(() => {
        if (!scroll) return
        let is = false
        
        const scrollHandler = event => {
            if (!refContainer.current.classList.contains('is-inview')) return
            if (!refStartPos.current) refStartPos.current = Math.floor(event.scroll.y)
            if (refStartPos.current > event.scroll.y + 20 || refSection.current.clientHeight + 100 < event.scroll.y) return
            y.set(event.scroll.y - refStartPos.current)
            if (!is) {
                is = true
                console.log(event);
                console.log(y);

                // animations[0]
                //     .start({clipPath: 'polygon(0 0, 25% 50%, 50% 100%, 100% 100%, 100% 0)', transition: {duration: 1}})
                //     .then(animations[0].start({clipPath: 'polygon(50% 0, 50% 50%, 50% 100%, 100% 100%, 100% 0)', transition: {duration: 1}}))
                //     .then(animations[0].start({clipPath: 'polygon(100% 0, 75% 50%, 50% 100%, 100% 100%, 100% 0)', transition: {duration: 1}}))
                //     .then(animations[0].start({clipPath: 'polygon(100% 100%, 100% 100%, 50% 100%, 100% 100%, 100% 100%)', transition: {duration: 1}}))

                // animations[0].start({
                //     clipPath: [
                //         'polygon(100% 0%, 100% 100%, 50% 100%, 0% 100%, 0% 0%)',
                //         'polygon(100% 0%, 100% 100%, 50% 100%, 0% 50%, 0% 0%)',
                //         'polygon(100% 0%, 100% 100%, 50% 100%, 0% 0%, 0% 0%)',
                //         'polygon(100% 0%, 100% 100%, 50% 100%, 50% 0%, 50% 0%)',
                //         'polygon(100% 0%, 100% 100%, 50% 100%, 100% 0%, 100% 0%)',
                //         'polygon(100% 50%, 100% 100%, 50% 100%, 100% 50%, 100% 50%)',
                //         'polygon(100% 100%, 100% 100%, 50% 100%, 100% 100%, 100% 100%)'
                //     ],
                //     transition: {
                //         duration: 5
                //     }
                // })
            }
        }

        scroll.on('scroll', scrollHandler)

        return () => {
            scroll.off('scroll', scrollHandler)
        }
    }, [scroll]);

    return (
        <section ref={refSection} id='history' style={{ height: `${history.length * 80}vh` }} data-scroll-section>
            <div ref={refContainer} data-scroll data-scroll-sticky data-scroll-target='#history' className={style.container}>
                <h2 className={`${style.title} text--h1 pb-1`}>История успеха</h2>

                <div className={style.historyContainer}>
                    <motion.div
                        initial={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 100%, 0 100%, 0 0)' }}
                        style={{ clipPath }}
                        // animate={animations[0]}
                        transition={{ duration: 1 }}
                        className={style.historyWrapper}>
                        <h3 className={`${style.historyInfo} text--g4`}>{history[0].name}</h3>
                        <p className={`${style.historyInfo} text--t1`}>{history[0].city}</p>
                        <p className={`${style.historyInfo} text--t1 text--bold`}>{history[0].place}</p>
                        <div className={style.historyImage}>
                            <Image src={history[0].image} alt={history[0].name} width='1495' height='663' />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
