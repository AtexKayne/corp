import style from '../styles/module/range-line.module.scss'
import { useState } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';


export default function RangeLine({setCurrentSlides, slides}) {
    const [position, setPosition] = useState('start')
    const x = useMotionValue(0)
    const scaleA = useTransform(x, [50, 210], [1, 0])
    const scaleB = useTransform(x, [90, 190], [0, 1])
    const translateA = useTransform(x, [50, 210], [0, -40])
    const translateB = useTransform(x, [50, 190], [80, 0])
    const translateTA = useTransform(x, [30, 120], [0, -40])
    const translateTB = useTransform(x, [150, 200], [80, 0])
    const animation = useAnimation()

    const endPanHandle = () => {
        if (x.current >= 130) {
            animation.start({ x: 260 })
            setPosition('end')
            setCurrentSlides(slides.stateTwo)
        } else {
            animation.start({ x: 0 })
            setPosition('start')
            setCurrentSlides(slides.stateOne)
        }
    }

    return (
        <div className={style.rangeLine}>
            <motion.div
                animate={animation}
                style={{ x }}
                drag='x'
                data-position={position}
                dragConstraints={{ left: 0, right: 260 }}
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
