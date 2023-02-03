import { useState, useEffect, useRef } from 'react'
import 'rc-slider/assets/index.css'
import Range from 'rc-slider'

export default function InputRange({ min, max, onAfterChange }) {
    const [rangeValue, setRangeValue] = useState([min, max])
    const refInputMin = useRef(null)
    const refInputMax = useRef(null)
    const refRange = useRef(null)

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
        console.log(validateValue);

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

    return (
        <div>
            <div className='d-flex mb-1'>
                <input
                    max={max}
                    min={min}
                    type='tel'
                    ref={refInputMin}
                    className='input'
                    onBlur={() => blurHandler('min')}
                    placeholder={`${min.toLocaleString()} ₽`}
                    onChange={event => changeInput(event, 'min')} />
                <div style={{ minWidth: '40px', textAlign: 'center', color: '#989898' }}>–</div>
                <input
                    max={max}
                    min={min}
                    type='tel'
                    ref={refInputMax}
                    className='input'
                    onBlur={() => blurHandler('max')}
                    placeholder={`${max.toLocaleString()} ₽`}
                    onChange={event => changeInput(event, 'max')} />
            </div>

            <Range
                range
                min={min}
                max={max}
                count={1}
                ref={refRange}
                pushable={true}
                tabIndex={[0, 1]}
                value={rangeValue}
                onChange={changeHandler}
                defaultValue={[min, max]}
                onAfterChange={onAfterChange} />
        </div>
    )
}