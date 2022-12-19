import Icon from './Icon'
import Image from 'next/image'
import style from '../styles/module/Footer.module.scss'

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={`container ${style.container}`}>
                <div className={style.top}>
                    <a href='#' className='link active text--h5 mr-3'>RedHare Market</a>
                    <a href='#' className='link text--h5 text--color-small'>RedHare Обучение</a>
                    <p className='text--p3 text--color-small'>Товары для парикмахеров, барберов и стилистов по выгодным ценам.</p>
                </div>
                <div className={style.column}>
                    <a className='link text--t1 mt-1'>Каталог товаров</a>
                    <a className='link text--t1 mt-1'>Бренды</a>
                    <a className='link text--t1 mt-1'>Подборки</a>
                    <a className='link text--t1 mt-1'>Со скидкой</a>
                </div>
                <div className={style.column}>
                    <a className='link text--t1 mt-1'>Доставка и оплата</a>
                    <a className='link text--t1 mt-1'>Помощь</a>
                    <a className='link text--t1 mt-1'>Правовые документы</a>
                    <a className='link text--t1 mt-1'>Контакты</a>
                </div>
                <div className={style.column}>
                    <div className='text--t5 text--color-small'>Служба поддержки:</div>
                    <a className='link text--p1'>+7 (495) 983-35-42</a>
                    <a className='link text--p3'>info@redhare.ru</a>
                    <div className='text--t5 text--color-small pt-1'>Наш адрес:</div>
                    <div className='text--p3'>Москва, ул. Бауманская 6/2, «Виктория Плаза», 6-й этаж. Метро «Бауманская»</div>
                </div>
                <div className={style.column}>
                    <div className='text--t5 text--color-small'>Ищите нас в соц сетях</div>
                    <div className='text--t5 text--color-small'>Наше моб. приложение:</div>
                </div>
                <div className={style.bottom}>
                <div className='text--p5 text--color-small'>Также доступны другие способы оплаты.</div>
                <div className='text--t5 text--color-small mt-4'>© 2022 REDHAREMARKET.RU</div>
                </div>
            </div>
        </footer>
    )
}