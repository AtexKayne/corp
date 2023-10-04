import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import style from '/styles/module/Product/Banner.module.scss'
import Card from '../usefull/ui/Card/Card'

export default function Banner({ items, title, description, images }) {

    return (
        <div className={style.banner}>
            <div className={style.bannerWrapper}>
                <div className={style.bannerImage}>
                    <Image src={images.desktop} priority alt={title} layout='fill' />
                    <Image src={images.mobile} priority alt={title} layout='fill' />
                </div>

                <div className={`${style.title} mb-0.5 mb-1:md text--bold`}>{title}</div>
                <div className={`${style.description} `}>{description}</div>
            </div>

            <div className={style.items}>
                {items && items.length
                    ? items.map(item => (
                        <div key={item.id} className={style.cardWrapper}>
                            <Card info={item} />
                        </div>
                    )) : null
                }
            </div>

            <div className={style.moreBtn}>
                <div className={`${style.btn} btn btn--primary`}>
                    <span className='text--upper text--sparse text--p5 text--bold'>Смотреть все</span>
                </div>
            </div>

        </div>
    )
}