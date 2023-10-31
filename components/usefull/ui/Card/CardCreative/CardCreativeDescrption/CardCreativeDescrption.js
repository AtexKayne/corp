import style from './style.module.scss'

export default function CardCreativeDescrption({ info }) {

    return (
        <>
            <div className={`${style.classTitle} ${style.text}`}>{info.primaryName}</div>
            <div className={`${style.classText} ${style.text}`}>{info.secondaryName}</div>
        </>
    )
}