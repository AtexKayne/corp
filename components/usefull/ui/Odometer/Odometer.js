import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import { motion, useAnimationControls } from 'framer-motion'
import { fillArray } from '../../../helpers/fillArray'

export default function Odometer({ number }) {
    const refLastCount = useRef(number)
    const refNumbersContainer = useRef(null)
    const refWrapper = useRef(null)
    const refNumber = useRef(null)
    const refHeight = useRef(0)
    const refIsAnimated = useRef(false)
    const animateWrapper = useAnimationControls()
    const refPromice = useRef()

    const odometerHandler = async () => {
        if (refIsAnimated.current) await refPromice.current
        refIsAnimated.current = true
        const width = refNumber.current.clientWidth
        animateWrapper.start({ width: width })
        const children = Array.from(refNumbersContainer.current.children).reverse()
        const refChidren = Array.from(refNumber.current.children).reverse()
        const arrPrev = refLastCount.current.toLocaleString().split('').reverse()
        console.log(arrPrev);
        number.toLocaleString().split('').reverse().forEach((item, index) => {
            let height
            if (item !== ' ') {
                let coef = 0
                if (arrPrev[index] === item) {
                    const data = children[index].data ?? false
                    children[index].data = !data
                    coef = data ? 0 : 11
                }
                height = (+item + coef) * -refHeight.current
            } else {
                height = 300
            }
            children[index].style.width = `${refChidren[index].offsetWidth}px`
            const transform = `translateY(${height}px)`
            children[index].style.transform = transform
        })
        refPromice.current = new Promise(resolve => setTimeout(() => {
            refIsAnimated.current = false
            refLastCount.current = number
            resolve()
        }, 1000))
    }

    useEffect(() => {
        if (refLastCount.current === number) return
        odometerHandler()
    }, [number])

    useEffect(() => {
        const height = refNumber.current.clientHeight
        refHeight.current = +height
        animateWrapper.start({ height: height })
    }, [])


    return (
        <motion.div transition={{ duration: 0.2 }} animate={animateWrapper} ref={refWrapper} className={style.odometer}>
            <span ref={refNumber} className={style.refNumber}>
                {number.toLocaleString().split('').map((item, i) => <span key={i}>{item}</span>)}
            </span>
            <div ref={refNumbersContainer} className={`${style.numbers}`}>
                <Numbers />
                <Numbers />
                <Numbers />
                <Numbers />
                <Numbers />
                <Numbers />
                <Numbers />
                <Numbers />
            </div>
        </motion.div>
    )
}

function Numbers() {
    const ns = [0,1,2,3,4,5,6,7,8,9]
    return (
        <div className={`${style.numberContainer}`}>
            {ns.map((n, i) => <div key={i} className={`${style.number}`}>{n}</div>)}
            <div className={`${style.deffer}`} />
            {ns.map((n, i) => <div key={i} className={`${style.number}`}>{n}</div>)}
            <div className={`${style.deffer}`} />
        </div>
    )
}