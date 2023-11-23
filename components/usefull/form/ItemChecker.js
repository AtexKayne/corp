import { useState, useEffect, useRef } from 'react'

export default function ItemChecker({ text = '', code, isActive = false, onAfterChange = () => { } }) {
    const [isChecked, setIsChecked] = useState(isActive)
    const changeHandler = () => {
        setIsChecked(!isChecked)
        onAfterChange(code, !isChecked)
    }

    const textClick = event => {
        event.target.previousSibling.click()
    }

    return (
        <div className='checker'>
            <label className='input-switch input-switch--xl'>
                <input onChange={changeHandler} value={isChecked} checked={isChecked} type='checkbox' />
                <div className='input-switch__background' />
                <div className='input-switch__base' />
            </label>
            <div onClick={textClick} className='text--t4' dangerouslySetInnerHTML={{ __html: text }} />
        </div>
    )
}