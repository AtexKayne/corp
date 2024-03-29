import Range from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useState, useEffect, useRef } from 'react'
import { debounce } from '../../helpers/debounce'
import { globalState } from '../../helpers/globalState'
import Icon from '../../Icon'

export default function InputRange_({ min, max, code, reset = '' }) {
    const [isChanged, setIsChanged] = useState(false)
    const [rangeValue, setRangeValue] = useState([min, max])
    const [valusesLocale, setValusesLocale] = useState({ min: 0, max: 0 })
    const [inputFocus, setInputFocus] = useState({})
    const refInputMin = useRef(null)
    const refInputMax = useRef(null)

    const toLoc = num => num.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }).replace(',00', '')

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
            refInputMin.current.value = toLoc(value)
        } else if (input === 'max') {
            if (!value) value = max
            refInputMax.current.value = toLoc(value)
        }
    }

    const onChange = event => {
        setRangeValue(event)
        const loc0 = toLoc(event[0])
        const loc1 = toLoc(event[1])
        if (refInputMin.current.value !== loc0) {
            refInputMin.current.value = loc0
            setInputFocus(prev => {
                prev.min = true
                return prev
            })
        }

        if (refInputMax.current.value !== loc1) {
            refInputMax.current.value = loc1
            setInputFocus(prev => {
                prev.max = true
                return prev
            })
        }

    }

    const changeHandler = debounce(onChange, 5)

    const resetHandler = () => {
        setIsChanged(false)
        setRangeValue([min, max])
        refInputMin.current.value = toLoc(min)
        refInputMax.current.value = toLoc(max)
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

        if (event[0] === min) setInputFocus(prev => {
            prev.min = false
            return prev
        })
        if (event[1] === max) setInputFocus(prev => {
            prev.max = false
            return prev
        })
        // setInputFocus(false)
    }

    useEffect(() => {
        setValusesLocale({
            min: toLoc(min),
            max: toLoc(max)
        })
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
                    data-focus={inputFocus.min}
                    placeholder={valusesLocale.min}
                    onBlur={() => blurHandler('min')}
                    onChange={event => changeInput(event, 'min')} />
                <div className='range-delim'>–</div>
                <input
                    type='tel'
                    ref={refInputMax}
                    className='input'
                    onFocus={focusHandler}
                    data-focus={inputFocus.max}
                    placeholder={valusesLocale.max}
                    onBlur={() => blurHandler('max')}
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

            {reset
                ? <div data-changed={isChanged} onClick={resetHandler} className='reset'>
                    <span className='text--t6 text--upper text--color-primary'>{reset !== 'none' ? reset : ''}</span>
                </div>
                : <div data-changed={isChanged} onClick={resetHandler} className='reset reset--icon'>
                    <Icon name='close' width='10' height='10' />
                </div>
            }
        </div>
    )
}