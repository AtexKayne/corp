import Icon from './Icon'
import Image from 'next/image'
import style from '../styles/module/Footer.module.scss'

export default function Footer() {
    return (
        <footer className={style.footer}>
            <div className={`container ${style.container}`}>
                <div className={style.top}>
                    <a href='#' className={`${style.texth5} link active mr-3`}>RedHare Market</a>
                    <a href='#' className={`${style.texth5} link text--color-small`}>RedHare Обучение</a>
                    <p className={`${style.textp3} text--color-small mt-1 mt-1:xl mt-0.6:xxl`}>Товары для парикмахеров, барберов и стилистов по выгодным ценам.</p>
                </div>
                <div className={style.columnNav}>
                    <a className={`${style.textt2} link mt-1.5 mt-1:md mt-1:xxl mt-1.5:xxxl`}>Каталог товаров</a>
                    <a className={`${style.textt2} link mt-1.5 mt-1:md mt-1:xxl mt-1.5:xxxl`}>Бренды</a>
                    <a className={`${style.textt2} link mt-1.5 mt-1:md mt-1:xxl mt-1.5:xxxl is-hidden--sm-down`}>Подборки</a>
                    <a className={`${style.textt2} link mt-1.5 mt-1:md mt-1:xxl mt-1.5:xxxl is-hidden--sm-down`}>Со скидкой</a>
                </div>
                <div className={style.columnNav}>
                    <a className={`${style.textt2} link mt-1.5 mt-1:md mt-1:xxl mt-1.5:xxxl pt-1.5 pt-0:md`}>Доставка и оплата</a>
                    <a className={`${style.textt2} link mt-1.5 mt-1:md mt-1:xxl mt-1.5:xxxl`}>Помощь</a>
                    <a className={`${style.textt2} link mt-1.5 mt-1:md mt-1:xxl mt-1.5:xxxl`}>Правовые документы</a>
                    <a className={`${style.textt2} link mt-1.5 mt-1:md mt-1:xxl mt-1.5:xxxl`}>Контакты</a>
                </div>
                <div className={style.columnInfo1}>
                    <div className={`${style.textt6} text--color-small text--upper text--sparse pt-2.5 pt-0:lg`}>Служба поддержки:</div>
                    <a className={`${style.textp2} link mt-0.6 mt-0.5:xxl`}>+7 (495) 983-35-42</a>
                    <a className='link mt-0 mt-0:xxl mt-0:xxxl text--p4'>info@redhare.ru</a>
                    <div className={`${style.textt6} text--color-small pt-1.5 pt-2:xxl pt-1.5:xxxl text--upper text--sparse`}>Наш адрес:</div>
                    <div className='text--p5 pt-0.5'>Москва, ул. Бауманская 6/2, «Виктория Плаза», 6-й этаж. Метро «Бауманская»</div>
                </div>
                <div className={style.columnInfo2}>
                    <div className={`${style.textt6} text--color-small text--upper text--sparse pt-2.5 pt-0:lg`}>Ищите нас в соц сетях</div>
                    <div className={`${style.group} pt-0.5 pb-2`}>
                        <div className='btn btn--social btn--sm'><Icon width='24' height='24' name='VK' /></div>
                        <div className='btn btn--social btn--sm'><Icon width='24' height='24' name='telegram' /></div>
                    </div>
                    <div className={`${style.textt6} text--color-small text--upper text--sparse`}>Наше моб. приложение:</div>
                    <div className={`${style.apps} pt-0.5`}>
                        <div className><Image src='/icons/icon-app-store.svg' width='125' height='40' alt='' /></div>
                        <div><Image src='/icons/icon-google-play.svg' width='125' height='40' alt='' /></div>
                    </div>
                </div>
                <div className={style.bottom}>
                    <div><Image src='/images/layout/pays.png' width='227' height='20' alt='' /></div>
                    <div className={`${style.textt5} text--color-small text--thin`}>Также доступны другие способы оплаты.</div>
                    <div className={`${style.copy} text--t6 text--sparse text--color-small`}>
                        <div className='container'>
                            © 2022 REDHAREMARKET.RU
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}