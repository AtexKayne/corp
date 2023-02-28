import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'
import InputSearch from './InputSearch'

export default function ColorPicker({ colors, code, reset = '' }) {
    const refItems = useRef(null)
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
            count={colors.length}
            selectedCount={selectedCount}
            setSelectedCount={setSelectedCount} >
            {
                colors.map(color => {
                    let iconColor = 'white'
                    switch (color.toLowerCase()) {
                        case 'красный': iconColor = 'red'; break;
                        case 'синий': iconColor = 'blue'; break;
                        case 'разноцветный': iconColor = 'fill'; break;
                        case 'белый': iconColor = 'white'; break;
                        case 'черный': iconColor = 'black'; break;
                        case 'серебристый': iconColor = 'silver'; break;
                        case 'желтый': iconColor = 'yellow'; break;
                        default: break;
                    }

                    return (
                        <div className='item-selector' key={color}>
                            <label className='item-selector__label' onChange={onAfterChange}>
                                <input type='checkbox' value={color} />
                                <div className='item-selector__checkbox' />
                                <div className='item-selector__color-icon' data-color={iconColor} />
                                <div className='item-selector__name'>{color}</div>
                            </label>
                        </div>
                    )
                })
            }
        </InputSearch>
    )
}