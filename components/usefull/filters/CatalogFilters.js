import { useState, useEffect, useRef } from 'react'
import style from './Catalog-filters.module.scss'
import Icon from '../../Icon'
import { globalState } from '../../helpers/globalState'
import InputRange from './inputs/InputRange'
import InputCheckboxList from './inputs/InputCheckboxList'
import InputCats from './inputs/InputCats'
import { word } from '../../helpers/wordTranslator'
import InputChecker from './inputs/InputChecker'
import FastFilter from './inputs/FastFilter'
import { extractStringBetweenWords } from '../../helpers/extractString'

export default function CatalogFilters({ filters, selectFilters, isFilterOpen, setIsFilterOpen, fastFilters, selectFastFilter, resetAllHandler }) {
    const [isExistFilters, setIsExistFilters] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    const [count, setCount] = useState(568)

    const closeHandler = () => {
        setIsFilterOpen(false)
        globalState.body.removeClass('overflow-hidden')
    }
    
    const updateParams = arr => {
        const newIsExistFilters = JSON.stringify([...arr]).includes('"isSelected":true')
        setIsUpdated(true)
        setTimeout(() => {
            setCount(Math.floor(Math.random() * 2000))
            setIsUpdated(false)
            setIsExistFilters(newIsExistFilters)
        }, 1000)
    }

    useEffect(() => {
        updateParams(filters)
    }, [filters])

    return (
        <div data-open={isFilterOpen} className={style.filterModalWrapper}>
            <div onClick={closeHandler} className={style.filterModalLayout} />
            <div className={style.filterModalContent}>
                <div data-updated={isUpdated} className={`${style.filterModalBackground}`} />
                <div className={`pb-1 text--t1 text--bold text--upper text--center is-hidden--md-down`}>
                    фильтры
                </div>
                <div className={`pb-1 text--t5 text--bold text--upper text--center is-hidden--lg-up`}>
                    фильтры
                </div>
                <div onClick={resetAllHandler} data-is-hidden={!isExistFilters} className={`${style.resetButton}`}>
                    <span className='text--upper text--t6 text--bold text--sparse text--color-primary'>
                        сбросить
                    </span>
                </div>
                <div onClick={closeHandler} className={style.filterModalClose}>
                    <Icon name='close' width='20' height='20' />
                </div>
                <div className={`${style.scrollContent}`}>
                    <FastFilter items={fastFilters} onAfterChange={selectFastFilter} />
                    {filters.map(filter => <Filter key={filter.code} filters={filters} onAfterChange={selectFilters} info={filter} />)}
                </div>
                <div className={`${style.buttonContainer}`}>
                    <div onClick={closeHandler} fill='true' d-size='md' theme='primary' className='button'>
                        <span className='text--upper text--p5 text--bold text--sparse'>
                            Показать {word(count, ['товар', 'товара', 'товаров'])}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


function Filter({ info, filters, onAfterChange }) {
    const filterType = info.filterType

    const categoryCheck = data => {
        const newFilters = [...filters]
        const indexC = newFilters.findIndex(item => item.code === 'category')
        const itemInfo = {}
        newFilters[indexC].values.forEach((item, index) => {
            if (itemInfo.item && itemInfo.index) return
            if (item.value === data.value) {
                itemInfo.item = item
                itemInfo.index = index
            }
            if (item.include && item.include.length) {
                item.include.forEach((el, i) => {
                    if (el.value === data.value) {
                        itemInfo.item = el
                        itemInfo.index = i
                        itemInfo.indexI = index
                    }
                })
            }
        });

        if (!itemInfo.item) return
        if (typeof itemInfo.indexI !== 'undefined') {
            newFilters[indexC].values[itemInfo.indexI].include[itemInfo.index].isSelected = !newFilters[indexC].values[itemInfo.indexI].include[itemInfo.index].isSelected
        } else {
            newFilters[indexC].values[itemInfo.index].isSelected = !newFilters[indexC].values[itemInfo.index].isSelected
        }

        return newFilters
    }

    const pickerCheck = (type, data) => {
        const newFilters = [...filters]
        const indexF = filters.findIndex(item => item.code === type)
        const indexD = info.values.findIndex(item => data.value === item.value)
        newFilters[indexF].values[indexD].isSelected = !newFilters[indexF].values[indexD].isSelected
        return newFilters
    }

    const checkerCheck = type => {
        const newFilters = [...filters]
        const indexF = filters.findIndex(item => item.code === type)
        newFilters[indexF].isSelected = !newFilters[indexF].isSelected
        return newFilters
    }

    const priceCheck = data => {
        const newFilters = [...filters]
        // [450, 10000]
        return newFilters
    }

    const resetHandler = type => {
        const jsonFilter = JSON.stringify([...filters])
        const extracted = extractStringBetweenWords(jsonFilter, `code":"${type}"`, `,{"id"`);
        const extractedReplace = extracted.replaceAll('"isSelected":true', '"isSelected":false')
        const replacedFilter = jsonFilter.replace(extracted, extractedReplace)
        return JSON.parse(replacedFilter)
    }

    const inputsChangeHandler = (type, data) => {
        let newFilters
        if (data === 'reset') {
            newFilters = resetHandler(type)
        } else if (type === 'price') {
            newFilters = priceCheck(data)
        } else if (type === 'category') {
            newFilters = categoryCheck(data)
        } else if (isPicker) {
            newFilters = pickerCheck(type, data)
        } else if (isChecker) {
            newFilters = checkerCheck(type)
        }

        onAfterChange(newFilters)
    }

    const isChecker = filterType === 'checkboxItem'
    const isPicker = filterType === 'checkboxList'

    if (filterType === 'categoryList') {
        return <InputCats info={info} filters={filters} onAfterChange={inputsChangeHandler} />
    } else if (filterType === 'priceRange') {
        return <InputRange info={info} filters={filters} onAfterChange={inputsChangeHandler} />
    } else if (isPicker) {
        return <InputCheckboxList info={info} filters={filters} onAfterChange={inputsChangeHandler} />
    } else if (isChecker) {
        return <InputChecker info={info} onAfterChange={inputsChangeHandler} />
    }
}
