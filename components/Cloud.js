import styles from '../styles/module/cloud.module.scss'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Cloud({items}) {
    const refScrollWidth = useRef(null)
    const refClientWidth = useRef(null)
    const refCloud       = useRef(null)
    let isMouseDown      = false
    let currentPosition  = 0

    const getRandomNumber  = max => Math.floor(Math.random() * max);
    const mouseDownHandler = e => {
        isMouseDown = true
    }
    
    useEffect(() => {
        const observers = []
        const animate = () => {
            currentPosition++ 
            const percent = Math.floor((refScrollWidth.current / 100) * currentPosition)
            refCloud.current.style.transform = `translateX(${percent - refScrollWidth.current}px)`
        }
        const callback = entries => {
            const target = entries[0].target
            target.firstChild.setAttribute('data-show', entries[0].isIntersecting)
            if (!entries[0].isIntersecting && refCloud.current.style.transform) {
                const position = (+/\d+/.exec(target.style.transform) ?? 0) + refClientWidth.current
                setTimeout(() => {
                    target.style.transform = `translateX(${-position}px)`
                    target.style.marginTop = `${getRandomNumber(100)}px`
                }, 3000)
            }
        };
        refCloud.current.childNodes.forEach(el => {
            el.style.marginTop = `${getRandomNumber(100)}px`
            el.style.marginLeft = `${getRandomNumber(10)}px`
            const observer = new IntersectionObserver(callback, {threshold: 1})
            observer.observe(el)
            observers.push(observer)
        })
        refScrollWidth.current = refCloud.current.scrollWidth
        refClientWidth.current = refCloud.current.clientWidth
        const interval = setInterval(animate, 500)
        return () => {
            clearInterval(interval)
            observers.forEach(observer => observer.disconnect())
        }
    }, [])

    return (
        <div onMouseDown={mouseDownHandler} className={`${styles.cloudContainer} c-dragh`}>
            <div ref={refCloud} >
                <motion.div drag={'x'} className={styles.cloudWrapper}>
                    {items.map(item => (
                        <Link key={item.name} href={`/brand/${item.name}`}>
                            <div className={styles.cloudItemWrapper}>
                                <div className={`${styles.cloudItem} c-hover`}>
                                    <svg className={styles.cloudShapeWrapper} height='80' width='80'>
                                        <rect className={styles.cloudShape} height='80' width='80'></rect>
                                    </svg>
                                    <Image src={item.logo} width='120' height='120' alt={item.name}/>
                                </div>
                            </div>
                        </Link>
                    ))}
                </motion.div>
            </div>
            <div className={styles.cloudBackground}/>
        </div>
    )
}
