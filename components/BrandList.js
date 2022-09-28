import Image from 'next/image'
import { motion, useDragControls, useTransform, useMotionValue, useAnimation } from 'framer-motion'
import style from '../styles/module/brand-list.module.scss'
import { useEffect, useRef, useState } from 'react'

export default function BrandList({ items }) {
    const [sliderActive, setSliderActive] = useState(false)
    const [activeElem, setActiveElem]     = useState(false)
    const [letter, setLetter]             = useState('AZ')
    
    const steps          = items.length
    const soringItems    = items.sort()
    const refSlider      = useRef(null)
    const refSliderItem  = useRef(null)
    const refCurrentItem = useRef(null)
    const refContent     = useRef(null)
    const controls       = useDragControls()
    const animateScroll  = useAnimation()

    const y = useMotionValue(0)
    const tickPathA = useTransform(y, [0, 100, 200,300,400,500, 600], [0, 100, 200,300,400,500, 600]);
    const startDrag = event => {
        setSliderActive(true)
    }

    const endDrag = (_, info) => {
        if (info.point.y <= 150) {
            setSliderActive(false)
        }
    }

    const clickHandler = (event) => {
        console.log(event.target.closest(`.${style.brandListSliderContentItem}`));
        setActiveElem(event.target.closest(`.${style.brandListSliderContentItem}`))
    }

    const moveDrag = (event, info) => {
        const index = Math.floor(event.y / (refSlider.current.clientHeight / steps))
        if (soringItems[index] && refCurrentItem.current !== soringItems[index].name) {
            setActiveElem(soringItems[index])
            refCurrentItem.current = soringItems[index].name
            setLetter(refCurrentItem.current[0].toUpperCase())
            animateScroll.start({y: index * -60})
            // console.log(refCurrentItem.current);
        } else if(!soringItems[index] && letter !== 'AZ') {
            console.log(letter);
            setLetter('AZ')
            setActiveElem(false)
        }
        // console.log(info.point.y);
    }

    return (
        <div className={style.brandList}>
            <h1 className={style.brandListTitle}>
                Бренды
            </h1>
            <div className={style.brandListTagsContainer}>
                <div className={`${style.brandListTagsInner} c-dragh`}>
                    <div>Барберинг</div>
                    <div>Женские стрижки</div>
                    <div>Окрашивание волос</div>
                    <div>Укладки и прически</div>
                    <div>Барберинг</div>
                    <div>Барберинг</div>
                    <div>Барберинг</div>
                    <div>Барберинг</div>
                    <div>Барберинг</div>
                </div>
            </div>

            <div ref={refSlider} data-active={sliderActive} className={style.brandListSlider}>
                <motion.div 
                    drag="y" 
                    dragConstraints={refSlider}
                    ref={refSliderItem}
                    dragMomentum={false}
                    onPanStart={startDrag}
                    onUpdate={moveDrag}
                    onPanEnd={endDrag}
                    className={`${style.brandListSliderItem} text--p2 c-dragv`}>
                        {letter}
                    </motion.div>
                <svg className={style.brandListSliderArrow} width='25' height='72' viewBox='0 0 25 72' fill='none'>
                    <path fillRule='evenodd' clipRule='evenodd' d='M22.5234 7.98413L13.493 17.0146L12.4947 16.0163L21.5252 6.98586L22.5234 7.98413Z' fill='#6C7996' />
                    <path fillRule='evenodd' clipRule='evenodd' d='M3.47462 6.98536L12.5036 16.0145L11.5053 17.0128L2.47634 7.98362L3.47462 6.98536Z' fill='#6C7996' />
                    <g opacity='0.6'>
                        <path fillRule='evenodd' clipRule='evenodd' d='M22.5234 31.9841L13.493 41.0146L12.4947 40.0163L21.5252 30.9859L22.5234 31.9841Z' fill='#6C7996' />
                        <path fillRule='evenodd' clipRule='evenodd' d='M3.47462 30.9854L12.5036 40.0145L11.5053 41.0128L2.47634 31.9836L3.47462 30.9854Z' fill='#6C7996' />
                    </g>
                    <g opacity='0.3'>
                        <path fillRule='evenodd' clipRule='evenodd' d='M22.5234 55.9841L13.493 65.0146L12.4947 64.0163L21.5252 54.9859L22.5234 55.9841Z' fill='#6C7996' />
                        <path fillRule='evenodd' clipRule='evenodd' d='M3.47462 54.9854L12.5036 64.0145L11.5053 65.0128L2.47634 55.9836L3.47462 54.9854Z' fill='#6C7996' />
                    </g>
                </svg>
                <div className={style.brandListSliderLine}></div>
            </div>

            <div className={style.brandListSliderContent}>
                <motion.div animate={animateScroll} ref={refContent} className={style.brandListSliderContentInner}>
                    {soringItems.map((item) => (
                        <div 
                            key={item.name}
                            data-active={activeElem == item}
                            onClick={clickHandler}
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
