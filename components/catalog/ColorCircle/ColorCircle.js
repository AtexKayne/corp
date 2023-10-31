import Image from 'next/image'
import style from '../Catalog.module.scss'
import { useRef, useEffect, useState } from 'react'
import { globalState } from '../../helpers/globalState'

export default function ColorCircle({ isFullSize = false }) {
    const [isOnboard, setIsOnboard] = useState(false)

    const onboard = () => {
        document.querySelector(`.${style.head}`).style.position = 'unset'
        document.querySelector(`.${style.brandHead}`).style.position = 'unset'
        setIsOnboard(true)
    }

    const openColors = event => {
        setIsOnboard(false)
        if (event.target.closest(`.${style.onboard}`)) return
        globalState.modal.open('colorCircle', true)
    }

    useEffect(() => {
        setTimeout(onboard, 600)
    }, [])

    if (isFullSize) {
        return (
            <div className={`${style.colorCircleBtn} is-hidden--lg-down`}>
                <div onClick={openColors} className='btn btn--grey'>
                    <div data-onboard={isOnboard} className={`${style.colorCircle} mr-0.8`}>
                        <div onClick={() => setIsOnboard(false)} className={style.onboard}>
                            <div className={`${style.onboardText} text--p4 text--normal`}>Нажмите на иконку, чтобы открыть цветовой круг Освальда для бренда SensiDO</div>
                            <div className={`${style.onboardLink} text--t5 text--bold text--upper`}>Понятно</div>
                        </div>
                        <div className={style.colorIcon}>
                            <Image src='/images/brands/icon-colors.png' width='20' height='20' alt='color picker' />
                        </div>
                    </div>

                    <span className='text--t5'>Цветовой круг SensiDO</span>
                </div>
            </div>
        )
    } else {
        return (
            <div data-onboard={isOnboard} className={`${style.colorCircle} is-hidden--xl-up ml-1:xl`}>
                <div onClick={() => setIsOnboard(false)} className={style.onboard}>
                    <div className={`${style.onboardText} text--p4 text--normal`}>Нажмите на иконку, чтобы открыть цветовой круг Освальда для бренда SensiDO</div>
                    <div className={`${style.onboardLink} text--t5 text--bold text--upper`}>Понятно</div>
                </div>
                <div onClick={openColors} className={style.colorIcon}>
                    <Image src='/images/brands/icon-colors.png' width='20' height='20' alt='color picker' />
                </div>
            </div>
        )
    }
}