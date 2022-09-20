import Image from 'next/image';
import style from '../styles/module/range-line.module.scss'
import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion'


export default function RangeLine({iconStart, iconEnd}) {
    const [position, setPosition] = useState('start');
    const animation = useAnimation()

    const panHandle = (_, info) => {
        const x = info.offset.x
        if (x > 0) {
            animation.set({ x: x < 260 ? x : 260 })
        }
    }
    const endPanHandle = (_, info) => {
        if (info.offset.x >= 260) {
            setPosition('end')
        } else {
            animation.start({ x: 0 })
        }
    }

    return (
        <div className={style.rangeLine}>
            <motion.div 
                animate={animation}
                data-position={position} 
                onPan={panHandle}
                onPanEnd={endPanHandle}
                className={`${style.container} c-dragh`}>
                <div className={style.iconStart}>
                    <Image src={iconStart} alt='' width='100%' height='100%'/>
                </div>
                <div className={style.iconEnd}>
                    <Image src={iconEnd} alt='' width='100%' height='100%'/>
                </div>
            </motion.div>
            <div className={style.moveTrack}>
                <div/>
                <div/>
                <div/>
            </div>
            {/* <div className={style.containerEnd}></div> */}
        </div>
    );
}
