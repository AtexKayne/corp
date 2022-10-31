import style from '../styles/module/range-line.module.scss'
import { useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import useDeviceDetect from '../components/helpers/useDeviceDetect'

export default function RangeLine({setCurrentSlides, slides}) {
    const { isMobile } = useDeviceDetect()
    const maxRange = isMobile ? 240 : 260
    const [position, setPosition] = useState('start')
    const x = useMotionValue(0)
    const scaleA = useTransform(x, [50, maxRange - 50], [1, 0])
    const scaleB = useTransform(x, [90, maxRange - 70], [0, 1])
    const translateA = useTransform(x, [50, maxRange - 50], [0, -40])
    const translateB = useTransform(x, [50, maxRange - 70], [80, 0])
    const translateTA = useTransform(x, [30, maxRange / 2 - 10], [0, -40])
    const translateTB = useTransform(x, [150, maxRange - 60], [80, 0])
    const animation = useAnimation()

    const endPanHandle = () => {
        if (x.current >= maxRange / 2) {
            animation.start({ x: maxRange })
            setPosition('end')
            setCurrentSlides(slides.stateTwo)
        } else {
            animation.start({ x: 0 })
            setPosition('start')
            setCurrentSlides(slides.stateOne)
        }
    }

    return (
        <div style={{width: `${maxRange}px`}} className={style.rangeLine}>
            <motion.div
                animate={animation}
                style={{ x }}
                drag='x'
                data-position={position}
                dragConstraints={{ left: 0, right: maxRange }}
                onPanEnd={endPanHandle}
                className={`${style.container} c-dragh`}>
                <div className={style.iconStart}>
                    <motion.div style={{ scale: scaleA, y: translateTA }}>
                        <Image src='/assets/img/main/slider-text-1.svg' width='64' height='30' alt='' />
                    </motion.div>
                    <motion.div style={{ scale: scaleA, y: translateA }}>
                        <Image src='/assets/img/main/slider-image-1.svg' width='30' height='45' alt='' />
                    </motion.div>
                </div>
                <div className={style.iconEnd}>
                    <motion.div style={{ scale: scaleB, y: translateB }}>
                        <Image src='/assets/img/main/slider-image-2.svg' width='64' height='40' alt='' />
                    </motion.div>
                    <motion.div style={{ scale: scaleB, y: translateTB }}>
                        <Image src='/assets/img/main/slider-text-2.svg' width='64' height='30' alt='' />
                    </motion.div>
                </div>
            </motion.div>
            <div className={style.moveTrack}>
                <div />
                <div />
                <div />
            </div>
        </div>
    );
}
