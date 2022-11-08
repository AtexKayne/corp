import Image from 'next/image'
import Arrow from '../../components/Arrow'
import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import style from '../../styles/module/brand/brand-history-mobile.module.scss'

export default function BrandHistoryMobile({ history }) {
    const refBlock = useRef(null)
    const isInView = useInView(refBlock)
    const [activeItem, setActiveItem] = useState(0)
    const animateFiller = useAnimationControls()

    useEffect(() => {
        if (isInView) {
            animateFiller.start({ y: 600, borderWidth: ['1px', '10px', '0px'], transition: { duration: 2, delay: 0.3 } })
        }
    }, [isInView])

    const clickHandler = index => {
        if (index === activeItem) return
        animateFiller.start({ y: 0, borderWidth: ['1px', '10px', '1px'], transition: { duration: 1 } })
            .then(() => {
                setActiveItem(index)
                animateFiller.start({ y: 600, borderWidth: ['1px', '10px', '0px'], transition: { duration: 1 } })
            })
    }

    return (
        <section className='pb-3' id='history' data-scroll-section>
            <h2 className={`${style.title} text--t1 pb-3`}>История успеха</h2>
            <div ref={refBlock} className={style.container}>
                {history ?
                    history.map((element, index) => (
                        <div data-active={activeItem === index} key={element.name} className={style.item}>
                            <div className={style.itemWrapper}>
                                <div className={`${style.itemTitle} mb-1 pt-1 text--h4`}>
                                    {element.name}
                                    <Arrow />
                                </div>
                                <div className={`${style.itemInfo} text--t1`}>{element.city}</div>
                                <div className={`${style.itemInfo} text--bold text--t2`}>{element.place}</div>
                                <div className={style.image}>
                                    <Image src={element.image} width='325' height='300' alt={element.name} />
                                </div>
                            </div>
                            <div onClick={() => clickHandler(index)} className={`${style.itemSelector} text--t2`}>{element.name}</div>
                        </div>
                    ))
                    : ''
                }

                <motion.div animate={animateFiller} initial={{ y: 0 }} className={style.filler} />
            </div>
        </section>
    )
}

