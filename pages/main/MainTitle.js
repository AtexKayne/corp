import style from '../../styles/module/main/main-title.module.scss'
import Image from 'next/image'
import { motion } from 'framer-motion'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'
import { useEffect, useState, useRef } from 'react'

export default function MainTitle({ text }) {
    const { isMobile } = useDeviceDetect()
    const [image, setImage] = useState('/assets/img/textlogo.svg')
    const [isHover, setIsHover] = useState(false)
    const [lineWidth, setLineWidth] = useState(30)
    const refText = useRef(null)

    const hoverStartHandler = () => {
        const width = refText.current.clientWidth + 30
        setLineWidth(width)
        setIsHover(true)
    }

    const hoverEndHandler = () => {
        setLineWidth(30)
        setIsHover(false)
    }


    useEffect(() => {
        if (isMobile) {
            setLineWidth(70)
            setImage('/assets/img/textlogo-mobile.svg')
        } else {
            setImage('/assets/img/textlogo.svg')
        }
    }, [isMobile])

    return (
        <motion.div onHoverStart={hoverStartHandler} onHoverEnd={hoverEndHandler} className={`${style.title} c-hover`}>
            <Image src={image} alt='simrussia logo' width={isMobile ? 199 : 265} height={isMobile ? 60 : 81} />
            <div className={style.arrow}>
                <svg width='30' height='16' fill='none'>
                    <line y1='10' x2='30' y2='10' stroke='currentColor' strokeWidth='2' />
                </svg>
                <svg width={lineWidth} height='16' fill='none'>
                    <line y1='8' x2='100%' y2='8' stroke='currentColor' strokeWidth='2' />
                </svg>
                <svg style={{marginLeft: '-5px'}} width='15' height='16' fill='none'>
                    <path transform='translate(-55 0)' d='M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3431 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3431 15.0711L60.7071 8.70711ZM59 9H60V7H59V9Z' fill='currentColor' />
                </svg>

            </div>
            <div ref={refText} style={{left: isMobile ? 265 : 347 }} data-active={isHover} className={style.text}>{text}</div>
        </motion.div>
    )
}