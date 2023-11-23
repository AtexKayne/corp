import Icon from '../../../Icon'
import style from './Inputs.module.scss'

export default function Checkbox({ item, isSelected, text, onAfterChange, isDisabled = false }) {
    const clickHandler = () => {
        onAfterChange(item)
    }
    return (
        <div onClick={clickHandler} data-disabled={isDisabled} data-selected={isSelected} className={`${style.checkbox}`}>
            <div className={`${style.boxIcon}`}>
                <div className={`${style.iconBorder}`} />
                <Icon external={style.iconAccept} name='checkAnim' width='24' height='24' />
            </div>
            {text}
        </div>
    )
}
