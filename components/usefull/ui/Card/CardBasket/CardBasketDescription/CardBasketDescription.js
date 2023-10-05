import Link from 'next/link'
import style from './style.module.scss'

export default function CardBasketDescription({ info, link = '/' }) {

    return (
        <div className={style.description}>
            {info.art
                ? <div className='text--t6 text--normal text--color-small'>{info.art}</div>
                : null
            }

            <div className={`text--t6 text--normal text--upper pt-0.5`}>{info.primaryName}</div>

            <Link href={link}>
                <div className={`text--t4 text--normal c-pointer pt-0.5`}>{info.secondaryName}</div>
            </Link>

            <div className={`${style.values} pt-0.5`}>
            </div>
        </div>
    )
}

