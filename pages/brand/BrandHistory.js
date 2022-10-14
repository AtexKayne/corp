import style from '../../styles/module/brand/brand-history.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useEffect, useRef, useContext } from 'react'
import { motion, useAnimationControls, useTransform, useMotionValue } from 'framer-motion'
import Image from 'next/image'

function HistoryImage({ index, y, historyCount, element }) {
    const anglesPos = [0, -90, -180]
    const anglesNeg = [0, 90, 180]
    const yPositions = [0, 300, 600]
    const positions = yPositions.map(i => i + (historyCount - 1 - index) * 600)
    const refWrapper = useRef()

    const clickHandler = index => {
        y.set((historyCount - 1 - index) * 600)
        const elements = Array.from(refWrapper.current.parentNode.childNodes)
        elements.forEach((element, i) => {
            const line = element.querySelector('[data-active]')
            if (line) {
                if (index === i) {
                    line.setAttribute('data-active', 'true')
                } else if (index < i) {
                    line.setAttribute('data-active', 'move')
                } else {
                    line.setAttribute('data-active', 'false')
                }
            }
        })
    }

    const rotatePos = useTransform(y, positions, anglesPos.map(i => {
        if (i === 0) return i - index * 10
        else if (i === -180) return i + (historyCount - index) * 10
        else return i
    }))

    const rotateNeg = useTransform(y, positions, anglesNeg.map(i => {
        if (i === 0) return i + index * 10
        else if (i === 180) return i - (historyCount - index) * 10
        else return i
    }))

    return (
        <motion.div
            onClick={() => clickHandler(index)}
            style={{ rotate: rotatePos }}
            ref={refWrapper}
            className={`${style.historyWrapper} c-hover`}>
            <motion.div
                className={style.historyInner}
                style={{ rotate: rotateNeg }}>

                <h3 className={`${style.historyInfo} text--g4 pb-0.5`}>{element.name}</h3>
                <p className={`${style.historyInfo} text--t1`}>{element.city}</p>
                <p className={`${style.historyInfo} text--t1 text--bold`}>{element.place}</p>
                <div className={style.historyImage}>
                    <Image src={element.image} alt={element.name} width='1495' height='663' />
                </div>
            </motion.div>

            <motion.div data-active={index === historyCount - 1} className={style.lines}>
                <span>{element.name}</span>
            </motion.div>
        </motion.div>
    )
}

export default function BrandHistory({ history }) {
    const y = useMotionValue(0)

    return (
        <section id='history' data-scroll-section>
            <div className={style.container}>
                <h2 className={`${style.title} text--h1 pb-1`}>История успеха</h2>

                <div className={style.historyContainer}>
                    {history ?
                        history.map((element, index) => (
                            <HistoryImage element={element} historyCount={history.length} y={y} index={index} key={element.name} />
                        ))
                        : ''
                    }
                    <div className={style.lastLine} />
                </div>
            </div>
        </section>
    )
}

