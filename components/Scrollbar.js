import style from '../styles/module/scrollbar.module.scss'
import { SmoothScrollContext } from './helpers/SmoothScroll.context'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { motion, useTransform, useMotionValue } from 'framer-motion'

export default function Scrollbar({ scrollComponents }) {
    const { scroll } = useContext(SmoothScrollContext)
    const y = useMotionValue(0)
    const [links, setLinks] = useState([])
    const refLinksContainer = useRef()
    const limit = 10127
    const scrollPosition = useTransform(y, [0, limit], ['0px', `${scrollComponents.length * 60}px`])
    // const scrollPosition = useTransform(y, [0, media.length * 150], ['-80%', '20%'])
    const scrollHandler = event => {
        event.deltaY > 0 && scroll && scroll.scrollTo('#about')
    }

    useEffect(() => {
        if (!scroll) return
        let isScrolling
        const sections = scrollComponents.map(element => {
            return document.querySelector(`#${element.id}`).getBoundingClientRect().top
        })

        sections.forEach(element => {

        });

        const scrollHandler = event => {
            if (!isScrolling) {
                isScrolling = true
                setTimeout(() => {
                    y.set(event.scroll.y)
                    console.log(scrollPosition);
                    const activeLinks = sections.map((element, index) => (element <= event.scroll.y) ? index : null)
                    setLinks([...activeLinks])
                    isScrolling = false
                }, 400)
            }
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
            {/* <svg className={style.scrollbarDefault} width='11' height='422' viewBox='0 0 11 422' fill='none'>
                <path d='M1.49995 1.15674L9.49995 21.1567L1.49995 41.1567L9.49995 61.1567L1.49995 81.1567L9.49995 101.157L1.49995 121.157L9.49995 141.157L1.49995 161.157L9.49994 181.157L1.49995 201.157L9.49994 221.157L1.49994 241.157L9.49997 261.157L1.49997 281.157L9.49997 301.157L1.49997 321.157L9.49997 341.157L1.49997 361.157L9.49998 381.157L1.49998 401.157L9.49998 421.157' stroke='#DADFEA' strokeWidth='2' />
            </svg>
            <svg className={style.scrollbarActive} width='11' height='422' viewBox='0 0 11 422' fill='none'>
                <motion.path
                    d='M1.49995 1.15674L9.49995 21.1567L1.49995 41.1567L9.49995 61.1567L1.49995 81.1567L9.49995 101.157L1.49995 121.157L9.49995 141.157L1.49995 161.157L9.49994 181.157L1.49995 201.157L9.49994 221.157L1.49994 241.157L9.49997 261.157L1.49997 281.157L9.49997 301.157L1.49997 321.157L9.49997 341.157L1.49997 361.157L9.49998 381.157L1.49998 401.157L9.49998 421.157'
                    stroke='#FFA900'
                    style={{ pathLength: scrollPosition }}
                    strokeWidth='2' />
            </svg> */}
            <div ref={refLinksContainer}>
                {scrollComponents.map((element, index) => (
                    <div key={element.id} data-active={links.includes(index)} className={style.scrollLink}></div>
                ))}
            </div>
        </div>
    )
}
