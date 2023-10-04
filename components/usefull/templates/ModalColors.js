import { useState, useEffect, useRef } from 'react'
import { productVariants } from '../../helpers/constants'
import style from '/styles/module/usefull/templates/Modal-colors.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function ModalColors() {
    const [title, setTitle] = useState('')
    const [variants, setVariants] = useState([])

    useEffect(() => {
        setTitle(productVariants.name)
        setVariants(productVariants.items)
    }, [])


    return (
        <div className='full-height'>
            <div className={`${style.title} text--a4 text--bold pb-2`}>
                <span>{title}</span>
            </div>
            <div className={style.variants}>
                {
                    variants.length
                        ? variants.map(variant => (
                            <Link key={variant.link} href={`/${variant.link}`}>
                                <div data-status={variant.status} className={style.variant}>
                                    <div className={style.image}>
                                        <Image src={variant.image} width='90' height='90' alt='' />
                                    </div>
                                    <div className={style.text}>
                                        <div className='text--bold text--t1 pb-0.5'>{variant.name}</div>
                                        <div className={`${variant.status !== 'current' ? 'text--normal' : ''} text--t5`}>{variant.text}</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                        : null
                }
            </div>
        </div>
    )
}