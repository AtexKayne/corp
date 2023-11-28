import Icon from '../../Icon'
import { globalState } from '../../helpers/globalState'
import style from './style.module.scss'
import { useRef, useEffect, useState } from 'react'

export default function ModalOpener({ title, text, modalTemplate }) {
    const [textState, setTextState] = useState(text)
    const [titleState, setTitleState] = useState(title)

    const onAfrerChange = (text, title) => {
        text && setTextState(text)
        title && setTitleState(title)
    }

    const openModalHandler = () => {
        globalState.modal.open(modalTemplate, true, { onAfrerChange })
    }

    return (
        <div onClick={openModalHandler} className={`${style.openerContainer}`}>
            <div className={`${style.openerText}`}>
                <div className='text--t1'>{titleState}</div>
                <div className='text--t5 pt-0.5' dangerouslySetInnerHTML={{ __html: textState }} />
            </div>
            <div className={`${style.openerIcon}`}>
                <Icon name='chevronRight' width='16' height='16' />
            </div>
        </div>
    )
}
