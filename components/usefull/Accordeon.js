import { useState, useEffect, useRef } from 'react'
import style from '../../styles/module/usefull/Accordeon.module.scss'

export default function Accordeon({ children, title, open = false, updateHeight = false }) {
    const [isOpen, setIsOpen] = useState(open)
    const refChildrenContainer = useRef(null)
    const refContainerHeight = useRef(null)
    const refAccordeon = useRef(null)
    const refTitle = useRef(null)

    useEffect(() => {
        refContainerHeight.current = refChildrenContainer.current.offsetHeight + refTitle.current.offsetHeight
        const newHeight = isOpen ? refContainerHeight.current : refTitle.current.offsetHeight
        refAccordeon.current.style.height = `${newHeight}px`

        const resizeHandler = () => {
            refContainerHeight.current = refChildrenContainer.current.clientHeight + refTitle.current.offsetHeight
            const newHeight = isOpen ? refContainerHeight.current : refTitle.current.offsetHeight
            refAccordeon.current.style.height = `${newHeight}px`
        }

        window.addEventListener('resize', resizeHandler)

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    const toggleHandler = () => {
        setIsOpen(!isOpen)
        const newHeight = !isOpen ? refContainerHeight.current : refTitle.current.offsetHeight
        refAccordeon.current.style.height = `${newHeight}px`

        if (updateHeight) {
            updateHeight(newHeight)
        }
    }

    return (
        <div ref={refAccordeon} data-open={isOpen} className={style.accordeon}>
            <div ref={refTitle} onClick={toggleHandler} className={`${style.accordeonTitle} ${style.text4} text--a3 text--bold`}>{title}</div>

            <div ref={refChildrenContainer}>
                {children}
            </div>
        </div>
    )
}