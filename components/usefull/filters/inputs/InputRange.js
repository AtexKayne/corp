import { useState, useEffect, useRef } from 'react'
import style from './Inputs.module.scss'

export default function InputRange({ info, onAfterChange }) {
    const min = info.values[0]
    const max = info.values[1]
    const refInputMin = useRef(null)
    const refInputMax = useRef(null)
    const [value, setValue] = useState([min, max])

    const toLoc = num => num.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' }).replace(',00', '')

    const blurHandler = () => {

    }

    const focusHandler = () => {

    }

    const changeHandler = info => {
        console.log(info);
        if (typeof onAfterChange === 'function') onAfterChange()
    }

    
    return (
        <div>
            {/* <RangeSlider
                progress
                style={{ marginTop: 16 }}
                value={value}
                onChange={value => {
                    setValue(value);
                }}
            />
            <InputGroup>
                <InputNumber
                    min={0}
                    max={100}
                    value={value[0]}
                    onChange={nextValue => {
                        const [start, end] = value;
                        if (nextValue > end) {
                            return;
                        }
                        setValue([nextValue, end]);
                    }}
                />
                <InputGroup.Addon>-</InputGroup.Addon>
                <InputNumber
                    min={0}
                    max={100}
                    value={value[1]}
                    onChange={nextValue => {
                        const [start, end] = value;
                        if (start > nextValue) {
                            return;
                        }
                        setValue([start, nextValue]);
                    }}
                />
            </InputGroup> */}
        </div>
    )
}