// import { useState, useEffect, useRef } from 'react'

export default function InputSelectAll({onAfterComplete, isChecked, external, setIsChecked, text}) {
    
    const onAfterChange = () => {
        setIsChecked(!isChecked)
        onAfterComplete()
    }

    return (
        <div className={`${external ?? ''} item-selector`}>
            <label className='item-selector__label' onChange={onAfterChange}>
                <input type='checkbox' readOnly checked={isChecked} />
                <div className='item-selector__checkbox' />
                <div className='text--t3 text--normal'>{text}</div>
            </label>
        </div>
    )
}