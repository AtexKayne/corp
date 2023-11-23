import Icon from '../../Icon'
import style from './style.module.scss'
import { useRef, useEffect, useState } from 'react'

export default function ModalOpener({ title, text }) {
    return (
        <div className={`${style.openerContainer}`}>
            <div className={`${style.openerText}`}>
                <div className='text--t1'>{title}</div>
                <div className='text--t5 pt-0.5'>{text}</div>
            </div>
            <div className={`${style.openerIcon}`}>
                <Icon name='chevronRight' width='16' height='16' />
            </div>
        </div>
    )
}
