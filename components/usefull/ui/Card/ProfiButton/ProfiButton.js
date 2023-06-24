// import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../../../helpers/globalState'
import style from './style.module.scss'

export default function ProfiButton() {

    const profiClickHandler = () => {
        globalState.modal.open('profi', false)
    }

    return (
        <div onClick={profiClickHandler} className={`${style.btnMain} btn btn--md btn--primary`}>
            <span className='text--upper text--p5 text--bold'>ДЛЯ ПРОФИ</span>
        </div>
    )
}