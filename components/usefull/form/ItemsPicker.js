import { useState, useEffect, useRef } from 'react'
import InputSearch from './InputSearch'

export default function ItemsPicker({ items, onAfterChange }) {

    return (
        <InputSearch count={items.length}>
            {
                items.map(item => {
                    return (
                        <div className='item-selector' key={item}>
                            <label className='item-selector__label' onChange={onAfterChange}>
                                <input type='checkbox' />
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