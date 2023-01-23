import { globalState } from '../../helpers/globalState'
import style from '../../../styles/module/usefull/templates/Modal-price-info.module.scss'
import Icon from '../../Icon'

export default function ModalPriceInfo() {

    return (
        <div className={`${style.info} full-height`}>
            <Icon name='infoImage' width='200' height='200' external='is-hidden--md is-hidden--lg' />
            <div className={`${style.title} text--bold px-2:xl`}>
                Получите доступ к оптовым ценам!
            </div>
            <div className={`${style.text} text--p4 text--normal`}>
                Мы даём специальные оптовые цены для профпокупателей. Что нужно сделать?
            </div>
            <Icon name='starM' width='15' height='15' />
            <div className={`${style.text2} text--p4 text--normal`}>
                Подтвердите ваш статус профессионала!
            </div>
            <div className={`${style.btn} btn btn--md btn--fill btn--primary mb-1.5`}>
                <span className='text--upper text--p6 text--bold'>У меня есть инвайт-код</span>
            </div>
            <div className={`${style.btn} btn btn--md btn--fill btn--shadow mb-1.5`}>
                <span className='text--upper text--p6 text--bold'>заполнить форму в телеграм-боте</span>
            </div>
            <div className={`${style.or} text--p5 text--upper mb-1`}>
                или
            </div>
            <a href='#' className='link d-block text--bold text--upper text--p6 text--color-primary'>
                я уже профи. Авторизоваться
            </a>
        </div>
    )
}