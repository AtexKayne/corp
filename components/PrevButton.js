import style from '../styles/module/prev-button.module.scss'

export default function PrevButton({ text = '' }) {

    return (
        <div className={`${style.prevButton}`}>
            {text}
        </div>
    )
}