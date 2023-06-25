import { useState, useEffect, useRef } from 'react'
import style from './style.module.scss'
import Icon from '../../../Icon'

export default function InfoNotify({ text }) {

    return (
        <div className={`${style.info}`}>
            <Icon external={style.icon} name='info' width='16' height='16' />
            <div className='text--p5'>{text}</div>
        </div>
    )
}