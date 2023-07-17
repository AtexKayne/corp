import { useState, useEffect, useRef } from 'react'
import style from './Inputs.module.scss'
import Icon from '../../../Icon'
import { motion, useAnimationControls } from 'framer-motion'
import { globalState } from '../../../helpers/globalState'

export default function InputCats({ info, filters, onAfterChange }) {
    const [countSelected, setCountSelected] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const animateWrapper = useAnimationControls()

    const toggleWrapper = () => {
        if (window.innerWidth > globalState.sizes.lg) {
            const height = isOpen ? 36 : 'auto'
            setIsOpen(!isOpen)
            animateWrapper.start({ height, transition: { duration: 0.3 } })
        }
    }

    const checkboxChange = item => {
        onAfterChange(info.code, item)
    }

    const resetHandler = () => {
        onAfterChange(info.code, 'reset')
    }

    useEffect(() => {
        const thisFilter = filters.find(item => item.code === info.code)
        let count = 0
        thisFilter.values.forEach(element => {
            if (element.isSelected) count++
            if (!element.include) return
            element.include.forEach(item => {
                if (item.isSelected) count++
            })
        })
        setCountSelected(count)
    }, [filters])

    return (
        <div className={`${style.container}`}>
            <motion.div data-open={isOpen} animate={animateWrapper} initial={{ height: 36 }} className={style.wrapper}>
                <div onClick={resetHandler} data-active={!!countSelected} className={`${style.filterReset}`} >
                    <Icon name='close' width='7' height='7' />
                </div>
                <div onClick={toggleWrapper} className={`${style.title} text--t3 text--upper`}>
                    <span>
                        {info.name}
                        <div data-selected={!!countSelected} className={`${style.titleCount}`}>
                            {countSelected}
                        </div>
                    </span>
                    <Icon external={style.icon} name='chevronDown' width='16' height='16' />
                </div>
                <div className={`${style.itemList}`}>
                    {info.values.map(item => {
                        return item.include && item.include.length
                            ? <ChecboxInclude key={item.value} item={item} onAfterChange={checkboxChange} />
                            : <Checkbox key={item.value} item={item} onAfterChange={checkboxChange} />
                    })}
                </div>
            </motion.div>
        </div>
    )
}

function ChecboxInclude({ item, onAfterChange }) {
    const [isOpen, setIsOpen] = useState(false)
    const animateWrapper = useAnimationControls()

    const checkboxChange = item => {
        onAfterChange(item)
    }

    const toggleWrapper = () => {
        if (window.innerWidth > globalState.sizes.lg) {
            const height = isOpen ? 36 : 'auto'
            setIsOpen(!isOpen)
            animateWrapper.start({ height, transition: { duration: 0.3 } })
        }
    }

    return (
        <motion.div data-open={isOpen} animate={animateWrapper} initial={{ height: 36 }} className={style.includeCheckboxWrapper}>
            <div onClick={toggleWrapper} className={style.includeCheckboxTitle}>
                <Icon external={style.includeCheckboxIcon} name='chevronDown' width='16' height='16' />
                {item.value}
            </div>
            <div className={`${style.includeCheckboxList}`}>
                {item.include.map(item => <Checkbox key={item.value} item={item} onAfterChange={checkboxChange} />)}
            </div>
        </motion.div>
    )
}

function Checkbox({ item, onAfterChange }) {
    const clickHandler = () => {
        onAfterChange(item)
    }
    return (
        <div onClick={clickHandler} data-selected={item.isSelected} className={`${style.checkbox}`}>
            <div className={`${style.boxIcon}`}>
                <Icon name='check' width='15' height='15' />
            </div>
            {item.value}
        </div>
    )
}