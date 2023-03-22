import { useEffect, useRef } from 'react'
import { fillArray } from '../../helpers/fillArray'

export default function InputCode({ count, error, setError, reset, resetExcludes, onAfterChange }) {
    const items = fillArray(count)
    const refInputWrapper = useRef(null)

    const changeHandler = (event, index) => {
        const target = event.target
        const childrens = refInputWrapper.current.childNodes
        setError('')
        if (target.value.length > 1) {
            target.value = target.value.split('')[1]
            return
        }

        if (target.value.length === 1) {
            target.setAttribute('data-focus', true)
            if (index !== count - 1) return childrens[index + 1].focus()

            let code = ''
            childrens.forEach(input => code += input.value)

            return code.length !== +count ? null : onAfterChange(code)
        }

        target.setAttribute('data-focus', false)
        if (index !== 0) refInputWrapper.current.children[index - 1].focus()
    }

    useEffect(() => {
        if (resetExcludes.includes(reset)) return
        const childrens = refInputWrapper.current.childNodes
        childrens.forEach(input => input.value = '')
    }, [reset])

    return (
        <>
            <div ref={refInputWrapper} className={`input-code ${!error ? '' : 'code-error'}`}>
                {items.map(item => <input key={item} onChange={event => changeHandler(event, item)} className='input' type='text' />)}
            </div>

            <div data-error={!!error} className={`input-error text--center text--p4 text--color-primary`}>{error}</div>
        </>
    )
}