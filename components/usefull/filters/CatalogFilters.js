import { useState, useEffect, useRef } from 'react'
import style from './Catalog-filters.module.scss'
import Icon from '../../Icon'
import { globalState } from '../../helpers/globalState'
import InputRange from './inputs/InputRange'
import InputCheckboxList from './inputs/InputCheckboxList'
import InputCats from './inputs/InputCats'
import { word } from '../../helpers/wordTranslator'
import InputChecker from './inputs/InputChecker'

export default function CatalogFilters({ filters, setFilters, isFilterOpen, setIsFilterOpen }) {
    const [isExistFilters, setIsExistFilters] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)
    const [count, setCount] = useState(568)

    const closeHandler = () => {
        setIsFilterOpen(false)
        globalState.body.removeClass('overflow-hidden')
    }

    const resetAllHandler = () => {
        const encoded = JSON.stringify([...filters])
        const replaced = encoded.replaceAll('"isSelected":true', '"isSelected":false')
        const decoded = JSON.parse(replaced)
        setFilters(decoded)
    }

    const findAllSelected = arr => {
        const result = {}
        let newIsExistFilters = false
        arr.forEach((item, index) => {
            if (!item.values || !item.values.length) return
            item.values.forEach((value, i) => {
                if (value.isSelected) {
                    const isExist = typeof result[item.code] === 'string'
                    if (isExist) result[item.code] += '|' + value.value
                    else result[item.code] = value.value
                    newIsExistFilters = true
                }
                if (item.code !== 'category' || !value.include) return
                value.include.forEach((subcat, a) => {
                    if (subcat.isSelected) {
                        const isExist = typeof result[item.code] === 'string'
                        if (isExist) result[item.code] += '|' + subcat.value
                        else result[item.code] = subcat.value
                        newIsExistFilters = true
                    }
                })
            })
        })

        setIsUpdated(true)
        setTimeout(() => {
            const query = new URLSearchParams(result).toString()
            const location = window.location.href.split('?')[0]
            const encoded = `${location}${query ? '?' : ''}${decodeURI(query)}`
            window.history.pushState('', '', encoded)
            setCount(Math.floor(Math.random() * 2000))
            setIsUpdated(false)
            setIsExistFilters(newIsExistFilters)
        }, 1000)
    }

    useEffect(() => {
        findAllSelected(filters)
    }, [filters])

    return (
        <div data-open={isFilterOpen} className={style.filterModalWrapper}>
            <div onClick={closeHandler} className={style.filterModalLayout} />
            <div className={style.filterModalContent}>
                <div data-updated={isUpdated} className={`${style.filterModalBackground}`} />
                <div className={`pb-1 text--t1 text--bold text--upper text--center`}>
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
                    {filters.map(filter => <Filter key={filter.code} filters={filters} setFilters={setFilters} info={filter} />)}
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


function Filter({ info, filters, setFilters }) {
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

    function extractStringBetweenWords(str, firstWord, secondWord) {
        const regex = new RegExp(`${firstWord}(.*?)${secondWord}`)
        const match = str.match(regex)
        return match ? match[1] : ''
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
            return
        } else if (type === 'category') {
            newFilters = categoryCheck(data)
        } else if (isPicker) {
            newFilters = pickerCheck(type, data)
        } else if (isChecker) {
            newFilters = checkerCheck(type)
        }

        if (newFilters) setFilters(newFilters)
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