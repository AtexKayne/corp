import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'
import Icon from '../../components/Icon'
import MainLayout from '../../layout/MainLayout'
import style from '../../styles/module/Product/Product.module.scss'

export default function Product() {
    const { isMobile } = useDeviceDetect()
    const radioItems = [
        { status: '', text: '100 мл' },
        { status: '', text: '200 мл' },
        { status: 'disabled', text: '500 мл' },
    ]
    return (
        <MainLayout>
            <Breadcrumbs />

            <div className='row p-relative'>
                <div className='col col--xs-6 col--lg-7'>
                    <ProductGallery images={[]} />

                    <div className='pt-0 pt-3:lg' />
                </div>

                <div className='col col--xs-6 col--lg-5'>
                    <div className={style.mainInfo}>
                        <div className='text--p4 text--upper mb-0.8'>Шампунь №4 для жирной кожи головы</div>
                        <h1 className='text--h4 text--regular mb-0.8'>System 4 Shale Oil Shampoo 4</h1>
                        <div className='text--p4 text--color-small mb-2'>Артикул: 5414</div>
                        <div className={`${style.price} text--h4 is-hidden--md`}>
                            <span>931 ₽</span>
                            <span>1 299 ₽</span>
                        </div>
                        <div className='text--p6 text--upper mt-0.8 mb-2 is-hidden--md'>
                            <span className='mr-0.5'>Вы получите</span>
                            <span className='text--bold'>24 Red-бонусА</span>
                        </div>

                        <RadioButton items={radioItems} />

                        <div className='mb-2' />

                        <BuyButton>
                            <div className={`${style.price} text--h4`}>
                                <span>931 ₽</span>
                                <span>1 299 ₽</span>
                            </div>
                            <div className='text--p6 text--upper mt-0.8'>
                                <span className='mr-0.5'>Вы получите</span>
                                <span className='text--bold'>24 Red-бонусА</span>
                            </div>
                        </BuyButton>

                        <div className='mb-2' />
                        <div className='text--p6 mb-1'>Поделиться:</div>
                        <div className={`${style.group} pt-0.8 pb-2.5 pb-2:md is-hidden--md`}>
                            <div className='btn btn--social btn--sm'><Icon width='24' height='24' name='VK' /></div>
                            <div className='btn btn--social btn--sm'><Icon width='24' height='24' name='telegram' /></div>
                            <div className='btn btn--social btn--sm'><Icon width='24' height='24' name='link' /></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col col--xs-6 col--lg-7'>
                    <div className={style.additionInfo}>
                        <div className={style.topInfo}>
                            <div className='text--h5'>Доставка</div>
                            <a href='#' className='link active text--p5 text--upper text--bold'>Подробнее</a>
                        </div>
                        <div className='text--p5 mt-0.5 mb-2'>в город Москва</div>

                        <InfoLine text='сегодня' title='Фирменный магазин' />
                        <InfoLine text='с 13 октября' title='Доставка в ПВЗ' />
                        <InfoLine text='с 12 октября' title='Курьер' />

                        <div className='pt-2.5 pt-5:lg' />

                        <Accordeon title='Описание'>
                            <div className='text--t1 mb-1'>Лечение жирных волос и кожи головы</div>
                            <p className='text--p4 mb-2'>
                                Специально для людей с активными сальными железами был разработан терапевтический шампунь № 4.
                                Если беспокоят такие проблемы, как быстро пачкающиеся волосы, зуд, отсутствие объема,
                                выпадение волос и перхоть, то это шампунь станет настоящим спасением.
                                Он подходит людям с раздраженной и чувствительной кожей головы, т. к.
                                моющая основа шампуня сделана из кокосового масла. Сланцевое масло, входящее в состав шампуня,
                                регулирует и стабилизирует работу сальных желез, а розмарин и ментол действуют успокаивающе на кожу головы.
                                При регулярном применении ваши волосы станут рассыпчатыми, обретут объем и здоровый блеск.
                                Частота использования 2–3 раза в неделю, рекомендованный курс 1–2 месяца.
                            </p>

                            <div className='text--t1 mb-1'>Применение</div>
                            <p className='text--p4 mb-2'>
                                Нанести на влажные волосы, слегка массируя кожу головы в течение 2–3 минут, затем смойте.
                            </p>

                            <div className='text--t1 mb-1'>Состав</div>
                            <p className='text--p4 mb-2'>
                                Вода, натрия лауретсульфат, лаурилгиксеид, кокамидопропилбетаин, натрия кокамфодиацетат,
                                кокоглюксеид, глицерилолеат, сланцевого масла натрия сульфонат, розмарин, ментол,
                                лимонная кислота, феноксиэтанол, йодопропинила бутилкарбамат, бутилциклогексан.
                            </p>
                        </Accordeon>

                        <div className='pt-2.5 pt-4:lg' />

                        <Accordeon title='Характеристики'>
                            <div className={style.params}>
                                <span className='text--p6 text--bold text--color-smaler text--upper'>Вид товара</span>
                                <span className='text--p4'>Шампунь</span>
                            </div>
                            <div className={style.params}>
                                <span className='text--p6 text--bold text--color-smaler text--upper'>Особенности</span>
                                <span className='text--p4'>Регулирует работу сальных желез</span>
                            </div>
                            <div className={style.params}>
                                <span className='text--p6 text--bold text--color-smaler text--upper'>Производство</span>
                                <span className='text--p4'>Финляндия</span>
                            </div>
                            <div className={style.params}>
                                <span className='text--p6 text--bold text--color-smaler text--upper'>Назначение</span>
                                <span className='text--p4'>Для работы, Для домашнего использования, Для роста волос, От выпадения, От жирности кожи головы</span>
                            </div>
                        </Accordeon>

                        <div className='pt-2.5 pt-4:lg' />

                        <Accordeon title='О бренде'>
                            <Image src='/images/product/brand-logo.png' width='100' height='100' alt='' />

                            <div className='text--t1 mt-2 mb-1'>System 4</div>
                            <p className='text--p4 mb-2'>
                                Вода, натрия лауретсульфат, лаурилгиксеид, кокамидопропилбетаин, натрия кокамфодиацетат,
                                кокоглюксеид, глицерилолеат, сланцевого масла натрия сульфонат, розмарин, ментол,
                                лимонная кислота, феноксиэтанол, йодопропинила бутилкарбамат, бутилциклогексан.
                            </p>
                            <a href='#' className='text--p5 text--bold text--upper btn btn--xxs btn--empty'>
                                <span className='mr-0.5'>подробнее о бренде</span>
                                <Icon name='arrowRight' width='18' height='18'/>
                            </a>
                        </Accordeon>

                        <div className='pt-2.5 pt-4:lg' />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

function ProductGallery({ images = [] }) {

    return (
        <div className={style.gallery}>
            <div className={`${style.nav} is-hidden--lg-down`}>
                <div className={style.navPrev}>
                    <Icon name='chevronUp' width='20' height='20' />
                </div>

                <div className={`${style.previews}`}>
                    <div data-active='true' className={style.imagePreview}></div>
                    <div className={style.imagePreview}></div>
                    <div className={style.imagePreview}></div>
                    <div className={style.imagePreview}></div>
                    <div className={style.imagePreview}></div>
                </div>

                <div className={style.navNext}>
                    <Icon name='chevronDown' width='20' height='20' />
                </div>
            </div>

            <div className={`${style.navTablet} is-hidden--xl-up`}>
                <span /><div /><div /><div /><div /><div />
            </div>

            <div className={style.imageMain}></div>

            <div className={style.labels}>
                <div className='label label--sucess mb-0.6'>50%</div>
                <div className='label label--info mb-0.6'>
                    <Icon name='new' width='22' height='22' />
                </div>
                <div className='label label--warning mb-0.6'>
                    <Icon name='fire' width='22' height='22' />
                </div>
                <div className='label label--danger mb-0.6'>
                    <Icon name='verified' width='22' height='22' />
                </div>
            </div>
        </div>
    )
}

function RadioButton({ items = [] }) {
    if (!items.length) return null
    const [active, setActive] = useState(0)

    return (
        <div className={style.radio}>
            {items.map((item, index) => (
                <div
                    key={item.text}
                    data-disabled={item.status}
                    onClick={() => setActive(index)}
                    data-active={active === index}>
                    {item.text}
                </div>
            ))}
        </div>
    )
}

function BuyButton({ children }) {
    return (
        <div className={style.buybtn}>
            <div className={`${style.buybtnChildren} is-hidden--lg-up is-hidden--sm-down`}>
                {children}
            </div>

            <div className='btn btn--md btn--shadow'>
                <Icon name='heartMD' width='18' height='16' />
            </div>

            <div className='btn btn--md btn--fill btn--primary'>
                <span className='text--upper text--p5 text--bold mr-0.8'>Добавить в корзину</span>
                <Icon name='basketMD' width='18' height='18' />
            </div>

        </div>
    )
}

function InfoLine({ title, text }) {
    return (
        <div className={style.infoline}>
            <div className='text--p4'>{title}</div>
            <div className={style.infolinedelim} />
            <div className='text--p5 text--bold text--upper'>{text}</div>
        </div>
    )
}

function Accordeon({ children, title, open = false }) {
    const [isOpen, setIsOpen] = useState(open)

    return (
        <div data-open={isOpen} className={style.accordeon}>
            <div onClick={() => setIsOpen(!isOpen)} className={`${style.accordeonTitle} text--p1 text--bold`}>{title}</div>

            {children}
        </div>
    )
}
