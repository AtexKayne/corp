import { debounce } from '../helpers/debounce'
import { useState, useEffect, useRef } from 'react'

export default function Sticky({ children, external, fixed, offset = 0 }) {
    const refSticky = useRef(null)
    const refFiller = useRef(null)
    const refParent = useRef(null)
    const refStickyTop = useRef(null)

    const scrollHandler = () => {
        const y = window.scrollY
        if (y >= refStickyTop.current - offset) {
            refSticky.current.style.top = `${offset}px`
            refSticky.current.style.position = 'fixed'
            refFiller.current.style.position = 'relative'
            if (fixed) refSticky.current.classList.add(fixed)
        } else {
            refSticky.current.style.top = ''
            refSticky.current.style.position = ''
            refFiller.current.style.position = 'absolute'
            if (fixed) refSticky.current.classList.remove(fixed)
        }
    }

    const resizeHandler = () => {
        const width = refParent.current.clientWidth
        const style = getComputedStyle(refParent.current)
        const paddings = {
            left: style.paddingLeft.replace('px', ''),
            right: style.paddingRight.replace('px', '')
        }
        refSticky.current.style.width = `${width - paddings.left - paddings.right }px`
    }

    const debounceResize = debounce(resizeHandler, 100)
    const debounceScroll = debounce(scrollHandler, 5)

    useEffect(() => {
        refParent.current = refSticky.current.parentNode
        const rect = refSticky.current.getBoundingClientRect()
        refStickyTop.current = rect.y + window.scrollY
        refSticky.current.style.width = `${rect.width}px`
        refFiller.current.style.height = `${rect.height}px`
        refFiller.current.style.position = 'absolute'

        window.addEventListener('scroll', debounceScroll)
        window.addEventListener('resize', debounceResize)
        
        return () => {
            window.removeEventListener('scroll', debounceScroll)
            window.removeEventListener('resize', debounceResize)
        }
    }, [])
    return (
        <>
            <div ref={refFiller} />
            <div ref={refSticky} className={`${external} `}>
                {children}
            </div>
        </>
    )
}