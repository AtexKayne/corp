import Image from 'next/image'
import { motion, useDragControls, useTransform, useMotionValue, useAnimation } from 'framer-motion'
import style from '../styles/module/brand-list.module.scss'
import { useEffect, useRef, useState } from 'react'

export default function BrandList({ items }) {
    const [sliderActive, setSliderActive] = useState(false)
    const [activeElem, setActiveElem]     = useState(false)
    const [elements, setElements]         = useState(items)
    const [letter, setLetter]             = useState('AZ')
    const steps          = items.length
    const refSlider      = useRef(null)
    const refSliderItem  = useRef(null)
    const refCurrentItem = useRef(null)
    const refContent     = useRef(null)
    const animateScroll  = useAnimation()
    const animateItem    = useAnimation()
    const startDrag      = () => setSliderActive(true)
    const clickHandler   = index => {
        setSliderActive(true)
        const position = index * refSlider.current.clientHeight / steps + 10
        animateItem.start({y: position, transition: {type: 'tween'}})
    }
    const moveDrag = event => {
        const index = Math.floor(event.y / (refSlider.current.clientHeight / steps))
        if (elements[index] && refCurrentItem.current !== elements[index].name && sliderActive) {
            refCurrentItem.current = elements[index].name
            animateScroll.start({y: index * -60, transition: {type: 'tween'}})
            setActiveElem(elements[index])
            setLetter(refCurrentItem.current[0].toUpperCase())
        } else if(!elements[index] && letter !== 'AZ') {
            refCurrentItem.current = false
            setLetter('AZ')
            setActiveElem(false)
            setSliderActive(false)
        }
    }

    useEffect(() => {
        setElements(items.sort((x, y) => {
            const xName = x.name.toUpperCase()
            const yName = y.name.toUpperCase()
            if (xName < yName) { return -1 }
            if (xName > yName) { return 1  }
            return 0
        }))
    }, [items])

    return (
        <div className={style.brandList}>
            <h1 className={style.brandListTitle}>
                Бренды
            </h1>
            <div className={style.brandListTagsContainer}>
                <motion.div dragConstraints={{left: -127, right: 0}} drag="x" className={`${style.brandListTagsInner} c-dragh`}>
                    <div>Барберинг</div>
                    <div>Женские стрижки</div>
                    <div>Окрашивание волос</div>
                    <div>Укладки и прически</div>
                    <div>Барберинг</div>
                    <div>Барберинг</div>
                    <div>Барберинг</div>
                    <div>Барберинг</div>
                    <div>Барберинг</div>
                </motion.div>
            </div>

            <div ref={refSlider} data-active={sliderActive} className={style.brandListSlider}>
                <motion.div 
                    animate={animateItem}
                    drag="y" 
                    dragConstraints={refSlider}
                    ref={refSliderItem}
                    dragMomentum={false}
                    onPanStart={startDrag}
                    onUpdate={moveDrag}
                    className={`${style.brandListSliderItem} text--p2 c-dragv`}>
                        {letter}
                    </motion.div>
                <svg className={style.brandListSliderArrow} width='25' height='72' viewBox='0 0 25 72' fill='none'>
                    <g>
                        <path fillRule='evenodd' clipRule='evenodd' d='M22.5234 7.98413L13.493 17.0146L12.4947 16.0163L21.5252 6.98586L22.5234 7.98413Z' fill='#6C7996' />
                        <path fillRule='evenodd' clipRule='evenodd' d='M3.47462 6.98536L12.5036 16.0145L11.5053 17.0128L2.47634 7.98362L3.47462 6.98536Z' fill='#6C7996' />
                    </g>
                    <g>
                        <path fillRule='evenodd' clipRule='evenodd' d='M22.5234 31.9841L13.493 41.0146L12.4947 40.0163L21.5252 30.9859L22.5234 31.9841Z' fill='#6C7996' />
                        <path fillRule='evenodd' clipRule='evenodd' d='M3.47462 30.9854L12.5036 40.0145L11.5053 41.0128L2.47634 31.9836L3.47462 30.9854Z' fill='#6C7996' />
                    </g>
                    <g>
                        <path fillRule='evenodd' clipRule='evenodd' d='M22.5234 55.9841L13.493 65.0146L12.4947 64.0163L21.5252 54.9859L22.5234 55.9841Z' fill='#6C7996' />
                        <path fillRule='evenodd' clipRule='evenodd' d='M3.47462 54.9854L12.5036 64.0145L11.5053 65.0128L2.47634 55.9836L3.47462 54.9854Z' fill='#6C7996' />
                    </g>
                </svg>
                <div className={style.brandListSliderLine}></div>
            </div>

            <div className={style.brandListSliderContent}>
                <motion.div animate={animateScroll} ref={refContent} className={style.brandListSliderContentInner}>
                    {elements.map((item, index) => (
                        <div 
                            key={item.name}
                            data-active={activeElem == item}
                            onClick={() => clickHandler(index)}
                            className={`${style.brandListSliderContentItem} c-hover`}>
                            <div className={`${style.brandListSliderContentItemTitle} text--h4`}>{item.name}</div>
                            <div className={`${style.brandListSliderContentItemLink} text--h1`}>{item.name}</div>
                            <div className={style.brandListSliderContentItemText}>{item.text}</div>
                            <div className={style.brandListSliderContentItemImage}>
                                <Image src={item.logo} alt={item.name} width='100%' height='100%' />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
