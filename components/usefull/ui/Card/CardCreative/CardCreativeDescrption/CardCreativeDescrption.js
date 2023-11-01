import Link from 'next/link'
import style from './style.module.scss'

export default function CardCreativeDescrption({ info, link }) {

    return (
        <Link href={link}>
            <a href={link}>
                <div className={`${style.classTitle} ${style.text}`}>{info.primaryName}</div>
                <div className={`${style.classText} ${style.text}`}>{info.secondaryName}</div>
            </a>
        </Link>
    )
}