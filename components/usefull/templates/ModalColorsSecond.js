import { useState, useEffect, useRef } from 'react'
import { colorVariants } from '../../helpers/constants'
import style from '../../../styles/module/usefull/templates/Modal-colors-second.module.scss'
import Link from 'next/link'

export default function ModalColorsSecond() {
    const [title, setTitle] = useState('')
    const [variants, setVariants] = useState([])

    useEffect(() => {
        setTitle(colorVariants.name)
        setVariants(colorVariants.items)
    }, [])


    return (
        <div className='full-height'>
            <div className={`${style.title} text--t5 text--upper text--bold pb-2`}>
                <span>{title}</span>
            </div>
            <div className={style.variants}>
                {
                    variants.length
                        ? variants.map(variant => {
                            let iconStyle = ''
                            if (variant.name.toLowerCase() === 'белый') {
                                iconStyle = style.iconWhite
                            } else if (variant.name.toLowerCase() === 'разноцветный') {
                                iconStyle = style.iconColorfull
                            }
                            return (
                                <Link key={variant.name} href={`${variant.link}`}>
                                    <div data-status={variant.status} className={style.variant}>
                                        <div className={style.radio} data-selected={!!variant.current} />

                                        <span className={`${style.icon} ${iconStyle}`} style={{ backgroundColor: variant.iconColor }} />

                                        <div className={style.text}>
                                            <div className='text--t4 text--normal'>{variant.name}</div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        )
                        : null
                }
            </div>
        </div>
    )
}