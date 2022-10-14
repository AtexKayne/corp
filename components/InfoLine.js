import style from '../styles/module/info-line.module.scss'

export default function InfoLine({ textBold='', textThin='' }) {

    return (
        <div className={`${style.info} mb-0.5`}>
            <span className='text--t2 text--bold'>{textBold}</span>
            <div className={style.delim} />
            <span className='text--t2'>{textThin}</span>
        </div>
    )
}