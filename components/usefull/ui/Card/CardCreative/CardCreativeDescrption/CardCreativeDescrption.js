import style from './style.module.scss'

export default function CardCreativeDescrption({ info, classText, classTitle }) {

    return (
        <>
            <div className={`${style.classTitle} ${style.text} mb-0.6 mt-1.5`}>{info.primaryName}</div>
            <div className={`${style.classText} ${style.text} mb-0.5`}>{info.secondaryName}</div>
        </>

    )
}