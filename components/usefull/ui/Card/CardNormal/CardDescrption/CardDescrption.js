import style from './style.module.scss'

export default function CardDescrption({ info, classText, classTitle }) {

    return (
        <>
            <div className={`${classTitle} ${style.text} text--t6 text--normal text--upper mb-0.6 mt-1.5`}>{info.primaryName}</div>
            <div className={`${classText} ${style.text} text--t4 text--normal mb-0.5`}>{info.secondaryName}</div>
        </>

    )
}