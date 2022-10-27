import styles from '../styles/module/kaleidoscope-image.module.scss'
import Image from 'next/image'

export default function KaleidoscopeImage({height = 452}) {
    return (
        <div className={`${styles.kaleidoscope} is-decorative`}>
            <div className={styles.kaleidoscopeItems} style={{width: `${height}px`, height: `${height}px`}}>
                <div><Image src='/assets/img/fragments/elem-h.svg' alt='' width={height} height={height}/></div>
                <div><Image src='/assets/img/fragments/elem-h.svg' alt='' width={height} height={height}/></div>
                <div><Image src='/assets/img/fragments/elem-h.svg' alt='' width={height} height={height}/></div>
                <div><Image src='/assets/img/fragments/elem-h.svg' alt='' width={height} height={height}/></div>
                <div><Image src='/assets/img/fragments/elem-h.svg' alt='' width={height} height={height}/></div>
                <div><Image src='/assets/img/fragments/elem-h.svg' alt='' width={height} height={height}/></div>
                <div><Image src='/assets/img/fragments/elem-h.svg' alt='' width={height} height={height}/></div>
                <div><Image src='/assets/img/fragments/elem-h.svg' alt='' width={height} height={height}/></div>
            </div>
        </div>
    )
}
