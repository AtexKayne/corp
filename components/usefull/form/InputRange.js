import { useState, useEffect, useRef } from 'react'
import 'rc-slider/assets/index.css'
import Range from 'rc-slider'
import { globalState } from '../../helpers/globalState'

export default function InputRange({ min, max, code }) {
    const [rangeValue, setRangeValue] = useState([min, max])
    const [isChanged, setIsChanged] = useState(false)
    const refInputMin = useRef(null)
    const refInputMax = useRef(null)

    const changeInput = (event, input) => {
        const value = event.target.value.replaceAll(' ', '')
        if (!value) return
        const numValue = parseInt(value)
        let validateValue
        if (numValue >= min && numValue <= max) {
            validateValue = numValue
        } else if (numValue < min) {
            validateValue = min
        } else if (numValue > max) {
            validateValue = max
        }

        if (input === 'min') {
            if (validateValue > rangeValue[1]) validateValue = rangeValue[1] - 1
            refInputMin.current.value = validateValue
        } else if (input === 'max') {
            if (validateValue < rangeValue[0]) validateValue = rangeValue[0] + 1
            refInputMax.current.value = validateValue
        }

        const rangeValues = [
            parseInt(refInputMin.current.value.replaceAll(' ', '')),
            parseInt(refInputMax.current.value.replaceAll(' ', ''))
        ]

        setRangeValue(rangeValues)
    }

    const blurHandler = input => {
        let value = input === 'min'
            ? parseInt(refInputMin.current.value.replaceAll(' ', '')) ?? min
            : parseInt(refInputMax.current.value.replaceAll(' ', '')) ?? max

        if (input === 'min') {
            if (!value) value = 0
            refInputMin.current.value = value.toLocaleString() + ' ₽'
        } else if (input === 'max') {
            if (!value) value = max
            refInputMax.current.value = value.toLocaleString() + ' ₽'
        }
    }

    const changeHandler = event => {
        setRangeValue(event)
        refInputMin.current.value = `${event[0].toLocaleString()} ₽`
        refInputMax.current.value = `${event[1].toLocaleString()} ₽`
    }

    const resetHandler = () => {
        setIsChanged(false)
        setRangeValue([min, max])
        refInputMin.current.value = `${min.toLocaleString()} ₽`
        refInputMax.current.value = `${max.toLocaleString()} ₽`
        globalState.catalog.setSelectedFilter(prev => {
            const prevCopy = Object.assign({}, prev)
            prevCopy[code] = [min, max]
            return prevCopy
        })
    }

    const focusHandler = event => {
        let value = event.target.value.replaceAll(' ', '')
        value = value.replaceAll('₽', '')
        event.target.value = value
    }

    const onAfterChange = event => {
        globalState.catalog.setSelectedFilter(prev => {
            const prevCopy = Object.assign({}, prev)
            prevCopy[code] = [...event]
            return prevCopy
        })
    }

    useEffect(() => {
        setIsChanged(rangeValue[0] !== min || rangeValue[1] !== max)
    }, [rangeValue])
    

    return (
        <div>
            <div className='d-flex mb-1'>
                <input
                    type='tel'
                    ref={refInputMin}
                    className='input'
                    onFocus={focusHandler}
                    onBlur={() => blurHandler('min')}
                    placeholder={`${min.toLocaleString()} ₽`}
                    onChange={event => changeInput(event, 'min')} />
                <div style={{ minWidth: '40px', textAlign: 'center', color: '#989898' }}>–</div>
                <input
                    type='tel'
                    ref={refInputMax}
                    className='input'
                    onFocus={focusHandler}
                    onBlur={() => blurHandler('max')}
                    placeholder={`${max.toLocaleString()} ₽`}
                    onChange={event => changeInput(event, 'max')} />
            </div>

            <div className='px-0.8'>
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
                    onAfterChange={onAfterChange} />
            </div>

            <div data-changed={isChanged} className='reset'>
                <span onClick={resetHandler} className='text--t6 text--upper text--color-primary'>сбросить</span>
            </div>
        </div>
    )
}