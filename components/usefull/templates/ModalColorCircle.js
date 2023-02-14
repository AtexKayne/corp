import { useState, useEffect, useRef } from 'react'
import { colors } from '../../helpers/constants'
import style from '../../../styles/module/usefull/templates/Modal-color-circle.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function ModalColorCircle() {

    const [activeColor, setActiveColor] = useState('tone')

    const sss = () => {
        setTimeout(() => {
            const val1 = temp1.value
            const val2 = temp2.value
            const val3 = temp3.value

            navigator.clipboard.writeText(`${val1},${val2}%,${val3}%`)
        }, 500);
    }

    return (
        <div className='full-height'>
            <div className={`${style.title} text--upper text--a4 text--bold pb-5`}>
                <span>Хроматический круг для красок sensido</span>
            </div>
            <div data-variant={activeColor} className={style.variants}>
                <div onClick={() => setActiveColor('tone')} className={style.tones}>
                    <Image style={{ transform: 'scale(1, -1) rotate(-130deg)' }} src='/images/usefull/templates/tones-colors.png' layout='fill' alt='colors tone' />

                    <div className={style.inner}>
                        {colors.tone.map(color => {
                            const hsl = color.hsl.split(',')
                            console.log(hsl[1]);
                            return (
                                <div style={{ transform: `rotate(${hsl[0]}deg)` }} key={hsl}>
                                    <span style={{ transform: `rotate(-${hsl[0]}deg)`, right: `${100 - hsl[1].replace('%', '')}%` }}>{color.title}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div onClick={() => setActiveColor('natural')} className={style.natural}>
                    <Image src='/images/usefull/templates/natural-colors.png' layout='fill' alt='colors natural' />
                </div>
            </div>

            <div className={style.btns}>
                <div onClick={() => setActiveColor('tone')} className={style.btn} data-active={activeColor === 'tone'}>
                    <span className='text--t1 text--normal text--upper'>Оттенки цвета</span>
                </div>
                <div onClick={() => setActiveColor('natural')} className={style.btn} data-active={activeColor === 'natural'}>
                    <span className='text--t1 text--normal text--upper'>натуральные</span>
                </div>
            </div>
        </div>
    )
}