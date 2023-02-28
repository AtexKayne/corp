import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'
import InputSearch from './InputSearch'

export default function ItemsPicker({ items, code, reset = '' }) {
    const [selectedCount, setSelectedCount] = useState(0)
    const onAfterChange = event => {
        const target = event.target
        const value = target.value
        
        globalState.catalog.setSelectedFilter(prev => {
            const prevCopy = Object.assign({}, prev)
            if (!prevCopy[code]) prevCopy[code] = []
            
            if (target.checked) {
                prevCopy[code].push(value)
            } else {
                const index = prevCopy[code].indexOf(value)
                if (index > -1) prevCopy[code].splice(index, 1)
            }
            
            setSelectedCount(prevCopy[code].length)
            return prevCopy
        })
    }

    return (
        <InputSearch
            code={code}
            reset={reset}
            count={items.length}
            selectedCount={selectedCount}
            setSelectedCount={setSelectedCount} >
            {
                items.map(item => {
                    return (
                        <div className='item-selector' key={item}>
                            <label className='item-selector__label' onChange={onAfterChange}>
                                <input type='checkbox' value={item} />
                                <div className='item-selector__checkbox' />
                                <div className='item-selector__name'>{item}</div>
                            </label>
                        </div>
                    )
                })
            }
        </InputSearch>
    )
}