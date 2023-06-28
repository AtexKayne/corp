import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import Link from 'next/link'

export default function Button({ options, text, children, external = '', onClick = () => { } }) {
    if (options.href) return (
        <Link href={options.href}>
            <ButtonInner options={options} text={text} children={children} external={external} onClick={onClick} />
        </Link>
    )

    return <ButtonInner options={options} text={text} children={children} external={external} onClick={onClick} />
}

function ButtonInner({ options, text, children, external, onClick }) {
    return (
        <div onClick={onClick} fill={options.fill} theme={options.theme} size={options.size} className={`${style.button} ${external}`}>
            {!!text
                ? <span className='text--upper text--p5 text--sparse text--bold'>{text}</span>
                : children
            }
        </div>
    )
}