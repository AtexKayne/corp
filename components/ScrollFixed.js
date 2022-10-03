import { useRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

export default function ScrollFixed({ scrollPosition }) {
    const refFixedContainer = useRef(null)
    const fixedAnimation = useAnimation()
    useEffect(() => {
        const callback = entries => {
            const target = entries[0].target
            
            console.log(entries);
        }

        const observer = new IntersectionObserver(callback, { threshold: 0.5 })
        observer.observe(refFixedContainer.current)

        return () => observer.disconnect()
        // console.log(scrollPosition);
    }, []);
    return (
        <motion.section animate={ fixedAnimation } ref={ refFixedContainer } style={{height: '200vh'}} className='mt-2'>
            <h1 className='mt-2'>TEXT</h1>
        </motion.section>
    )
}