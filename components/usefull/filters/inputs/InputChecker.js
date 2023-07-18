import { useState, useEffect, useRef } from 'react'
import style from './Inputs.module.scss'
import Icon from '../../../Icon'

export default function InputChecker({ info, onAfterChange }) {
    const clickHandler = () => {
        onAfterChange(info.code)
    }

    return (
        <div onClick={clickHandler} data-disabled={!!info.isDisabled} data-active={info.isSelected} className={`${style.checker}`}>
            <div className={`${style.checkerIcon}`}>
                <div className={`${style.checkerIconCircle}`} />
            </div>

            <div className={`${style.checkerText} text--t4`}>
                {info.name}
                {info.code === 'delivery'
                    ? <Icon external={style.checkerTextIcon} name='delivery' width='16' height='16' />
                    : null
                }
            </div>
        </div>
    )
}