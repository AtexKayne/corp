import { useState, useEffect, useRef } from 'react'
import style from './Inputs.module.scss'
import Icon from '../../../Icon'
import { motion, useAnimationControls } from 'framer-motion'
import { globalState } from '../../../helpers/globalState'
import Checkbox from './Checkbox'

export default function InputCheckboxList({ info, filters, onAfterChange }) {
    const [countSelected, setCountSelected] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
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

    const closeListHandler = () => {
        setIsActive(false)
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
                {info.values.length > 7
                    ? <Search />
                    : null
                }
                {info.values && info.values.length
                    ? <div data-active={isActive} className={`${style.itemList} js-search-container`}>
                        <div className={`${style.listTitle} text--t5 text--bold text--upper`}>
                            <span onClick={closeListHandler} className='is-extended'>
                                <Icon name='chevronLeft' width='16' height='16' />
                            </span>
                            <span>{info.name}</span>
                            <div />
                            <div onClick={resetHandler} className={`${style.resetButton}`}>
                                <span data-is-hidden={!countSelected} className='text--upper text--t6 text--bold text--sparse text--color-primary'>
                                    сбросить
                                </span>
                            </div>
                        </div>
                        {info.values.length > 7
                            ? <Search isMobile={true} />
                            : null
                        }
                        {info.values.map(item => <Checkbox key={item.value} item={item} text={item.value} isSelected={item.isSelected} onAfterChange={checkboxChange} />)}
                    </div>
                    : null
                }

            </motion.div>
        </div>
    )
}

function Search({ isMobile }) {
    const [isSearched, setIsSearched] = useState(false)
    const refInput = useRef(null)
    const refSearch = useRef(null)
    const refSearchChildren = useRef(null)

    const blurHandler = () => {
        refInput.current.setAttribute('data-changed', !!refInput.current.value)
    }

    const changeHandler = event => {
        let items = 0
        const value = event.target.value.toLowerCase()

        refSearchChildren.current.forEach(element => {
            const isContains = element.innerText.toLowerCase().includes(value)
            element.style.display = isContains ? '' : 'none'
            if (!isContains) items++
        })
        setIsSearched(items === refSearchChildren.current.length)
    }

    const clearHandler = () => {
        refInput.current.value = ''
        refInput.current.focus()
        const event = { target: refInput.current }
        changeHandler(event)
    }

    useEffect(() => {
        if (isMobile) {
            refSearchChildren.current = Array.from(
                refSearch.current.closest('.js-search-container').children
            ).filter((_, index) => index !== 0 && index !== 1)
        } else {
            refSearchChildren.current = Array.from(
                refSearch.current.parentElement.querySelector('.js-search-container').children
            )
        }
    }, [])

    return (
        <div ref={refSearch} className={`${isMobile ? style.searchMobile : style.search}`}>
            <label className='input-search mb-1'>
                <input ref={refInput} onBlur={blurHandler} onChange={changeHandler} type='text' className='input' placeholder='Поиск' />
                <Icon external='input-search__icon' name='search' width='18' height='18' />
                <span onClick={clearHandler} className='input-search__icon-clear'>
                    <Icon name='close' width='18' height='18' />
                </span>
            </label>
            <div data-searched={isSearched} className='input-search__empty text--t2 text--normal text--color-disabled'>Ничего не найдено</div>
        </div>
    )
}
