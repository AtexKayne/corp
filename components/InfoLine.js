import { useEffect, useState } from 'react'
import useDeviceDetect from './helpers/useDeviceDetect'
import style from '../styles/module/info-line.module.scss'

export default function InfoLine({ textBold = '', textThin = '' }) {
    const [updatedText, setUpdatedText] = useState(textThin)
    const { isMobile } = useDeviceDetect()
    
    useEffect(() => {
        if (textThin.includes(',') && isMobile) {
            const text = textThin.split(',').map(el => (
                <div key={el}>{el}</div>
            ))
            setUpdatedText(text)
        }

    }, [isMobile])

    return (
        <div className={`${style.info} mb-0.5`}>
            <span className='text--t2 text--bold'>{textBold}</span>
            <div className={style.delim} />
            <span className='text--t2'>{updatedText}</span>
        </div>
    )
}