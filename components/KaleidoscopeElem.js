import styles from '../styles/module/kaleidoscope.module.scss'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import Image from 'next/image'
import A from './A'

export default function KaleidoscopeElem({isMain}) {
    const refLinks = useRef(null)
    const router   = useRouter()
    let index      = null

    const mouseEnterHandler = e => {
        const currentIndex = [...e.target.parentElement.children].indexOf(e.target)
        if (index !== currentIndex) {
            refLinks.current.children[index ?? 0].setAttribute('data-active', 'false')
            refLinks.current.children[currentIndex].setAttribute('data-active', 'true')
            index = currentIndex
        }
    }
    const mouseLeaveHandler = () => {
        refLinks.current.children[index ?? 0].setAttribute('data-active', 'false')
        index = null
    }
    const clickHundler = e => {
        const newIndex = [...e.target.parentElement.children].indexOf(e.target)
        const href = refLinks.current.children[newIndex].children[0].getAttribute('href')
        router.push(href)
    }
    return (
        <div onMouseLeave={mouseLeaveHandler} className={`${isMain ? styles.kaleidoscope : styles.kaleidoscopeDefault}  c-hover`}>
            <div onClick={clickHundler} className={styles.kaleidoscopeItems}>
                <div onMouseEnter={mouseEnterHandler}><Image src='/assets/img/fragments/elem-h.svg' alt='' width='545' height='545'/></div>
                <div onMouseEnter={mouseEnterHandler}><Image src='/assets/img/fragments/elem-h.svg' alt='' width='545' height='545'/></div>
                <div onMouseEnter={mouseEnterHandler}><Image src='/assets/img/fragments/elem-h.svg' alt='' width='545' height='545'/></div>
                <div onMouseEnter={mouseEnterHandler}><Image src='/assets/img/fragments/elem-h.svg' alt='' width='545' height='545'/></div>
                <div onMouseEnter={mouseEnterHandler}><Image src='/assets/img/fragments/elem-h.svg' alt='' width='545' height='545'/></div>
                <div onMouseEnter={mouseEnterHandler}><Image src='/assets/img/fragments/elem-h.svg' alt='' width='545' height='545'/></div>
                <div onMouseEnter={mouseEnterHandler}><Image src='/assets/img/fragments/elem-h.svg' alt='' width='545' height='545'/></div>
                <div onMouseEnter={mouseEnterHandler}><Image src='/assets/img/fragments/elem-h.svg' alt='' width='545' height='545'/></div>
            </div>

            <div ref={refLinks} className={styles.kaleidoscopeLinks}>
                <div><A text='01. simrussia'    href='/' externalClass='text--c4' /></div>
                <div><A text='02. бренды'       href='/' externalClass='text--c4' /></div>
                <div><A text='03. проекты'      href='/' externalClass='text--c4' /></div>
                <div><A text='04. партнерам'    href='/' externalClass='text--c4' /></div>
                <div><A text='05. поставщикам'  href='/' externalClass='text--c4' /></div>
                <div><A text='06. работа у нас' href='/' externalClass='text--c4' /></div>
                <div><A text='07. команда'      href='/' externalClass='text--c4' /></div>
                <div><A text='08. команда'      href='/' externalClass='text--c4' /></div>
            </div>
        </div>
    )
}
