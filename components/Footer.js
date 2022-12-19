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
                    <a className='link text--t2 mt-1'>Каталог товаров</a>
                    <a className='link text--t2 mt-1'>Бренды</a>
                    <a className='link text--t2 mt-1'>Подборки</a>
                    <a className='link text--t2 mt-1'>Со скидкой</a>
                </div>
                <div className={style.column}>
                    <a className='link text--t2 mt-1'>Доставка и оплата</a>
                    <a className='link text--t2 mt-1'>Помощь</a>
                    <a className='link text--t2 mt-1'>Правовые документы</a>
                    <a className='link text--t2 mt-1'>Контакты</a>
                </div>
                <div className={style.column}>
                    <div className='text--t6 text--color-small text--upper'>Служба поддержки:</div>
                    <a className='link text--p2 mt-0.5'>+7 (495) 983-35-42</a>
                    <a className='link text--p4'>info@redhare.ru</a>
                    <div className='text--t6 text--color-small pt-2 text--upper'>Наш адрес:</div>
                    <div className='text--p5 pt-0.5 pr-2'>Москва, ул. Бауманская 6/2, «Виктория Плаза», 6-й этаж. Метро «Бауманская»</div>
                </div>
                <div className={style.column}>
                    <div className='text--t6 text--color-small text--upper'>Ищите нас в соц сетях</div>
                    <div className={`${style.group} pt-0.5 pb-2`}>
                        <div className='btn btn--social btn--sm'><Icon width='24' height='24' name='VK' /></div>
                        <div className='btn btn--social btn--sm'><Icon width='24' height='24' name='telegram' /></div>
                    </div>
                    <div className='text--t6 text--color-small text--upper'>Наше моб. приложение:</div>
                    <div className='pt-0.5'><Image src='/icons/icon-app-store.svg' width='125' height='40' alt='' /></div>
                    <div className=''><Image src='/icons/icon-google-play.svg' width='125' height='40' alt='' /></div>
                </div>
                <div className={style.bottom}>
                    <div><Image src='/images/layout/pays.png' width='227' height='20' alt='' /></div>
                    <div className='text--t6 text--color-small text--normal'>Также доступны другие способы оплаты.</div>
                    <div className={`${style.copy} text--t6 text--color-small`}>
                        <div className='container'>
                            © 2022 REDHAREMARKET.RU
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}