import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'
import Icon from '../../Icon'

export default function InputSearch({ children, count, selectedCount, setSelectedCount, code, reset = '' }) {
    const [isChanged, setIsChanged] = useState(!!selectedCount)
    const refInput = useRef(null)

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

    const clearHandler = () => {
        refInput.current.value = ''
        refInput.current.focus()
        const event = { target: refInput.current }
        changeHandler(event)
    }

    return (
        <>
            <div>
                {count >= 7
                    ? <label className='input-search mb-1'>
                        <input ref={refInput} onChange={changeHandler} type='text' className='input' placeholder='Поиск' />
                        <Icon external='input-search__icon' name='search' width='18' height='18' />
                        <span onClick={clearHandler} className='input-search__icon-clear'>
                            <Icon name='close' width='18' height='18' />
                        </span>
                    </label> : null
                }
                <div ref={refSearched} className='searched-childrens'>
                    {children}
                </div>
                <div data-searched={isSearched} className='input-search__empty text--t2 text--normal text--color-disabled'>Ничего не найдено</div>
            </div>

            <div data-changed={isChanged} onClick={resetHandler} className='reset'>
                {reset
                    ? <span className='text--t6 text--upper text--color-primary'>{reset}</span>
                    : <Icon name='close' width='10' height='10' />
                }
            </div>
        </>
    )
}