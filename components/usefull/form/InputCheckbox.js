import { useState } from 'react'

export default function InputCheckbox({ onAfterComplete, external }) {
    const [isChecked, setIsChecked] = useState(false)
    const onAfterChange = () => {
        setIsChecked(!isChecked)
        onAfterComplete()
    }

    return (
        <div className={`${external ?? ''} item-selector`}>
            <label className='item-selector__label' onChange={onAfterChange}>
                <input type='checkbox' />
                <div className='item-selector__checkbox' />
            </label>
        </div>
    )
}