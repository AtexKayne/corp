import style from './style.module.scss'

export default function CardDescrption({ info }) {

    return (
        <>
            <div className={`${style.classTitle} ${style.text} text--t6 text--normal text--upper`}>{info.primaryName}</div>
            <div className={`${style.classText} ${style.text} text--t4 text--normal`}>{info.secondaryName}</div>
        </>

    )
}