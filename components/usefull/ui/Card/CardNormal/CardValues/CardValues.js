import { useState, useEffect } from 'react'
import style from './style.module.scss'

export default function CardValues({ info, mode }) {
    console.log(info, mode);
    if ((!info.values && !info.color) || mode === 'inline') return null

    return (
        <div className={`${style.values}`}>
            {!info.values
                ? <Color color={info.color} mode={mode} />
                : <Volume values={info.values} mode={mode} />
            }
        </div>
    )
}

function Color({ color, mode }) {
    return (
        <div className='iconColorVariant'>
            <span data-color={color.toLowerCase()} className={`iconColor`} />

            <div className='text--t4 text--normal'>{color}</div>
        </div>
    )
}

function Volume({ values, mode }) {
    return (
        <div style={{ '--count-values': `"${values.length}"` }} className={`${style.volumePicker} text--t6 text--normal`}>
            {values && values.length && mode !== 'inline'
                ? values.map((item, index) => {
                    return (
                        <div key={item} data-disabled={true} data-active={index === 0}>
                            {item}
                        </div>
                    )
                }) : null}
        </div>
    )
}
