// import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../../../helpers/globalState'
import style from './style.module.scss'

export default function ProfiButton() {

    const profiClickHandler = () => {
        globalState.modal.open('profi', false)
    }

    return (
        <div
            fill='true'
            theme='primary'
            d-size='md-adaptive'
            onClick={profiClickHandler} className={`button`}>
            <span className='text--upper text--p5 text--bold'>ДЛЯ ПРОФИ</span>
        </div>
    )
}