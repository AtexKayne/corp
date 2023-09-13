import Link from 'next/link'
import style from './style.module.scss'

export default function CardCompactDescription({ info }) {

    return (
        <Link href='/product/rp-no-coloristic'>
            <div className={style.container}>
                <div className={`text--t6 text--sparse text--normal text--upper pb-0.25 pb-0.6:md`}>{info.primaryName}</div>
                <div className={`text--t4 text--normal pb-0.25 pb-0.6:md`}>{info.secondaryName}</div>
                <div className={`text--t5 text--sparse text--normal`}>{info.art}</div>
            </div>
        </Link>
    )
}