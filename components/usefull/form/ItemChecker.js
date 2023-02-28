import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'

export default function ItemChecker({ text = '', code }) {
    const [isChecked, setIsChecked] = useState(false)
    const onAfterChange = () => {
        setIsChecked(!isChecked)
        globalState.catalog.setSelectedFilter(prev => {
            const prevCopy = Object.assign({}, prev)
            prevCopy[code] = !isChecked
            return prevCopy
        })
    }
    const textClick = event => {
        event.target.previousSibling.click()
    }

    return (
        <div className='checker'>
            <label className='input-switch input-switch--xl'>
                <input onChange={onAfterChange} value={isChecked} checked={isChecked} type='checkbox' />
                <div className='input-switch__background' />
                <div className='input-switch__base' />
            </label>
            <div onClick={textClick} className='text--t4'>{text}</div>
        </div>
    )
}