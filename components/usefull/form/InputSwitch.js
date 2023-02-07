import { useState, useEffect, useRef } from 'react'

export default function InputSwitch({ onAfterChange, isActive = false }) {
    const [isChecked, setIsChecked] = useState(isActive)
    const toggle = () => {
        setIsChecked(!isChecked)
        onAfterChange()
    }

    return (
        <label className='input-switch'>
            <input onChange={toggle} checked={isChecked} type='checkbox'/>
            <div className='input-switch__background'/>
            <div className='input-switch__base'/>
        </label>
    )
}