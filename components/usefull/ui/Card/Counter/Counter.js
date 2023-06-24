import { motion, useAnimationControls } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import Icon from '../../../../Icon'

export default function Counter({ onAfterChange, max, startValue }) {
    const animateCount = useAnimationControls()
    const [isSelected, setIsSelected] = useState(false)
    const [disabled, setDisabled] = useState('minus')
    const [isShaked, setIsShaked] = useState(false)
    const [count, setCount] = useState(startValue)
    const refSafeValue = useRef(startValue)
    const refIsAnimated = useRef(false)
    const refAccept = useRef(null)
    const refInput = useRef(null)

    // Support functions
    const getValue = () => {
        const value = refInput.current.value
        return +value.replace(/[^\d]/g, '')
    }

    const getFakeInput = () => {
        const fakeInput = document.createElement('input')
        fakeInput.setAttribute('type', 'tel')
        fakeInput.style.position = 'fixed'
        fakeInput.style.opacity = 0
        fakeInput.style.height = 0
        fakeInput.style.fontSize = '30px'
        document.body.prepend(fakeInput)
        fakeInput.focus()
        return fakeInput
    }

    const getMetaScale = () => {
        const meta = document.createElement('meta')
        meta.setAttribute('name', 'viewport')
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0')
        document.querySelector('head').append(meta)
        return meta
    }

    // Component functions
    const keyDownHandler = event => {
        if (event.keyCode === 13) {
            refInput.current.value = getValue()
            setCount(+refInput.current.value)
            setIsSelected(false)
            document.body.removeEventListener('mousedown', documentClick)
        }
        else if (event.keyCode === 38) {
            const newValue = +refInput.current.value + 1
            if (newValue <= max) refInput.current.value = newValue
        } else if (event.keyCode === 40) {
            const newValue = +refInput.current.value - 1
            if (newValue >= 0) refInput.current.value = newValue
        }
    }

    const checkValue = checked => {
        let value = checked ?? getValue()
        let isMax, isMin

        if (value <= 0) {
            setDisabled('minus')
            isMin = true
            value = 0
        } else if (value >= max) {
            value = max
            setDisabled('plus')
            setIsShaked(true)
            setTimeout(() => setIsShaked(false), 1000)
            isMax = true
        } else {
            setDisabled(false)
        }

        return { isMax, isMin, value }
    }

    const changeHandler = () => {
        const { isMax, isMin, value } = checkValue()

        onAfterChange({ value, isMax, isMin })
        refInput.current.value = value

        // if (!!value) setCount(value)
    }

    const blurHandler = () => {
        document.querySelector(`.${style.counterBtnAccept}`).click()
    }

    const updateCount = async increment => {
        if (refIsAnimated.current) return
        refIsAnimated.current = true
        const newValue = +count + increment
        const { isMax, isMin, value } = checkValue(newValue)

        if (newValue) {
            const strValue = '' + newValue
            const pos = increment + 1 ? -40 : 40
            await animateCount.start({ y: pos, minWidth: `${strValue.length * 5 + 8}px`, transition: { duration: 0.2, ease: 'anticipate' } })
            await animateCount.start({ y: pos * - 1, transition: { duration: 0 } })
        }

        setCount(newValue)
        await animateCount.start({ y: 0, transition: { duration: 0.1 } })
        onAfterChange({ value, isMax, isMin })
        refIsAnimated.current = false
    }

    const rejectHandler = () => {
        setCount(refSafeValue.current)
        refInput.current.value = refSafeValue.current
        setIsSelected(false)
        checkValue()
        onAfterChange({ value: refSafeValue.current, isMax: false, isMin: false })
        document.body.removeEventListener('mousedown', documentClick)
    }

    const documentClick = event => {
        const classList = event.target.classList
        const checkInput = classList.contains(style.counterInput)
        const checkRej = classList.contains(style.counterBtnReject)

        if (checkInput || checkRej) return

        refInput.current.value = getValue()
        setCount(+refInput.current.value)
        checkValue()
        setIsSelected(false)
        document.body.removeEventListener('mousedown', documentClick)
    }

    const counterClick = () => {
        refSafeValue.current = count
        refInput.current.value = count
        setIsSelected(true)
        const fakeInput = getFakeInput()
        const meta = getMetaScale()
        document.body.addEventListener('mousedown', documentClick)

        setTimeout(() => {
            refInput.current.focus()
            fakeInput.remove()
        }, 500)

        setTimeout(() => {
            meta.remove()
        }, 2000)
    }

    useEffect(() => {
        setCount(startValue)
        refSafeValue.current = startValue
        if (!!startValue) checkValue(startValue)
        // setIsSelected(!!startValue)
        // console.log(startValue, !!startValue);
        // if (startValue) {
        // } else {
        //     setIsSelected(false)
        // }
        // console.log(startValue);
    }, [startValue])

    return (
        <div data-active={isSelected} className={`${style.cardCountSelector} text--p5 text--bold`}>
            <span data-disabled={disabled === 'minus'} onClick={() => updateCount(-1)} className={style.counterBtn}>
                <Icon name='minus' width='16' height='16' />
            </span>
            <span onClick={rejectHandler} className={`${style.counterBtnReject}`}>
                <Icon name='close' width='16' height='16' />
            </span>

            <input
                min={0}
                max={max}
                type='tel'
                ref={refInput}
                placeholder={count}
                onBlur={blurHandler}
                data-shake={isShaked}
                onChange={changeHandler}
                onKeyDown={keyDownHandler}
                className={`${style.counterInput} text--p5 text--bold`} />

            <div onClick={counterClick} className={style.counterDiv}>
                <motion.span animate={animateCount}>{count}</motion.span>
                <span>&nbsp;ШТ</span>
            </div>

            <span data-disabled={disabled === 'plus'} onClick={() => updateCount(+1)} className={style.counterBtn}>
                <Icon name='plus' width='16' height='16' />
            </span>
            <span ref={refAccept} className={style.counterBtnAccept}>
                <Icon name='check' width='16' height='16' />
            </span>
        </div>
    )
}