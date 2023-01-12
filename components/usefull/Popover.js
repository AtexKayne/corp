import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../helpers/globaslState'
import style from '../../styles/module/usefull/Popover.module.scss'

export default function Popover() {
    const [textSecondary, setTextSecondary] = useState('')
    const [rightPosition, setRightPosition] = useState('')
    const [textPrimary, setTextPrimary] = useState('')
    const [topPosition, setTopPosition] = useState('')
    const [isBasket, setIsBasket] = useState(false)
    const [isOpen, setIsOpen] = useState('')
    const [image, setImage] = useState('')
    const refContainer = useRef(null)

    useEffect(() => {
        refContainer.current = document.querySelector('.header-middle-container')
        const rect = refContainer.current.getBoundingClientRect()
        setTopPosition(rect.top + rect.height + 20)
        setRightPosition(rect.right - rect.width)

        globalState.popover = {
            setTextSecondary,
            setRightPosition,
            setTextPrimary,
            setTopPosition,
            setIsBasket,
            setIsOpen,
            setImage
        }

        if (typeof window === 'undefined') return
        const resizeHandler = () => {
            const rect = refContainer.current.getBoundingClientRect()
            setTopPosition(rect.top + rect.height + 20)
            setRightPosition(rect.right - rect.width)
        }
        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    useEffect(() => {
        if (!isOpen) return
        setTimeout(() => setIsOpen(false), 6000)
    }, [isOpen])

    return (
        <div style={{top: `${topPosition}px`, right: `${rightPosition}px`}} data-open={isOpen} className={style.popover}>
            <div className={style.popoverImage}>
                <Image src={image} width='50' height='50' alt='' />
            </div>
            <div className={style.popoverText}>
                <div className='text--p5 mb-0.6'>{textPrimary}</div>
                <div className='text--p6 text--upper text--bold'>{textSecondary}</div>
            </div>
            {isBasket
                ? <a className={`${style.popoverBasket} text--p6 text--bold`}>ОТКРЫТЬ</a>
                : null
            }
        </div>
    )
}