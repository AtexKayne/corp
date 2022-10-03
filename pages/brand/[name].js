import { useRef, useEffect } from 'react'
import { motion, useAnimation, useScroll } from 'framer-motion'
import MainLayout from '../../layout/MainLayout'
import ScrollFixed from '../../components/ScrollFixed'

export default function Brand() {
    const scrolling = useAnimation()
    const refPosition = useRef(0)
    const refScrollContainer = useRef(null)
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        offset: ["end end", "start start"]
    })
    const scrollHandler = event => {
        const currentScroll = refPosition.current
        const scrollHeight = refScrollContainer.current.scrollHeight - refScrollContainer.current.clientHeight
        console.log(scrollYProgress);

        if (refPosition.current - event.deltaY >= 0 && event.deltaY < 0) refPosition.current = 0
        else if (scrollHeight + refPosition.current - event.deltaY <= 0) refPosition.current = -scrollHeight
        else refPosition.current = Math.floor(refPosition.current - event.deltaY)

        if (currentScroll !== refPosition.current)
            scrolling.start({ y: refPosition.current, transition: { duration: 0.2, type: 'tween' } })
    }

    return (
        <MainLayout className='no-padding'>
            <div ref={refScrollContainer} onWheel={scrollHandler} className='scroll-container'>
                <motion.section style={{ width: '100%' }} animate={scrolling}>
                    <h1 className='mt-2'>TEXT</h1>
                    <h1 className='mt-2'>TEXT2</h1>
                    <h1 className='mt-2'>TEXT3</h1>
                    <h1 className='mt-2'>TEXT4</h1>
                    <motion.div ref={ref}>
                        <h1 className='mt-2'>TEXT</h1>
                    </motion.div>
                    <h1 className='mt-2'>TEXT5</h1>
                    <h1 className='mt-2'>TEXT6</h1>
                    <h1 className='mt-1'>TEXT7</h1>
                </motion.section>
            </div>
        </MainLayout>
    )
}