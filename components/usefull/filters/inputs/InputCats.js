import { useState, useEffect, useRef } from 'react'
import style from './Inputs.module.scss'
import Icon from '../../../Icon'
import { motion, useAnimationControls } from 'framer-motion'
import { globalState } from '../../../helpers/globalState'

export default function InputCats({ info, filters, onAfterChange }) {
    const [countSelected, setCountSelected] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const animateWrapper = useAnimationControls()

    const toggleWrapper = () => {
        if (window.innerWidth > globalState.sizes.lg) {
            const height = isOpen ? 36 : 'auto'
            setIsOpen(!isOpen)
            animateWrapper.start({ height, transition: { duration: 0.3 } })
        } else {
            setIsActive(true)
        }
    }

    const checkboxChange = item => {
        onAfterChange(info.code, item)
    }

    const closeListHandler = () => {
        setIsActive(false)
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
                <div data-active={isActive} className={`${style.itemList}`}>
                    <div className={`${style.listTitle} text--t5 text--bold text--upper`}>
                        <span onClick={closeListHandler} className='is-extended'>
                            <Icon name='chevronLeft' width='16' height='16' />
                        </span>
                        <span>{info.name}</span>
                        <div/>
                        <div onClick={resetHandler} className={`${style.resetButton}`}>
                            <span data-is-hidden={!countSelected} className='text--upper text--t6 text--bold text--sparse text--color-primary'>
                                сбросить
                            </span>
                        </div>
                    </div>
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
        const height = isOpen ? 44 : 'auto'
        setIsOpen(!isOpen)
        animateWrapper.start({ height, transition: { duration: 0.3 } })
    }

    return (
        <motion.div data-open={isOpen} animate={animateWrapper} initial={{ height: 44 }} className={style.includeCheckboxWrapper}>
            <div onClick={toggleWrapper} className={`${style.includeCheckboxTitle} text--t3`}>
                <Icon external={style.includeCheckboxIcon} name='chevronDown' width='16' height='16' />
                {item.value}
            </div>
            <div className={`${style.includeCheckboxList}`}>
                {item.include.map(item => <Checkbox key={item.value} item={item} isInclude={true} onAfterChange={checkboxChange} />)}
            </div>
        </motion.div>
    )
}

function Checkbox({ item, onAfterChange, isInclude }) {
    const clickHandler = () => {
        onAfterChange(item)
    }
    return (
        <div onClick={clickHandler} data-selected={item.isSelected} className={`${style.checkbox} ${isInclude ? 'text--t4' : 'text--t3'}`}>
            <div className={`${style.boxIcon}`}>
                <div className={`${style.iconBorder}`} />
                <Icon external={style.iconAccept} name='checkAnim' width='24' height='24' />
            </div>
            {item.value}
        </div>
    )
}