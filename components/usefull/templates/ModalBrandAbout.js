import Image from 'next/image'
import { globalState } from '../../helpers/globalState'
import style from '/styles/module/usefull/templates/Modal-brand-about.module.scss'

export default function ModalBrandAbout() {
    const clickHandler = () => {
        globalState.modal.close()
    }

    return (
        <div className={style.brandAbout}>
            <div className='d-flex flex--center'>
                <Image src='/images/brands/logos/image-1.png' width='100' height='100' />
            </div>
            <div className={`${style.content} modal-scroll-content`}>
                <div className={`text--p4 text--normal pt-1 pb-1`}>
                    <p className='pb-1'>
                        Финская продукция DS - это профессиональный уход и стайлинг для волос. Разработаны для продвинутых салонов, где заботятся о здоровье парикмахеров и клиентов. Без отдушек. VEGAN - не тестируется на животных.
                    </p>
                    <p className='pb-1'>
                        Все средства для укладки и по уходу за волосами, используемые в повседневной работе мастерами, полностью не содержат отдушек, аллергенов и состоят из безопасных ингредиентов, что помогает сохранять свежий воздух в салоне для персонала и посетителей.
                    </p>
                    <p className='pb-1'>
                        Средства из линейки стайлингов DS соответствуют всем требованиям профессионалов: они позволяют создать любой необходимый эффект – матовую текстуру, четкость или объем, небрежность или локоны, обеспечивают любую степень фиксации, позволяют надолго зафиксировать результат, а также защищают волосы от воздействия высоких температур.
                    </p>
                    <p className='pb-1'>
                        Все продукты DS отмечены печатью CAS, прошли дерматологический контроль и подходят для чувствительной кожи. Не содержат продуктов животного происхождения.
                    </p>
                    <p className='pb-1'>
                        Концепция CAS – уникальное сочетание высоких финских стандартов качества и скандинавской концепции чистоты.
                    </p>
                    <p className='pb-1'>
                        Clean Air Salon Sim Sensitive – решение для всех, кто хочет дышать чистым свежим воздухом, включая детей, чувствительных к отдушкам или аллергиков.
                    </p>
                    <p className='pb-1'>
                        CAS – это новая идеология салона, в которой качество продукции и забота о здоровье – неразделимые понятия.
                    </p>
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