import { useState, useEffect, useRef } from 'react'
import style from './Inputs.module.scss'
import Icon from '../../../Icon'
import { motion, useAnimationControls } from 'framer-motion'
import { globalState } from '../../../helpers/globalState'

export default function InputCheckboxList({ info, filters, onAfterChange }) {
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
        if (thisFilter.values && thisFilter.values.length) {
            const count = thisFilter.values.filter(element => element.isSelected).length
            setCountSelected(count)
        }
    }, [filters])

    return (
        <div className={`${style.container}`}>
            <motion.div
                data-open={isOpen}
                animate={animateWrapper}
                initial={{ height: 36 }}
                className={style.wrapper}
                data-disabled={info.isDisabled}>

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
                {info.values && info.values.length
                    ? <div className={`${style.itemList}`}>
                        {info.values.map(item => <Checkbox key={item.value} item={item} onAfterChange={checkboxChange} />)}
                    </div>
                    : null
                }

            </motion.div>
        </div>
    )
}

function Checkbox({ item, onAfterChange }) {
    const clickHandler = () => {
        onAfterChange(item)
    }
    return (
        <div onClick={clickHandler} data-selected={item.isSelected} className={`${style.checkbox}`}>
            <div className={`${style.boxIcon}`}>
                <div className={`${style.iconBorder}`} />
                <Icon external={style.iconAccept} name='checkAnim' width='24' height='24' />
            </div>
            {item.value}
        </div>
    )
}