import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import style from './style.module.scss'
import Image from 'next/image'
import { globalState } from '../../../../helpers/globalState'

export default function CardImages({ link = '/', images, mode, count }) {
    const [activeImage, setActiveImage] = useState(0)
    const animateDrag = useAnimationControls()
    const refImages = useRef(null)
    const refRect = useRef(false)

    const dragEdHandler = (_, dragInfo) => {
        if (typeof window === 'undefined' || window.innerWidth > globalState.sizes.lg) return
        const offsetX = Math.abs(dragInfo.offset.x)
        const offsetY = Math.abs(dragInfo.offset.y)
        const imageWidth = refImages.current.clientWidth

        if (offsetX > 40 && offsetY < 40) {
            if (dragInfo.offset.x > 0 && activeImage === 0) {
                animateDrag.start({ x: 0, transition: { duration: 0.1 } })
                return
            }

            if (dragInfo.offset.x < 0 && activeImage === images.length - 1) {
                animateDrag.start({ x: -imageWidth * (images.length - 1), transition: { duration: 0.1 } })
                return
            }

            if (dragInfo.offset.x < 0) {
                setActiveImage(prev => {
                    prev++
                    animateDrag.start({ x: -imageWidth * prev, transition: { duration: 0.1 } })
                    return prev
                })
            } else {
                setActiveImage(prev => {
                    prev--
                    animateDrag.start({ x: -imageWidth * prev, transition: { duration: 0.1 } })
                    return prev
                })
            }
        } else {
            animateDrag.start({ x: -imageWidth * activeImage, transition: { duration: 0.1 } })
        }
    }

    const mouseEnterHandler = () => {
        refRect.current = refImages.current.getBoundingClientRect()
    }

    const mouseMoveHandler = event => {
        if (window.innerWidth < globalState.sizes.lg || mode === 'inline') return
        const c = event.clientX - refRect.current.x
        const t = refRect.current.width / images.length
        const r = Math.min(images.length - 1, Math.floor(c / t))
        setActiveImage(r)
    }

    useEffect(() => {
        refRect.current = refImages.current.getBoundingClientRect()
    }, [])

    return (
        <Link href={link}>
            <a
                href={link}
                ref={refImages}
                onMouseMove={mouseMoveHandler}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={() => setActiveImage(0)}
                className={`${style.images} ${mode === 'inline' ? style.inline : ''}`}>

                {mode === 'inline'
                    ? <div data-is-hidden={count <= 1} className={`${style.labelCount} text--t6`}>
                        x{count}
                    </div>
                    : null
                }

                <motion.div animate={animateDrag} drag='x' onDragEnd={dragEdHandler} >
                    {images.map((image, index) => (
                        <div key={image} data-active={activeImage === index} className={style.image}>
                            <Image layout='fill' alt={'product card image'} src={image} />
                        </div>
                    ))}
                </motion.div>
                <div className={`${style.nav}`}>
                    {images.map((image, index) => (
                        <div key={image} data-active={activeImage === index} />
                    ))}
                </div>
            </a>
        </Link>
    )
}