import { motion, useAnimationControls } from 'framer-motion'
import style from './style.module.scss'
import { useRef, useEffect, useState } from 'react'
import Icon from '../../Icon'
import Odometer from '../../usefull/ui/Odometer/Odometer'

export default function SummTotal({ summ, discount = {}, productsText, delivery, bonuses }) {
    const [isOpen, setIsOpen] = useState(false)
    const animateSubs = useAnimationControls()
    const animateWrapper = useAnimationControls()
    const toggleHandler = () => {
        const height = isOpen ? '0' : 'auto'
        animateSubs.start({ height, transition: { duration: 0.3, ease: 'easeInOut' } })
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const height = !summ ? 0 : 'auto'
        const opacity = !summ ? 0 : 1
        const delay = !!summ ? 0.3 : 0
        animateWrapper.start({ height: height, opacity, transition: { duration: 0.3, delay } })
    }, [summ])

    return (
        <motion.div animate={animateWrapper} className={`${style.total}`}>
            <div className='text--t1 pt-2.5'>Сумма заказа</div>
            <div className={`${style.totalContainer} pt-1`}>
                <div className={`${style.totalLine}`}>
                    <span className='text--t4'>{productsText}</span>
                    <div />
                    <span className='text--t3'>{summ.toLocaleString()} <span className='rub'> ₽</span></span>
                </div>
                <div className={`${style.totalLine}`}>
                    <span className='text--t4'>Доставка</span>
                    <div />
                    <span className='text--t3'>{delivery}</span>
                </div>
                {/* <div data-is-hidden={!discount.total} className={`${style.totalLine}`}>
                    <span
                        data-open={isOpen}
                        onClick={toggleHandler}
                        className={`${style.totalSubOpener} text--t4`}
                        data-active={!!(discount.detail && discount.detail.length > 1)}>
                        {!!(discount.detail && discount.detail.length > 1)
                            ? 'Скидки'
                            : 'Скидка по акциям'
                        }
                        <Icon external={style.subOpenIcon} name='chevronDown' width='12' height='12' />
                    </span>
                    <div />
                    <span className='text--t3'>– {discount.total.toLocaleString()} <span className='rub'> ₽</span></span>
                </div> */}
                <motion.div animate={animateSubs} initial={{ height: 0 }} className={`${style.totalLineSubs}`}>
                    {discount.detail && discount.detail.length
                        ? discount.detail.map(detail => (
                            <div key={detail.name} className={`${style.totalLine}`}>
                                <span className='text--t4'>{detail.name}</span>
                                <div />
                                <span className='text--t3'>– {detail.summ.toLocaleString()} <span className='rub'> ₽</span></span>
                            </div>
                        )) : null}
                </motion.div>
                <div className='text--right pb-2'>
                    <div className='pt-1.5 text--t4'>Итого</div>
                    <div className='text--nowrap text--p1 text--bold'>
                        <Odometer number={summ} />
                        <span style={{ transform: 'scale(0.95) translateY(-15px)' }} className='rub'>&nbsp;₽</span>
                    </div>
                    <div data-is-hidden={!`bonuses`} className='text--t4 pt-1'>
                        <span>Вернется Red-баллов&nbsp;</span>
                        <span>{`bonuses`}&nbsp;</span>
                        <span>
                            <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.57836 7.0967L10.6765 11.5H8.57483L5.69413 7.26162H3.42942V11.5H1.61766V7.27377L0.00632882 7.28115L-0.000732422 5.82955L1.61766 5.82215V0.5H6.70872C9.00966 0.5 10.5859 1.85232 10.5859 3.88081C10.5859 5.85982 9.11836 6.91529 7.57836 7.0967ZM6.47319 5.81034C7.77766 5.81034 8.71978 5.03523 8.71978 3.88081C8.71978 2.72639 7.77766 1.95127 6.47319 1.95127H3.42942V5.81034H6.47319Z" fill="#E21B25" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
