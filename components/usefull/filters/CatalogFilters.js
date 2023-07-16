import { useState, useEffect, useRef } from 'react'
import style from './Catalog-filters.module.scss'
import Icon from '../../Icon'
import { globalState } from '../../helpers/globalState'
import InputRange from './inputs/InputRange'
import InputCheckboxList from './inputs/InputCheckboxList'
import InputCats from './inputs/InputCats'

export default function CatalogFilters({ filters, setFilters, isFilterOpen, setIsFilterOpen }) {
    const [isUpdated, setIsUpdated] = useState(false)
    const closeHandler = () => {
        setIsFilterOpen(false)
        globalState.body.removeClass('overflow-hidden')
    }

    const findAllSelected = arr => {
        const result = {}
        arr.forEach((item, index) => {
            if (!item.values || !item.values.length) return
            item.values.forEach((value, i) => {
                if (value.isSelected) {
                    const isExist = typeof result[item.code] === 'string'
                    if (isExist) result[item.code] += '|' + value.value
                    else result[item.code] = value.value
                }
                if (item.code !== 'category' || !value.include) return
                value.include.forEach((subcat, a) => {
                    if (subcat.isSelected) {
                        const isExist = typeof result[item.code] === 'string'
                        if (isExist) result[item.code] += '|' + subcat.value
                        else result[item.code] = subcat.value
                    }
                })
            })
        })

        setTimeout(() => setIsUpdated(true), 100)
        setTimeout(() => {
            const query = new URLSearchParams(result).toString()
            const location = window.location.href.split('?')[0]
            const encoded = `${location}?${decodeURI(query)}`
            window.history.pushState('', '', encoded)
            setIsUpdated(false)
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
                <div onClick={closeHandler} className={style.filterModalClose}>
                    <Icon name='close' width='20' height='20' />
                </div>
                <div className={`${style.scrollContent}`}>
                    {filters.map(filter => <Filter key={filter.code} filters={filters} setFilters={setFilters} info={filter} />)}
                </div>
            </div>
        </div>
    )
}


function Filter({ info, filters, setFilters }) {
    const code = info.code

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

    function extractStringBetweenWords(str, firstWord, secondWord) {
        const regex = new RegExp(`${ firstWord }(.*?)${ secondWord }`)
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
        } else {
            newFilters = pickerCheck(type, data)
        }
        console.log(newFilters);

        setFilters(newFilters)
    }

    const isChecker = code === 'market'
        || code === 'available'
        || code === 'hits'
        || code === 'discont'

    const isPicker = code === 'brand'
        || code === 'pitanie'
        || code === 'proizvodstvo'
        || code === 'weight_filter'
        || code === 'ves'
        || code === 'type'
        || code === 'vid'

    if (code === 'category') {
        return <InputCats info={info} filters={filters} onAfterChange={inputsChangeHandler} />
    } else if (code === 'price') {
        return <InputRange info={info} filters={filters} onAfterChange={inputsChangeHandler} />
    } else if (isPicker) {
        return <InputCheckboxList info={info} filters={filters} onAfterChange={inputsChangeHandler} />
    }


}