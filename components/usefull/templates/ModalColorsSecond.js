import { useState, useEffect, useRef } from 'react'
import { colorVariants } from '../../helpers/constants'
import { globalState } from '../../helpers/globalState'
import style from './style-modules/Modal-colors-second.module.scss'
import Link from 'next/link'

export default function ModalColorsSecond() {
    const [title, setTitle] = useState('')
    const [variants, setVariants] = useState([])
    const [currentId, setCurrentId] = useState(0)
    const [currentLink, setCurrentLink] = useState('/product/test-3')

    const choseHandler = (index, link) => {
        setCurrentId(index)
        setCurrentLink(link)

        // globalState.modal.close()
    }

    useEffect(() => {
        setTitle(colorVariants.name)
        setVariants(colorVariants.items)
        setCurrentLink(colorVariants.items.filter(el => el.current)[0].link)
        // setCurrentLink('/product/test-3')
    }, [])


    return (
        <div className={`${style.colors} full-height`}>
            <div className={`${style.title} text--t5 text--upper text--bold pb-2`}>
                <span>{title}</span>
            </div>
            <div className={style.variants}>
                {
                    variants.length
                        ? variants.map((variant, index) => {
                            let iconStyle = ''
                            if (variant.name.toLowerCase() === 'белый') {
                                iconStyle = style.iconWhite
                            } else if (variant.name.toLowerCase() === 'разноцветный') {
                                iconStyle = style.iconColorfull
                            }
                            return (
                                <div
                                    onClick={() => choseHandler(index, variant.link)}
                                    data-link={variant.link}
                                    key={variant.name}
                                    data-status={variant.status}
                                    className={style.variant}>

                                    <div className={style.radio} data-selected={currentId === index} />

                                    <span className={`${style.icon} ${iconStyle}`} style={{ backgroundColor: variant.iconColor }} />

                                    <div className={style.text}>
                                        <div className='text--t4 text--normal'>{variant.name}</div>
                                    </div>
                                </div>
                            )
                        }) : null
                }
            </div>

            <div className={style.footer}>
                <Link href={currentLink}>
                    <div onClick={() => globalState.modal.close()} className={`${style.showBtn} btn btn--primary btn--fill`}>
                        <span className='text--upper text--p6 text--bold'>Показать товар</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}