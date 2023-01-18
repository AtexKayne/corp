import { useState, useEffect, useRef } from 'react'
import { globalState } from './helpers/globalState'

export default function Modal() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (isOpen) {
            globalState.toggleBodyClass('f')
        }
    }, [isOpen])
    

    return (
        <div data-open={isOpen} className='modal'>
            <div className='modal__layout' />

        </div>
    )
}