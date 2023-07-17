import { motion, useAnimationControls } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import style from './Inputs.module.scss'
import Range from 'rc-slider'
import Icon from '../../../Icon'
import { globalState } from '../../../helpers/globalState'

export default function InputRange({ info, onAfterChange }) {
    const min = info.values[0]
    const max = info.values[1]
    const [dataFocus, setDataFocus] = useState({ min: false, max: false })
    const [rangeValue, setRangeValue] = useState([min, max])
    const [isOpen, setIsOpen] = useState(false)

    const animateWrapper = useAnimationControls()
    const refInputMin = useRef(null)
    const refInputMax = useRef(null)

    const toLoc = num => num.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }).replace(',00', '')
    const toNum = str => str.replaceAll(' ', '').replaceAll('₽', '')

    const updateDataFocus = info => {
        const newDataFocus = {
            min: info[0] !== min,
            max: info[1] !== max
        }
        setDataFocus(newDataFocus)
    }

    const blurHandler = (event, input) => {
        const target = event.target
        let val = +target.value

        if (val < min) val = min
        else if (val > max) val = max

        if (val < rangeValue[0] && input === 'max') val = rangeValue[0] + 1
        if (val > rangeValue[1] && input === 'min') val = rangeValue[1] - 1

        const newRangeValue = []
        if (input === 'max') {
            newRangeValue.push(rangeValue[0])
            newRangeValue.push(val)
        } else {
            newRangeValue.push(val)
            newRangeValue.push(rangeValue[1])
        }
        setRangeValue(newRangeValue)
        target.value = toLoc(val)
        updateDataFocus(newRangeValue)
        if (typeof onAfterChange === 'function') onAfterChange('price', newRangeValue)
    }

    const focusHandler = event => {
        const value = toNum(event.target.value)
        event.target.value = value
    }

    const changeHandler = info => {
        updateDataFocus(info)
        setRangeValue(info)
        refInputMin.current.value = toLoc(info[0])
        refInputMax.current.value = toLoc(info[1])
    }

    const changeInput = (event, input) => {
        const target = event.target
        const val = parseInt(target.value)
        target.value = val
    }

    const afterChangeHandler = info => {
        if (typeof onAfterChange === 'function') onAfterChange('price', info)
    }

    const toggleWrapper = () => {
        if (window.innerWidth > globalState.sizes.lg) {
            const height = isOpen ? 40 : 'auto'
            setIsOpen(!isOpen)
            animateWrapper.start({ height, transition: { duration: 0.3 } })
        }
    }

    useEffect(() => {
        refInputMin.current.value = toLoc(min)
        refInputMax.current.value = toLoc(max)
    }, [])

    return (
        <div className={style.container}>
            <motion.div data-open={isOpen} animate={animateWrapper} initial={{ height: 40 }} className={style.wrapper}>
                <div onClick={toggleWrapper} className={`${style.title} text--t3 text--upper`}>
                    <span>{info.name}</span>
                    <Icon external={style.icon} name='chevronUp' width='16' height='16' />
                </div>
                <div className={style.priceList}>
                    <div className='d-flex mb-1'>
                        <input
                            type='tel'
                            ref={refInputMin}
                            className='input'
                            onFocus={focusHandler}
                            onBlur={event => blurHandler(event, 'min')}
                            onChange={event => changeInput(event, 'min')}
                            data-focus={dataFocus.min} />
                        <div className='range-delim'>–</div>
                        <input
                            type='tel'
                            ref={refInputMax}
                            className='input'
                            onFocus={focusHandler}
                            onBlur={event => blurHandler(event, 'max')}
                            onChange={event => changeInput(event, 'max')}
                            data-focus={dataFocus.max} />
                    </div>

                    <div className=''>
                        <Range
                            range
                            min={min}
                            max={max}
                            count={1}
                            pushable={true}
                            tabIndex={[0, 1]}
                            value={rangeValue}
                            onChange={changeHandler}
                            defaultValue={[min, max]}
                            onAfterChange={afterChangeHandler}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}