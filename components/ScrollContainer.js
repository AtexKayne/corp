import { motion, useAnimation } from 'framer-motion'
import { useRef } from 'react';

export default function ScrollContainer({children}) {
    const scrolling = useAnimation() 
    const refPosition = useRef(0)
    const scrollHandler = (event) => {
        refPosition.current = refPosition.current - event.deltaY
        scrolling.start({y: refPosition.current, transitionDuration: 0.2, transitionTimingFunction: 'linear'})
    }

    return (
        <div onWheel={scrollHandler} className='scroll-container'>
            {children.map((el, index) => (
                <motion.section animate={scrolling} className='scroll-section' key={index}>
                    { el }
                </motion.section>
            ))}
        </div>
    )
}