import { useState, useEffect, useRef } from 'react'
import style from './Inputs.module.scss'
import { motion, useAnimationControls } from 'framer-motion'
import Icon from '../../../Icon'
import { globalState } from '../../../helpers/globalState'

export default function FastFilter({ items, onAfterChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const animateWrapper = useAnimationControls()

    const toggleWrapper = () => {
        if (window.innerWidth > globalState.sizes.lg) {
            const height = isOpen ? 36 : 'auto'
            setIsOpen(!isOpen)
            animateWrapper.start({ height, transition: { duration: 0.3 } })
        }
    }

    return (
        <div className={`${style.container} js-fast-filters`}>
            <motion.div data-open={isOpen} animate={animateWrapper} initial={{ height: 36 }} className={style.wrapper}>
                <div onClick={toggleWrapper} className={`${style.title} text--t3 text--upper`}>
                    <span>Быстрые фильтры</span>
                    <Icon external={style.icon} name='chevronDown' width='16' height='16' />
                </div>
                <div className={`${style.fastFilterList}`}>
                    {items.map(item => <FilterItem key={item.name} item={item} onAfterChange={onAfterChange} />)}
                </div>
            </motion.div>

        </div>
    )
}

function FilterItem({ item, onAfterChange }) {
    const selectHandler = event => {
        const target = event.target
        if (target.getAttribute('data-active') === 'true') return
        const parent = target.parentNode
        const prevActive = parent.querySelector('[data-active="true"]')
        if (prevActive) prevActive.setAttribute('data-active', 'false')
        setTimeout(() => {
            target.setAttribute('data-active', 'true')
        }, 400)
        onAfterChange(item)
    }

    return (
        <div onClick={selectHandler} className={`${style.fastFilterItem} text--upper text--t6 text--normal`}>
            {item.name}
        </div>
    )
}