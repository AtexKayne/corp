// import style from './style.module.scss'
import { useRef, useEffect, useState } from 'react'
import Icon from '../../Icon'

export default function Input({ external = '', placeholder = '', type = 'text', onChange = () => { }, name, isCleared }) {
    const [value, setValue] = useState('')
    const refInput = useRef(null)

    const changeHandler = () => {
        setValue(refInput.current.value)
        onChange(name, refInput.current.value)
    }

    const clearHandler = () => {
        refInput.current.value = ''
        onChange(name, '')
        setValue('')
    }

    return (
        <label className='p-relative'>
            <input data-value={value || false} ref={refInput} type={type} name={name} onChange={changeHandler} placeholder={placeholder} className={`${external} input`} />
            {isCleared ? <span onClick={clearHandler} className='input-clear-icon is-extended'>
                <Icon name='close' width='18' height='18' />
            </span> : null}
        </label>
    )
}
