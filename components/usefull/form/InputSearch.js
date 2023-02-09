import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'
import Icon from '../../Icon'

export default function InputSearch({ children, count, selectedCount, setSelectedCount, code }) {
    const [isChanged, setIsChanged] = useState(!!selectedCount)

    useEffect(() => {
        setIsChanged(!!selectedCount)
    }, [selectedCount])


    const resetHandler = () => {
        setSelectedCount(0)
        const checked = refSearched.current.querySelectorAll('input:checked')
        if (checked.length) {
            checked.forEach(input => {
                input.checked = false;
            })
        }
        globalState.catalog.setSelectedFilter(prev => {
            const prevCopy = Object.assign({}, prev)
            prevCopy[code] = []
            return prevCopy
        })
    }

    const refSearched = useRef(null)
    const [isSearched, setIsSearched] = useState(false)

    const changeHandler = event => {
        const value = event.target.value.toLowerCase()
        const childrens = Array.from(refSearched.current.children)
        let items = 0
        childrens.forEach(element => {
            const allChildren = element.querySelectorAll('div, span')
            let isContains = false
            allChildren.forEach(children => {
                isContains = children.innerHTML.toLowerCase().includes(value)
            })
            element.style.display = isContains ? '' : 'none'
            if (!isContains) items++
        })
        setIsSearched(items === childrens.length)
    }

    return (
        <>
            <div>
                {
                    count >= 7
                        ? <label className='input-search mb-1'>
                            <input onChange={changeHandler} type='text' className='input' placeholder='Поиск' />
                            <Icon external='input-search__icon' name='search' width='18' height='18' />
                        </label>
                        : null
                }
                <div ref={refSearched} className='searched-childrens'>
                    {children}
                </div>
                <div data-searched={isSearched} className='input-search__empty text--t2 text--normal text--color-disabled'>Ничего не найдено</div>
            </div>

            <div data-changed={isChanged} className='reset'>
                <span onClick={resetHandler} className='text--t6 text--upper text--color-primary'>сбросить</span>
            </div>
        </>
    )
}