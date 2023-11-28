import InputMask from 'react-input-mask'
import { useRef, useEffect, useState } from 'react'
import Icon from '../../Icon'

export default function InputPhone({ onAfterChange = () => { }, onEnterHandler = () => { } }) {
    const [isNotEmpty, setIsNotEmpty] = useState(false)

    const refInput = useRef(null)

    const getValueLength = value => value.replaceAll('_', '').replaceAll(' ', '').length
    const blurHandler = () => setIsNotEmpty(getValueLength(refInput.current.value) !== 0)
    const changeHandler = () => onAfterChange(refInput.current.value)
    const clickHandler = () => refInput.current.setCursorToEnd()

    const clearHandler = () => {
        setIsNotEmpty(false)
        refInput.current.setInputValue('')
        refInput.current.getInputDOMNode().focus()
    }

    const enterDownHandler = event => {
        if (event.key !== 'Enter' && event.keyCode !== 13) return
        onEnterHandler()
    }

    const pasteHandler = event => {
        event.preventDefault()
        const paste = (event.clipboardData || window.clipboardData).getData('text')
        const number = paste.replaceAll(/[^\d]/g, '').toString()
        const numberArr = number.split('')
        if (number.length > 9 && number.length < 15) {
            let phone = ''

            numberArr.forEach((n, i) => {
                if (i === 0) phone += '+7'
                else if (i === 1) phone += ` (${n}`
                else if (i === 3) phone += `${n}) `
                else if (i === 7 || i === 9) phone += ` ${n}`
                else if (i < 11) phone += `${n}`
            })

            refInput.current.setInputValue(phone)
            changeHandler()
        }
    }

    return (
        <div className='p-relative'>
            <InputMask
                type='tel'
                maskChar='_'
                ref={refInput}
                className='input'
                onBlur={blurHandler}
                onClick={clickHandler}
                onPaste={pasteHandler}
                data-value={isNotEmpty}
                data-focus={isNotEmpty}
                onChange={changeHandler}
                mask='+7 (999) 999 99 99'
                onKeyDown={enterDownHandler}
                placeholder='+7 (___) ___ __ __' />
            <div onClick={clearHandler} className='input-clear-icon is-extended'>
                <Icon name='close' width='16' height='16' />
            </div>
        </div>
    )
}
