import { getFakeInput, getMetaScale } from '../../../../../helpers/fakeDatas'
import { motion, useAnimationControls } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import Icon from '../../../../../Icon'
import { globalState } from '../../../../../helpers/globalState'
// import { globalState } from '../../../../helpers/globalState'

export default function Counter({ info, onAfterChange, max, count }) {
    const [dispayedCount, setDispayedCount] = useState(count)
    const [isSelected, setIsSelected] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [isShaked, setIsShaked] = useState(false)
    const animateCount = useAnimationControls()
    const refIsAnimated = useRef(false)
    const refSafeValue = useRef(count)
    const refAccept = useRef(null)
    const refInput = useRef(null)

    const getValue = () => {
        const value = refInput.current.value
        return +value.replace(/[^\d]/g, '')
    }

    const shake = () => {
        setIsShaked(true)
        setTimeout(() => setIsShaked(false), 1000)
        // globalState.popover.open([info.primaryName, 'Максимум для этого заказа'], info.images[0])
    }

    const checkValue = checked => {
        let value = checked ?? getValue()
        let isMax, isMin

        if (value <= 0) {
            setDispayedCount(1)
            // setDisabled('minus')
            isMin = true
            value = 0
        } else if (value >= max) {
            setDispayedCount(max)
            setDisabled('plus')
            shake()
            value = max
            isMax = true
        } else {
            if (!checked) setDispayedCount(value)
            setDisabled(false)
        }

        return { isMax, isMin, value }
    }

    const documentClick = event => {
        const classList = event.target.classList
        const checkInput = classList.contains(style.counterInput)
        const checkRej = classList.contains(style.counterBtnReject)

        if (checkInput || checkRej) return

        refInput.current.value = getValue()
        const { value, isMax, isMin } = checkValue()
        setIsSelected(false)
        setDispayedCount(Math.max(value, 1))
        onAfterChange({ value: Math.max(value, 1), isMax, isMin })
        document.body.removeEventListener('mousedown', documentClick)
    }

    const blurWindowHandler = () => {
        rejectHandler()
        refInput.current.blur()
        window.removeEventListener('blur', blurWindowHandler)
    }

    const openInput = () => {
        refSafeValue.current = count
        refInput.current.value = count
        setIsSelected(true)
        const fakeInput = getFakeInput()
        const fakeMeta = getMetaScale()
        window.addEventListener('blur', blurWindowHandler)
        if (window.innerWidth > globalState.sizes.md) {
            document.body.addEventListener('mousedown', documentClick)
        }
        setTimeout(() => {
            refInput.current.focus()
            fakeInput.remove()
        }, 500)

        setTimeout(() => fakeMeta.remove(), 2000)
    }

    const blurHandler = () => {
        refAccept.current.click()
        const { value } = checkValue()
        setIsSelected(false)
        onAfterChange({ value: Math.max(value, 1), isMax: false, isMin: false })
        document.body.removeEventListener('mousedown', documentClick)
        window.removeEventListener('blur', blurWindowHandler)
    }

    const changeHandler = () => {
        const val = +refInput.current.value
        const { value } = checkValue()
        if (val !== value) refInput.current.value = value
    }

    const rejectHandler = () => {
        refInput.current.value = refSafeValue.current
        setIsSelected(false)
        checkValue()
        onAfterChange({ value: refSafeValue.current, isMax: false, isMin: false })
        document.body.removeEventListener('mousedown', documentClick)
    }

    const keyDownHandler = event => {
        if (event.keyCode === 27) {
            rejectHandler()
        } else if (event.keyCode === 13) {
            refInput.current.blur()
        } else if (event.keyCode === 38) {
            const newValue = +refInput.current.value + 1
            if (newValue <= max) refInput.current.value = newValue
        } else if (event.keyCode === 40) {
            const newValue = +refInput.current.value - 1
            if (newValue >= 0) refInput.current.value = newValue
        }
    }

    const updateCount = async increment => {
        if (refIsAnimated.current) return
        refIsAnimated.current = true
        const newValue = +count + increment
        const { isMax, isMin, value } = checkValue(newValue)
        setDispayedCount(Math.max(+count, 1))

        if (newValue) {
            const pos = increment + 1 ? -40 : 40
            await animateCount.start({ y: pos, transition: { duration: 0.2, ease: 'anticipate' } })
            await animateCount.start({ y: pos * - 1, transition: { duration: 0 } })
        }

        setDispayedCount(Math.max(+newValue, 1))
        await animateCount.start({ y: 0, transition: { duration: 0.1 } })
        onAfterChange({ value, isMax, isMin })
        refIsAnimated.current = false
    }

    // const windowBlurHandler = () => {
    //     const { value } = checkValue()
    //     setIsSelected(false)
    //     onAfterChange({ value: Math.max(value, 1), isMax: false, isMin: false })
    //     document.body.removeEventListener('mousedown', documentClick)
    // }

    useEffect(() => {
        checkValue(count)
        const countStr = '' + count
        animateCount.start({ minWidth: `${countStr.length * 6 + 8}px` })
        // window.addEventListener('blur', windowBlurHandler)

        return () => {
            // window.removeEventListener('blur', windowBlurHandler)
        }
    }, [count])

    return (
        <div data-active={isSelected} className={`${style.cardCountSelector} text--p5 text--bold`}>
            <span data-disabled={disabled === 'minus'} onClick={() => updateCount(-1)} className={style.counterBtn}>
                <Icon name='minus' width='16' height='16' />
            </span>
            <span onClick={rejectHandler} className={`${style.counterBtnReject}`}>
                <Icon name='close' width='16' height='16' />
            </span>

            <input
                type='tel'
                ref={refInput}
                autoComplete='off'
                onBlur={blurHandler}
                data-shake={isShaked}
                onChange={changeHandler}
                onKeyDown={keyDownHandler}
                className={`${style.counterInput} text--p5 text--bold`} />

            <div onClick={openInput} className={style.counterDiv}>
                <motion.span animate={animateCount}>{dispayedCount}</motion.span>
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