import { globalState } from '../../helpers/globalState'
import style from '../../../styles/module/usefull/templates/Modal-profi.module.scss'

export default function ModalProfi() {
    const clickHandler = () => {
        globalState.modal.close()
    }

    const authHandler = () => {
        globalState.modal.open('auth', true, {type: 'auth'})
    }

    return (
        <div className={`${style.profi}`}>
            <div className={`${style.title} text--a3 text--bold pt-2 pb-0.5`}>Для профессионалов</div>
            <div className={`${style.text} text--p4 text--normal pt-1 pb-1`}>
                Этот товар мы продаём только парикмахерам, барберам, колористам и другим специалистам.
                Подайте заявку на подтверждение своего профессионального статуса через наш телеграм-бот:
                это быстро и бесплатно.
            </div>
            <div className={style.btns}>
                <div onClick={clickHandler} className={`${style.button} btn btn--md btn--fill btn--primary mb-0.8`}>
                    <span className='text--upper text--p5 text--bold'>открыть телеграм-бот</span>
                </div>

                <div onClick={authHandler} className={`${style.button} btn btn--md btn--fill btn--shadow mb-0.8 mb-1.5:md`}>
                    <span className='text--upper text--p6 text--bold'>я уже профи. авторизоваться</span>
                </div>

                <div className={`${style.or} text--p5 text--normal text--upper mb-0.8 mb-1:md`}>
                    или
                </div>

                <div onClick={clickHandler} className='link d-block text--bold text--upper text--p6 c-pointer text--color-primary'>
                    позже. перейти к покупкам
                </div>
            </div>
        </div>
    )
}