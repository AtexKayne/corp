import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import ColorPicker from '../../ColorPicker/ColorPicker'

export default function CardValues({ values, valuePicker, onAfterChange }) {

    return (
        <div className={`${style.values}`}>
            {valuePicker && valuePicker.length
                ? <ColorPicker items={valuePicker} isChose />
                : <VolumePicker items={values} onAfterChange={onAfterChange} />
            }
        </div>
    )
}

function VolumePicker({items, onAfterChange}) {
    const [active, setActive] = useState(0)
    const clickHandler = (item, index) => {
        setActive(index)
        onAfterChange(item)
    }

    return (
        <div className={`${style.volumePicker} text--t6 text--normal`}>
            {items.map((item, index) => (
                <div
                    key={index}
                    data-disabled={item.max === 0}
                    onClick={() => clickHandler(item, index)}
                    data-active={active === index}>
                    {item.value}
                </div>
            ))}
        </div>
    )
}
