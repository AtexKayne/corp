import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import { motion, useAnimationControls } from 'framer-motion'
import { fillArray } from '../../../helpers/fillArray'
import { globalState } from '../../../helpers/globalState'

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
        const widthCoef = window.innerWidth <= globalState.sizes.sm ? 1 : 0.5
        const numberArr = number.toLocaleString().split('').reverse()
        
        numberArr.forEach((item, index) => {
            let height
            if (item !== ' ' && item !== ',') {
                let coef = 0
                if (arrPrev[index] === item) {
                    const data = children[index].data ?? false
                    children[index].data = !data
                    coef = data ? 11 : 0
                }
                height = (+item + coef) * -refHeight.current
            } else {
                height = 300
            }
            if (!refChidren[index]) return
            const width = Math.floor(refChidren[index].offsetWidth)
            children[index].style.opacity = '1'
            children[index].style.width = `${width - widthCoef}px`
            const transform = `translateY(${height}px)`
            children[index].style.transform = transform
        })

        if (children[numberArr.length]) 
            children[numberArr.length].style.opacity = 0

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
                <Numbers />
            </div>
        </motion.div>
    )
}

function Numbers() {
    const ns = fillArray(10)
    return (
        <div className={`${style.numberContainer}`}>
            {ns.map((n, i) => <div key={i} className={`${style.number}`}>{n}</div>)}
            <div className={`${style.deffer}`} />
            {ns.map((n, i) => <div key={i} className={`${style.number}`}>{n}</div>)}
            <div className={`${style.deffer}`} />
        </div>
    )
}