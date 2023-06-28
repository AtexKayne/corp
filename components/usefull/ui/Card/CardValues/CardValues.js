import { useState, useEffect } from 'react'
import style from './style.module.scss'

export default function CardValues({ info, mode }) {

    return (
        <div className={`${style.values}`}>
            {!info.value
                ? <Color color={info.color} mode={mode} />
                : <Volume value={info.value} values={info.values} mode={mode} />
            }
        </div>
    )
}

function Color({ color, mode }) {
    const [iconStyle, setIconStyle] = useState('')
    useEffect(() => {
        let newIconStyle = ''
        if (color.name.toLowerCase() === 'белый') {
            newIconStyle = 'iconColorWhite'
        } else if (color.name.toLowerCase() === 'разноцветный') {
            newIconStyle = 'iconColorFull'
        }
        setIconStyle(newIconStyle)
    }, [])

    return (
        <div className='iconColorVariant'>
            <span className={`iconColor ${iconStyle}`} style={{ backgroundColor: color.iconColor }} />

            <div className=''>
                <div className='text--t4 text--normal'>{color.name}</div>
            </div>
        </div>
    )
}

function Volume({ value, values, mode }) {
    return (
        <div className={`${style.volumePicker} text--t6 text--normal`}>
            <div data-disabled={false} data-active={true}>{value}</div>
            {values && values.length && mode !== 'inline'
                ? values.map(item => {
                    if (item === value) return null
                    return (
                        <div key={item} data-disabled={true} data-active={false}>
                            {item}
                        </div>
                    )
                }) : null}
        </div>
    )
}
