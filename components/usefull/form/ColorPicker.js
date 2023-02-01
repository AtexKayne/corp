import { useState, useEffect, useRef } from 'react'
import InputSearch from './InputSearch'

export default function ColorPicker({ colors, onAfterChange }) {

    return (
        <InputSearch count={colors.length}>
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
                                <input type='checkbox' />
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