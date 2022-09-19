import Image from 'next/image';
import {useRef} from 'react';
import style from '../styles/module/range-line.module.scss'

export default function RangeLine({iconStart, iconEnd}) {
    let offsetLeft          = 0
    let maxOffset           = 0
    let contWidth           = 0
    let coefficient         = 0
    let isMouseDown         = false
    let currentPosition     = 'start'
    const refLine           = useRef(null)
    const refContainer      = useRef(null)
    const mouseLeaveHundler = () => {
        isMouseDown = false
        refContainer.current.style.transition = '.2s ease-out'
        refContainer.current.style.transform = currentPosition === 'start'
            ? 'translateX(0)'
            : `translateX(${maxOffset - contWidth}px)`
        coefficient = currentPosition === 'end' ? 0 : contWidth
    }
    const mouseDownHandler  = () => {
        isMouseDown = true
        refContainer.current.style.transition = '0s'
        if (!offsetLeft) offsetLeft = refLine.current.offsetLeft + 94 / 2
        if (!maxOffset)  maxOffset  = refLine.current.clientWidth
        if (!contWidth)  contWidth  = refContainer.current.clientWidth
    }
    const mouseMoveHandler  = (e) => {
        if (!isMouseDown) return
        const translate = e.clientX - offsetLeft
        if (translate >= 0 && translate <= maxOffset) {
            refContainer.current.style.transform = `translateX(${translate}px)`
        }
        const nowPosition = translate <= (maxOffset / 2) - coefficient ? 'start' : 'end'
        if (nowPosition !== currentPosition) {
            currentPosition = nowPosition
            refContainer.current.setAttribute('data-position', currentPosition)
        }
    }
    return (
        <div 
            ref={refLine}
            onMouseLeave={mouseLeaveHundler}
            onMouseUp={mouseLeaveHundler}
            onMouseMove={mouseMoveHandler} 
            className={style.rangeLine}>
            <div 
                onMouseDown={mouseDownHandler} 
                ref={refContainer}
                data-position='start'
                className={`${style.container} c-dragh`}>
                <div className={style.iconStart}>
                    <Image src={iconStart} alt='' width='100%' height='100%'/>
                </div>
                <div className={style.iconEnd}>
                    <Image src={iconEnd} alt='' width='100%' height='100%'/>
                </div>
            </div>
            <div className={style.moveTrack}>
                <div/>
                <div/>
                <div/>
            </div>
            <div className={style.containerEnd}></div>
        </div>
    );
}
