import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import Icon from '../../../Icon'

export default function Delivery({ summ, maxSumm }) {
    const [width, setWidth] = useState(0)
    const [translateX, setTranslateX] = useState(0)
    const [text, setText] = useState((maxSumm - summ))
    const refInline = useRef(null)

    useEffect(() => {
        const percent = Math.min(summ / maxSumm * 100, 100)
        setWidth(percent)
        // setTranslateX(percent * (refInline.current.clientWidth / 100) + 20)
        setText(Math.max(maxSumm - summ, 0))
    }, [summ])

    return (
        <div data-active={text === 0} className={style.delivery}>
            <Icon external={style.icon} name='deliveryS' width={18} height={18} />
            <Icon external={style.icon} name='deliveryC' width={21} height={20} />
            <div className={`${style.text} text--t6 text--upper text--sparse`}>
                <span className='text--bold'>{text.toLocaleString()}&nbsp;₽</span>
                <span className='text--normal'>&nbsp;До бесплатной доставки</span>
            </div>
            <div ref={refInline} className={`${style.inline}`}>
                <div style={{ width: `calc(${width}% + 20px)` }} className={`${style.line}`} />
                {/* <div style={{ transform: `translateX(${translateX}px)` }} className={`${style.arrow}`}>
                    <svg width="9" height="7" viewBox="0 0 7 7" fill="none">
                        <path d="M3.3547 6.2934C3.0546 6.0079 3.0427 5.5332 3.3282 5.2331L4.5013 4H1.25C0.83579 4 0.5 3.6642 0.5 3.25C0.5 2.8358 0.83579 2.5 1.25 2.5H4.5013L3.3282 1.2669C3.0427 0.966803 3.0546 0.492123 3.3547 0.206623C3.6548 -0.0788869 4.1295 -0.0670467 4.415 0.233053L6.7934 2.7331C7.0689 3.0226 7.0689 3.4774 6.7934 3.7669L4.415 6.2669C4.1295 6.567 3.6548 6.5789 3.3547 6.2934Z" fill="currentColor" />
                    </svg>
                </div> */}
            </div>
        </div>
    )
}