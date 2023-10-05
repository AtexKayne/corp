import Link from 'next/link'
import Image from 'next/image'
import style from './style.module.scss'

export default function CardBasketImages({ link = '/', image, count }) {

    return (
        <Link href={link}>
            <a className={`${style.images} ${style.inline}`}>
                <div data-is-hidden={count <= 1} className={`${style.labelCount} text--t6`}>
                    x{count}
                </div>
                
                <div className={style.image}>
                    <Image layout='fill' alt={'product card image'} src={image} />
                </div>
            </a>
        </Link>
    )
}