import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import styles from '../../styles/module/main/cloud.module.scss'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'
import { motion, useInView, useAnimationControls, useMotionValue } from 'framer-motion'

function Items({ params, width, direction }) {
    const refItem = useRef(null)
    const isInView = useInView(refItem)
    const scrollTo = useRef(false)
    const refCurrentTimes = useRef(1)
    const [position, setPosition] = useState(0)

    useEffect(() => {
        if (isInView) {
            console.log('in');
            //
        } else {
            console.log('out');
            if (direction === 'right') {
                setPosition(width * refCurrentTimes.current * -1)
                refCurrentTimes.current++
            } else if (direction === 'left') {
                // refCurrentTimes.current--
                // setPosition(width * refCurrentTimes.current * -1)
            }
        }
    }, [isInView])


    return (
        <div style={{ transform: `translateX(${position}px)` }} ref={refItem} className={styles.cloudItemWrapper}>
            <div className={`${styles.cloudItem} c-hover`}>
                <svg className={styles.cloudShapeWrapper} height='100%' width='100%'>
                    <rect className={styles.cloudShape} height='100%' width='100%' />
                </svg>
                <Image src={params.logo} width='120' height='120' alt={params.name} />
            </div>
        </div>
    )
}
// <Link href={`/brand/${params.name}`}>
// </Link> 

export default function Cloud({ items }) {
    const duration = 1000
    const ease = 'linear'
    const refWrapper = useRef(null)
    const animateInner = useAnimationControls()
    const [margin, setMargin] = useState('0')
    const [width, setWidth] = useState(0)
    const { isMobile } = useDeviceDetect()
    const refStartPos = useRef(0)
    const refInner = useRef(null)
    const [direction, setDirection] = useState(false)

    const mouseEnterHandler = () => {
        animateInner.stop()
    }

    const mouseLeaveHandler = () => {
        const transform = refInner.current.style.transform
        const position = +transform.split('translateX(')[1].split('px)')[0]
        animateInner.start({ x: position + 10000, transition: { duration, ease } })
    }

    const dragMoveHandler = event => {
        if (refStartPos.current !== event.x) {
            const newDirection = refStartPos.current > event.x ? 'left' : 'right'
            // if (newDirection === 'left') {
            //     animateInner.start({ x: 10000, transition: { duration, ease } })
            // }
            setDirection(newDirection)
            refStartPos.current = event.x
        }
    }

    useEffect(() => {
        animateInner.start({ x: 10000, transition: { duration, ease } })

        setTimeout(() => {
            const clientRect = refWrapper.current.getBoundingClientRect()
            if (isMobile) setMargin('30px calc(var(--spacing) * -1)')
            else setMargin(`-${clientRect.x - 100}px`)

            setWidth(refWrapper.current.offsetWidth)
            setDirection('right')
        }, 600)

        return animateInner.stop
    }, [])

    return (
        <div
            ref={refWrapper}
            onMouseLeave={mouseLeaveHandler}
            onMouseEnter={mouseEnterHandler}
            style={{ left: margin }}
            className={`${styles.cloudContainer} c-dragh`}>
            <motion.div
                drag={'x'}
                animate={ animateInner }
                initial={{ x: '-20vw' }}
                onPan={ dragMoveHandler }
                data-direction={direction}
                ref={refInner}
                dragElastic={{ left: false }}
                // dragConstraints={{ left: 0, right: 0 }}
                className={styles.cloudWrapper}>
                {// @TODO Replace key
                    items ?
                    items.map((item, index) => (
                        <Items width={width} direction={direction} key={index} params={item} />
                    )) : ''
                }
            </motion.div>
            <div className={styles.cloudBackground} />
        </div>
    )
}

// const observers = []
// const callback = entries => {
//     const target = entries[0].target
//     target.firstChild.setAttribute('data-show', entries[0].isIntersecting)
//     if (!entries[0].isIntersecting && refCloud.current.style.transform) {
//         const position = (+/\d+/.exec(target.style.transform) ?? 0) + refClientWidth.current
//         setTimeout(() => {
//             target.style.transform = `translateX(${-position}px)`
//             target.style.marginTop = `${getRandomNumber(100)}px`
//         }, 3000)
//     }
// }
// refCloud.current.childNodes.forEach(el => {
//     el.style.marginTop = `${getRandomNumber(100)}px`
//     el.style.marginLeft = `${getRandomNumber(10)}px`
//     const observer = new IntersectionObserver(callback, { threshold: 1 })
//     observer.observe(el)
//     observers.push(observer)
// })
// observers.forEach(observer => observer.disconnect())