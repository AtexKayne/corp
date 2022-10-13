import style from '../styles/module/scrollbar.module.scss'
import { SmoothScrollContext } from './helpers/SmoothScroll.context'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { useTransform, useMotionValue } from 'framer-motion'

export default function Scrollbar({ scrollComponents, setTheme }) {
    const { scroll }                           = useContext(SmoothScrollContext)
    const refLinksContainer                    = useRef()
    const y                                    = useMotionValue(0)
    const [links, setLinks]                    = useState([0])
    const [sectionOffsets, setSectionOffsets]  = useState([0,1])
    const [scrollPositions, setScrollPosition] = useState([0,1])
    const scrollPosition                       = useTransform(y, sectionOffsets, scrollPositions)


    const clickHandler = event => {
        event.preventDefault()
        scroll && scroll.scrollTo(event.target.dataset.href)
    }

    useEffect(() => {
        if (!scroll) return
        let isScrolling
        const sectionsClientTop = scrollComponents.map(element => {
            return document.querySelector(`#${element.id}`).getBoundingClientRect().top
        })
        const newScrollPositions = scrollComponents.map((_, index) => `${(index + 1) * 60}px`)

        setSectionOffsets([...sectionsClientTop])
        setScrollPosition([...newScrollPositions])

        const scrollHandler = event => {
            if (isScrolling) return
            isScrolling = true
            y.set(event.scroll.y)
            const activeLinks = sectionsClientTop.map((element, index) => (element <= event.scroll.y + 3) ? index : null)
            setLinks(activeLinks)
            setTheme(event.scroll.y >= window.innerHeight - 20 ? 'ui-light' : 'ui-transparent')
            setTimeout(() => isScrolling = false, 400)
        }


        scroll.on('scroll', scrollHandler)

        return () => {
            scroll.off('scroll', scrollHandler)
        }
    }, [scroll]);

    return (
        <div className={style.scrollbar}>
            <div className={style.pathContainer}>
                {scrollComponents.map((element, index) => (
                    <React.Fragment key={element.id}> <div /><div /><div /> </React.Fragment>
                ))}
            </div>
            <div style={{ height: scrollPosition.current }} data-active className={style.pathContainer}>
                {scrollComponents.map((element, index) => (
                    <React.Fragment key={element.id}> <div /><div /><div /> </React.Fragment>
                ))}
            </div>
            <div ref={refLinksContainer}>
                {scrollComponents.map((element, index) => (
                    <a 
                        onClick={clickHandler} 
                        data-href={`#${element.id}`} 
                        key={element.id} 
                        data-active={links.includes(index)} 
                        className={`${style.scrollLink} c-hover`}>
                            {element.icon 
                                ? (
                                    <>
                                        <div style={{backgroundImage: `url(${element.icon}-default.svg)`}}/>
                                        <div style={{backgroundImage: `url(${element.icon}-active.svg)`}}/>
                                    </>
                                ) : ''}
                    </a>
                ))}
            </div>
        </div>
    )
}
