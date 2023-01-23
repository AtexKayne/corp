import { globalState } from '../../helpers/globalState'
import style from '../../../styles/module/usefull/templates/Modal-profi.module.scss'

export default function ModalProfi() {
    const clickHandler = () => {
        globalState.modal.setIsOpen(false)
    }

    return (
        <div className={`${style.profi}`}>
            <div className={`${style.title} text--a3 text--bold pt-2 pb-0.5`}>Для профессионалов</div>
            <div className='text--p4 text--normal pt-1 pb-1'>
                Этот товар мы продаём только парикмахерам, барберам, колористам и другим специалистам.
                Подайте заявку на подтверждение своего профессионального статуса через наш телеграм-бот:
                это быстро и бесплатно.
            </div>
            <a className='link text--t6 text--bold text--color-primary text--upper pt-1 pb-1.5' href='#'>открыть телеграм-бот</a>
            <div className={style.btn}>
                <div onClick={clickHandler} className={`btn btn--md btn--fill btn--primary`}>
                    <span className='text--upper text--p5 text--bold'>ясно</span>
                </div>
            </div>
        </div>
    )
}