import style from '../../styles/module/brand/brand-history.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useEffect, useRef, useContext } from 'react'
import { motion, useAnimationControls, useTransform, useMotionValue } from 'framer-motion'
import Image from 'next/image'

export default function BrandHistory({ history }) {
    const rotatesPos = []
    const rotatesNeg = []
    const anglesPos = [0, -90, -180]
    const anglesNeg = [0, 90, 180]
    const yPositions = [0, 300, 600]
    const y = useMotionValue(0)
    const historyContainer = useRef()

    for (let index = 0; index < history.length; index++) {
        const positions = yPositions.map( i => i + (history.length - 1 - index) * 600 )
        const rotatePos = useTransform(y, [...positions], [...anglesPos.map(i => {
            if (i === 0) {
                return i - index * 10
            } else if (i === -180) {
                return i + (history.length - index) * 10
            } else {
                return i
            }
        })])
        const rotateNeg = useTransform(y, [...positions], [...anglesNeg.map(i => {
            if (i === 0) {
                return i + index * 10
            } else if (i === 180) {
                return i - (history.length - index) * 10
            } else {
                return i
            }
        })])
        rotatesPos.push(rotatePos)
        rotatesNeg.push(rotateNeg)
    }

    const clickHandler = index => {
        y.set((history.length - 1 - index) * 600)
        const elements = Array.from(historyContainer.current.childNodes)
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
        // historyContainer.current.querySelector('[data-active="true"]').setAttribute('data-active', 'false')
        // historyContainer.current.childNodes[index].querySelector('[data-active]').setAttribute('data-active', 'true')
    }

    return (
        <section id='history' data-scroll-section>
            <div className={style.container}>
                <h2 className={`${style.title} text--h1 pb-1`}>История успеха</h2>

                <div ref={historyContainer} className={style.historyContainer}>
                    {history.map((element, index) => (
                        <motion.div
                            key={element.name}
                            onClick={() => clickHandler(index)}
                            style={{ rotate: rotatesPos[index] }}
                            className={`${style.historyWrapper} c-hover`}>
                            <motion.div
                                className={style.historyInner}
                                style={{ rotate: rotatesNeg[index] }}>

                                <h3 className={`${style.historyInfo} text--g4 pb-0.5`}>{element.name}</h3>
                                <p className={`${style.historyInfo} text--t1`}>{element.city}</p>
                                <p className={`${style.historyInfo} text--t1 text--bold`}>{element.place}</p>
                                <div className={style.historyImage}>
                                    <Image src={element.image} alt={element.name} width='1495' height='663' />
                                </div>
                            </motion.div>

                            <motion.div data-active={index === history.length - 1 } className={style.lines}>
                                <span>{element.name}</span>
                            </motion.div>
                        </motion.div>
                    ))}
                    <div className={style.lastLine} />
                </div>
            </div>
        </section>
    )
}
