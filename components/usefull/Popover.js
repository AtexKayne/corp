import { useState, useEffect, useRef } from 'react'
import { globalState } from '../helpers/globalState'
import style from '../../styles/module/usefull/Popover.module.scss'

export default function Popover() {
    const [rightPosition, setRightPosition] = useState(0)
    const [topPosition, setTopPosition] = useState(0)
    const [isOpen, setIsOpen] = useState('')

    const refTouch = useRef(0)
    const refCount = useRef(0)
    const refImage = useRef('')
    const refPopover = useRef(null)
    const refIsBasket = useRef(false)
    const refTextPrimary = useRef('')
    const refTextSecondary = useRef('')

    const getLayout = () => {
        let layout = !refImage.current
            ? '' : `<div class="${style.popoverImage}">
                <img src="${refImage.current}" width='50' height='50' alt='' />
            </div>`
        layout += `
            <div class="${style.popoverText}">
                <div class="text--p5 mb-0.6">${refTextPrimary.current}</div>
                <div class="text--p7 text--color-smallest text--upper text--bold">${refTextSecondary.current}</div>
            </div>
        `
        if (refIsBasket.current) {
            layout += `<a class="${style.popoverBasket} text--p6 text--bold">ОТКРЫТЬ</a>`
        }

        layout += `<div class="${style.popoverClose} is-hidden--sm-down">
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.24322 3.26413C3.39915 3.10872 3.61054 3.02143 3.83093 3.02143C4.05132 3.02143 4.2627 3.10872 4.41864 3.26413L7.98926 6.82709L11.5599 3.26413C11.636 3.18259 11.7279 3.1172 11.8299 3.07184C11.9319 3.02649 12.042 3.0021 12.1537 3.00013C12.2653 2.99816 12.3762 3.01866 12.4798 3.0604C12.5834 3.10214 12.6774 3.16426 12.7564 3.24306C12.8354 3.32187 12.8976 3.41575 12.9394 3.51907C12.9812 3.62241 13.0019 3.73309 12.9999 3.84452C12.9979 3.95595 12.9735 4.06584 12.928 4.16764C12.8825 4.26944 12.817 4.36106 12.7353 4.43703L9.16467 7.99999L12.7353 11.563C12.817 11.639 12.8825 11.7306 12.928 11.8324C12.9735 11.9342 12.9979 12.0441 12.9999 12.1555C13.0019 12.2669 12.9812 12.3776 12.9394 12.4809C12.8976 12.5843 12.8354 12.6781 12.7564 12.7569C12.6774 12.8358 12.5834 12.8978 12.4798 12.9396C12.3762 12.9813 12.2653 13.0019 12.1537 12.9999C12.042 12.9979 11.9319 12.9735 11.8299 12.9282C11.7279 12.8828 11.636 12.8174 11.5599 12.7359L7.98926 9.17289L4.41864 12.7359C4.26098 12.8825 4.05245 12.9622 3.837 12.9585C3.62154 12.9546 3.41598 12.8675 3.26359 12.7155C3.11122 12.5635 3.02394 12.3583 3.02014 12.1433C3.01633 11.9283 3.09632 11.7203 3.24322 11.563L6.81384 7.99999L3.24322 4.43703C3.08748 4.28143 3 4.0705 3 3.85058C3 3.63066 3.08748 3.41974 3.24322 3.26413Z" fill="currentColor"/>
            </svg>
        </div>`

        const inner = document.createElement('div')
        inner.classList.add(style.popoverInner)
        inner.classList.add(refCount.current)
        inner.setAttribute('data-active', 'false')
        inner.innerHTML = layout

        return inner
    }

    const setPositions = () => {
        if (window.innerWidth < globalState.sizes.md) {
            setTopPosition(15)
            setRightPosition(15)
        } else {
            setTopPosition(40)
            setRightPosition(40)
        }

    }

    const removeItem = element => {
        new Promise(resolve => {
            setTimeout(() => {
                element.setAttribute('data-active', false)
                resolve(element)
            }, 4000)
        }).then(item => {
            setTimeout(() => {
                item.remove()
                if (refCount.current - 1 >= 0) refCount.current--
            }, 400)
        })
    }

    const removeItemImmediatly = element => {
        if (!element) return
        element.setAttribute('data-active', false)
        setTimeout(() => {
            element.remove()
            if (refCount.current - 1 >= 0) refCount.current--
        }, 400)
    }

    const openHandler = open => {
        setIsOpen(open)
        if (open) {
            setPositions()

            refCount.current++
            const item = refPopover.current.appendChild(getLayout())
            setTimeout(() => {
                item.setAttribute('data-active', true)
            }, 100)

            removeItem(item)

            if (refCount.current > 3) {
                refPopover.current.querySelector(`.${style.popoverInner}`).remove()
            }
        }
    }

    const touchStartHandler = event => {
        const target = event.target
        const parent = target.closest(`.${style.popoverInner}`)
        if (!parent) return
        refTouch.current = {
            parent,
            y: event.touches[0].clientY
        }
    }

    const touchMoveHandler = event => {
        if (!!refTouch.current.y) {
            const y = event.touches[0].clientY
            const offset = refTouch.current.y - y
            refTouch.current.offset = offset
            if (Math.abs(offset) < 60) {
                refTouch.current.parent.style.transform = `translateY(${-offset}px)`
            }
        }
    }

    const touchEndHandler = () => {
        if (Math.abs(refTouch.current.offset) > 30) {
            removeItemImmediatly(refTouch.current.parent)
        }
        refTouch.current.parent.style.transform = 'translateY(0)'
        refTouch.current.y = false
        refTouch.current.offset = false
        refTouch.current.parent = false
    }

    const closeHandler = event => {
        const target = event.target
        if (target.classList.contains(style.popoverClose)) {
            const parent = target.closest(`.${style.popoverInner}`)
            removeItemImmediatly(parent)
        }
    }

    const setImage = src => refImage.current = src
    const setIsBasket = condition => refIsBasket.current = condition
    const setTextSecondary = text => refTextSecondary.current = text
    const setTextPrimary = text => refTextPrimary.current = text

    const open = (texts, image = '', isBasket = false) => {
        setTextPrimary(texts[0])
        setTextSecondary(texts[1])
        setImage(image)
        setIsBasket(isBasket)
        openHandler(true)
    }

    useEffect(() => {
        globalState.popover = {
            setIsOpen: openHandler,
            setTextSecondary,
            setRightPosition,
            setTextPrimary,
            setTopPosition,
            setIsBasket,
            setImage,
            open,
        }

        if (typeof window === 'undefined') return

        refPopover.current.addEventListener('touchstart', touchStartHandler)
        refPopover.current.addEventListener('touchmove', touchMoveHandler)
        refPopover.current.addEventListener('touchend', touchEndHandler)

        return () => {
            if (refPopover.current) {
                refPopover.current.removeEventListener('touchstart', touchStartHandler)
                refPopover.current.removeEventListener('touchmove', touchMoveHandler)
                refPopover.current.removeEventListener('touchend', touchEndHandler)
            }
        }
    }, [])


    return (
        <div
            style={{
                top: `${topPosition}px`,
                right: `${rightPosition}px`
            }}
            ref={refPopover}
            data-open={isOpen}
            onClick={closeHandler}
            className={style.popover}>
        </div>
    )
}