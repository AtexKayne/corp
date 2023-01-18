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
    const [isFixed, setIsFixed] = useState(false)
    const [isOpen, setIsOpen] = useState('')
    const [image, setImage] = useState('')
    const refContainer = useRef(null)
    const refTimeout = useRef(false)

    const setPositions = () => {
        refContainer.current = document.querySelector('.header-middle-container')
        const rect = refContainer.current.getBoundingClientRect()

        if (rect.top === 0 && rect.right === 0) {
            if (window.scrollY > 20) {
                setTopPosition(15)
                setRightPosition(15)
            } else {
                setTopPosition(60)
                setRightPosition(15)
            }
        } else {
            if (window.scrollY > 20) {
                setTopPosition(40)
                setRightPosition(40)
            } else {
                setTopPosition(rect.top + rect.height + 20)
                setRightPosition(rect.right - rect.width)
            }
        }
    }

    const openHandler = open => {
        if (window.scrollY > 20) setIsFixed(true)
        else setIsFixed(false)

        setPositions()

        if (open) {
            if (refTimeout.current) clearTimeout(refTimeout.current)
            refTimeout.current = setTimeout(() => setIsOpen(false), 6000)
        }

        setIsOpen(open)
    }

    useEffect(() => {
        setPositions()

        globalState.popover = {
            setIsOpen: openHandler,
            setTextSecondary,
            setRightPosition,
            setTextPrimary,
            setTopPosition,
            setIsBasket,
            setImage
        }

        if (typeof window === 'undefined') return
        const resizeHandler = () => {
            const rect = refContainer.current.getBoundingClientRect()
            if (rect.top === 0 && rect.right === 0) {
                setTopPosition(60)
                setRightPosition(15)
            } else {
                setTopPosition(rect.top + rect.height + 20)
                setRightPosition(rect.right - rect.width)
            }
        }
        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    return (
        <div style={{ top: `${topPosition}px`, right: `${rightPosition}px` }} data-open={isOpen} data-fixed={isFixed} className={style.popover}>
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