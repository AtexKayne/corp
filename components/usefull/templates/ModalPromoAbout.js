import { globalState } from '../../helpers/globalState'
import style from '/styles/module/usefull/templates/Modal-brand-about.module.scss'

export default function ModalBrandAbout({ data }) {
    const clickHandler = () => {
        globalState.modal.close()
    }

    return (
        <div className={style.brandAbout}>
            <div className={`${style.contentPromo} modal-scroll-content`}>
                <div className={`text--p4 text--normal pt-1 pb-1`}>
                    <div className='text--a2 text--bold pb-2 pt-0.5'>{data.name}</div>
                    {data.name === 'Профессиональный барбер'
                        ? <>
                            <p className='pb-1'>
                                Мы собрали в одном месте все, что нужно для рабочего стола профессионального барбера.
                            </p>
                            <p className='pb-1'>
                                Получить дополнительную информацию вы можете по телефону нашего сall-центра — +7 (495) 981-65-84 или в онлайн-чате Telegram.
                            </p>
                        </>
                        : <>
                            <p className='pb-1'>
                                В октябре действуют скидки на все продукты Lock Stock & Barrel! Шампуни, спреи, глина и другие товары по специальным ценам уже ждут вас в мобильном приложении и на сайте!
                            </p>
                            <p className='pb-1'>
                                Шампунь Reconstruct разработан для мужчин с тонкими и редеющими волосами. Он быстро очищает волосы от загрязнений и любого въедливого стайлинга. В состав шампуня входят протеины и кератин, которые укрепляют волосы и делают их толще.
                            </p>
                            <p className='pb-1'>
                                Глина 85 карат с матовым эффектом подходит для густых и жестких волос, укрощает буйные волосы, которые не поддаются контролю. Глина придает волосам пластичность и контроль. Волосы сохраняют форму укладки, при этом подвижны.
                            </p>
                            <p className='pb-1'>
                                Акция действует в интернет-магазине и офлайн-супермаркетах.
                            </p>
                            <p className='pb-1'>
                                Список товаров и размер скидки во время акции может быть изменен. Количество товара ограничено. Скидка не суммируется со скидкой по дисконтной карте. Бонусы на товары, участвующие в акции, начисляются.
                            </p>
                        </>
                    }
                </div>
                <div className={`pt-1 pb-1 pb-2:md`}>
                    <span className='text--p4 text--normal mr-0.5'>Есть вопросы?</span>
                    <a href='#' className='link text--bold text--upper text--p6 text--color-primary'>
                        Напишите в Telegram
                    </a>
                </div>

                <div onClick={clickHandler} className={`${style.button} is-hidden--md-up btn btn--md btn--fill btn--primary`}>
                    <span className='text--upper text--p5 text--bold'>перейти к покупкам</span>
                </div>
            </div>
            <div className={`${style.footer} is-hidden--sm-down`}>
                <div onClick={clickHandler} className={`${style.button} btn btn--md btn--fill btn--primary`}>
                    <span className='text--upper text--p5 text--bold'>перейти к покупкам</span>
                </div>
            </div>
        </div>
    )
}