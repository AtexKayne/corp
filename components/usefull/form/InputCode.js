import { useEffect, useRef, useState } from 'react'
import { fillArray } from '../../helpers/fillArray'

export default function InputCode({ count, error, setError, reset, resetExcludes, onAfterChange, type = 'text' }) {
    const items = fillArray(count)
    const refInputWrapper = useRef(null)
    const [test, setTest] = useState('')

    const changeHandler = (event, index) => {
        event.preventDefault()
        const target = event.target
        const key = event.key
        const keyCode = event.keyCode
        const childrens = refInputWrapper.current.childNodes

        setError('')
        
        if (key === 'Backspace' || keyCode === 8) {
            if (target.value.length !== 0) target.value = ''
            else if (index !== 0) childrens[index - 1].focus()
            target.setAttribute('data-focus', false)
            return
        }

        // if (key.length > 1) return
        setTest(`${key} ${key.length}`)

        target.value = key
        target.setAttribute('data-focus', true)

        if (index !== count - 1) {
            childrens[index + 1].value = ''
            setTimeout(() => childrens[index + 1].focus(), 50)
            return
        }

        let code = ''
        childrens.forEach(input => code += input.value)
        onAfterChange(code)
    }

    useEffect(() => {
        if (resetExcludes.includes(reset)) return
        const childrens = refInputWrapper.current.childNodes
        childrens.forEach(input => input.value = '')
    }, [reset])

    return (
        <>
            <div ref={refInputWrapper} className={`input-code ${!error ? '' : 'code-error'}`}>
                {items.map(item => <input key={item} onKeyDown={event => changeHandler(event, item)} className='input' type={type} />)}
            </div>

            <div>{test}</div>

            <div data-error={!!error} className={`input-error text--center text--p4 text--color-primary`}>{error}</div>
        </>
    )
}