import { useEffect, useRef, useState } from 'react'
import { fillArray } from '../../helpers/fillArray'

export default function InputCode({ count, onChange, reset, onAfterComplete, type = 'text' }) {
    const items = fillArray(count)
    const refInputWrapper = useRef(null)

    const keyDownHandler = (event, index) => {
        const key = event.key
        const target = event.target
        const keyCode = event.keyCode
        const childrens = refInputWrapper.current.childNodes

        onChange(event, index)

        childrens.forEach(input => {
            if (input.value.length > 1) input.value = input.value[0]
        })

        if (key === 'Backspace' || keyCode === 8) {
            if (target.value.length !== 0) target.value = ''
            else if (index !== 0) {
                childrens[index - 1].value = ''
                childrens[index - 1].focus()
            }
            target.setAttribute('data-focus', false)
            return
        }

        // if (key === ' ' || keyCode === 32) {
        //     setTimeout(() => target.value = '', 50)
        //     return
        // }

        target.setAttribute('data-focus', true)

        if (index !== count - 1) {
            childrens[index + 1].value = ''
            setTimeout(() => childrens[index + 1].focus(), 50)
            return
        }

        setTimeout(() => {
            let code = ''
            childrens.forEach(input => {
                code += input.value
            })

            if (code.length === count) onAfterComplete(code)
        }, 70)
    }

    const changeHandler = event => {
        const target = event.target
        if (target.value.length > 1) target.value = target.value[0]
        if (target.value === ' ') target.value = ''
    }

    const focusHandler = (event, index) => {
        event.preventDefault()
        event.target.focus({ preventScroll: true })
        if (index === 0 || !!event.target.value) return event.target.setSelectionRange(0, 0)
        const childrens = refInputWrapper.current.childNodes
        event.target.setAttribute('data-focus', false)
        if (!childrens[index - 1].value.trim()) childrens[index - 1].focus()
    }

    const pasteHandler = event => {
        event.preventDefault()
        const paste = (event.clipboardData || window.clipboardData).getData('text')
        if (paste.length !== count) return
        const childrens = refInputWrapper.current.childNodes
        childrens.forEach((input, index) => {
            input.value = paste[index]
            input.setAttribute('data-focus', true)
        })
        setTimeout(() => {
            childrens[count - 1].focus()
            onAfterComplete(paste)
        }, 70)
    }

    useEffect(() => {
        const childrens = refInputWrapper.current.childNodes
        childrens.forEach(input => {
            input.value = ''
            input.setAttribute('data-focus', false)
        })
    }, [reset])

    return (
        <>
            <div ref={refInputWrapper} className={`input-code`}>
                {items.map((item, index) => (
                    <input
                        key={item}
                        type={type}
                        className='input'
                        onPaste={pasteHandler}
                        onChange={event => changeHandler(event)}
                        onFocus={event => focusHandler(event, index)}
                        onKeyDown={event => keyDownHandler(event, item)} />
                ))}
            </div>
        </>
    )
}