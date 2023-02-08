import { useState, useEffect, useRef } from 'react'

export default function ItemChecker({ onAfterChange, text = '' }) {
    const [isChecked, setIsChecked] = useState(false)
    const toggle = () => {
        setIsChecked(!isChecked)
        onAfterChange()
    }

    return (
        <div onClick={toggle} className='checker'>
            <label className='input-switch'>
                <input onChange={() => {console.log('');}} checked={isChecked} type='checkbox' />
                <div className='input-switch__background' />
                <div className='input-switch__base' />
            </label>
            <div className='text--t4'>{text}</div>
        </div>
    )
}