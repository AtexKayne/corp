import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../helpers/globalState'
import style from '../../styles/module/usefull/Popover.module.scss'

export default function Popover() {
    const [rightPosition, setRightPosition] = useState('')
    const [topPosition, setTopPosition] = useState('')

    const [isOpen, setIsOpen] = useState('')

    const refContainer = useRef(null)
    const refPopover = useRef(null)
    const refCount = useRef(0)

    const refImage = useRef('')
    const refTextPrimary = useRef('')
    const refTextSecondary = useRef('')
    const refIsBasket = useRef(false)

    const getLayout = () => {
        let layout = `
            <div class="${style.popoverImage}">
                <img src="${refImage.current}" width='50' height='50' alt='' />
            </div>
            <div class="${style.popoverText}">
                <div class="text--p5 mb-0.6">${refTextPrimary.current}</div>
                <div class="text--p6 text--upper text--bold">${refTextSecondary.current}</div>
            </div>
        `
        if (refIsBasket.current) {
            layout += `<a class="${style.popoverBasket} text--p6 text--bold">ОТКРЫТЬ</a>`
        }

        const inner = document.createElement('div')
        inner.classList.add(style.popoverInner)
        inner.classList.add(refCount.current)
        inner.innerHTML = layout

        return inner
    }

    const setPositions = () => {
        if (!refContainer.current)
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
        setIsOpen(open)
        if (open) {
            setPositions()
    
            refCount.current++
            const item = refPopover.current.appendChild(getLayout())
            item.setAttribute('data-active', true)

            setTimeout(() => {
                item.remove()
                refCount.current--
                // item.setAttribute('data-active', false)
                // setTimeout(() => {
                // }, 200)
            }, 6000)

            if (refCount.current > 3) {
                refPopover.current.querySelector(`.${style.popoverInner}`).remove()
            }
    
        }
    }

    const setImage = src => {
        refImage.current = src
    }
    const setIsBasket = condition => {
        refIsBasket.current = condition
    }
    const setTextSecondary = text => {
        refTextSecondary.current = text
    }
    const setTextPrimary = text => {
        refTextPrimary.current = text
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

    useEffect(() => {
        if (isOpen) window.addEventListener('scroll', setPositions)
        else window.removeEventListener('scroll', setPositions)
    }, [isOpen])


    return (
        <div 
            style={{
                top: `${topPosition}px`,
                right: `${rightPosition}px`
            }}
            ref={refPopover}
            data-open={isOpen}
            className={style.popover}>
        </div>
    )
}