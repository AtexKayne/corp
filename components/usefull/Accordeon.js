import { useState, useEffect, useRef } from 'react'
import style from '../../styles/module/usefull/Accordeon.module.scss'

export default function Accordeon({ children, title, open = false }) {
    const [isOpen, setIsOpen] = useState(open)
    const refChildrenContainer = useRef(null)
    const refContainerHeight = useRef(null)
    const refAccordeon = useRef(null)
    const titleHeight = 50

    useEffect(() => {
        refContainerHeight.current = refChildrenContainer.current.clientHeight + titleHeight
        const newHeight = isOpen ? refContainerHeight.current : titleHeight
        refAccordeon.current.style.height = `${newHeight}px`
    }, [])

    const toggleHandler = () => {
        setIsOpen(!isOpen)
        const newHeight = !isOpen ? refContainerHeight.current : titleHeight
        refAccordeon.current.style.height = `${newHeight}px`
    }
    return (
        <div ref={refAccordeon} data-open={isOpen} className={style.accordeon}>
            <div onClick={toggleHandler} className={`${style.accordeonTitle} ${style.text4} text--p1 text--bold`}>{title}</div>

            <div ref={refChildrenContainer}>
                {children}
            </div>
        </div>
    )
}