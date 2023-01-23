import { useState, useEffect, useRef } from 'react'
import { product } from '../../components/helpers/constants'
import { debounce } from '../../components/helpers/debounce'
import { globalState } from '../../components/helpers/globalState'
import style from '../../styles/module/Product/Product.module.scss'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'

import Image from 'next/image'
import Icon from '../../components/Icon'
import MainLayout from '../../layout/MainLayout'
import Gallery from '../../components/product/Gallery'
import Breadcrumbs from '../../components/Breadcrumbs'
import BuyButton from '../../components/product/BuyButton'
import Accordeon from '../../components/usefull/Accordeon'

export default function Product({ detail = product }) {
    const [containerHeight, setContainerHeight] = useState(0)
    const [isProfi, setIsProfi] = useState(true)
    const [inBasket, setInBasket] = useState(0)
    const { isMobile } = useDeviceDetect()
    const refStickyContainer = useRef(null)
    const refContainerOffset = useRef(0)
    const refStickyBlock = useRef(null)
    const refBlockWidth = useRef(null)
    const refFooterHeight = useRef(0)

    const [activeValue, setActiveValue] = useState(detail.values[0])

    const colorsHandler = () => {
        globalState.modal.setIsOpen(true)
        globalState.modal.setTemplate('colors')
    }

    const copyHandler = () => {
        globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
        globalState.popover.setTextSecondary('<span class="text--p7 text--color-small">ссылка скопирована в буфер обмена</span>')
        globalState.popover.setImage('/images/product/image-0.jpg')
        globalState.popover.setIsBasket(false)
        globalState.popover.setIsOpen(true)
    }

    const infoHandler = () => {
        globalState.modal.setIsOpen(true)
        globalState.modal.setTemplate('priceInfo')
    }

    useEffect(() => {
        // console.log(detail.values)
    }, [activeValue])

    const updateBasket = () => {
        const countInBasket = { current: 0 }
        detail.values.forEach(value => {
            if (!!value.basket) {
                countInBasket.current = countInBasket.current + value.basket
            }
        })
        globalState.basket.setBasketCount(countInBasket.current)
    }

    // @TODO Rewrite this fckn shit
    useEffect(() => {
        refContainerOffset.current = refStickyContainer.current.offsetTop
        refFooterHeight.current = document.querySelector('footer').clientHeight
        setTimeout(() => {
            // const margin = +getComputedStyle(refStickyBlock.current).marginLeft.match(/\d+/)
            refStickyBlock.current.style.width = refBlockWidth.current.clientWidth + 'px'
        }, 0);
    }, [containerHeight])

    useEffect(() => {
        refContainerOffset.current = refStickyContainer.current.offsetTop
        refStickyBlock.current.style.width = refBlockWidth.current.clientWidth + 'px'
        const offsetSticky = 20

        const scrollHandler = () => {
            if (window.innerWidth < globalState.sizes.lg) return
            const scrollPos = window.scrollY
            const isScrolledDown = scrollPos > refContainerOffset.current - offsetSticky
            const isScrolledContainer = refStickyContainer.current.getBoundingClientRect().bottom > refFooterHeight.current + offsetSticky
            if (isScrolledDown && isScrolledContainer) {
                refStickyBlock.current.style.position = 'fixed'
                refStickyBlock.current.style.top = `${offsetSticky}px`
            } else if (!isScrolledDown && isScrolledContainer) {
                refStickyBlock.current.style.position = 'relative'
                refStickyBlock.current.style.top = ''
                refStickyBlock.current.style.bottom = ''
            } else if (isScrolledDown && !isScrolledContainer) {
                refStickyBlock.current.style.position = 'absolute'
                refStickyBlock.current.style.top = ''
                refStickyBlock.current.style.bottom = '0'
            }
        }

        const resizeHandler = () => {
            if (window.innerWidth < globalState.sizes.lg) {
                refStickyBlock.current.style.transform = ''
                refStickyBlock.current.style.position = ''
                refStickyBlock.current.style.width = ''
            } else {
                const margin = +getComputedStyle(refStickyBlock.current).marginLeft.match(/\d+/)
                refContainerOffset.current = refStickyContainer.current.offsetTop
                refFooterHeight.current = document.querySelector('footer').clientHeight
                refStickyBlock.current.style.width = (refBlockWidth.current.clientWidth - margin) + 'px'
            }
        }

        const debounceScroll = debounce(scrollHandler, 10)
        const debounceResize = debounce(resizeHandler, 40)

        updateBasket()

        window.addEventListener('scroll', debounceScroll)
        window.addEventListener('resize', debounceResize)

        return () => {
            window.removeEventListener('scroll', debounceScroll)
            window.removeEventListener('resize', debounceResize)
        }
    }, [])

    useEffect(() => {
        updateBasket()
    }, [inBasket])


    return (
        <MainLayout>
            <Breadcrumbs />

            <div ref={refStickyContainer} className='row p-relative'>
                <div className='col col--xs-6 col--lg-7'>
                    <Gallery images={product.images} alt={product.names.primary} />

                    <div className='pt-0 pt-3:lg' />
                </div>

                <div ref={refBlockWidth} className='col col--xs-6 col--lg-5'>
                    <div ref={refStickyBlock} className={style.mainInfo}>
                        <div className={`${style.text0} text--normal text--upper mb-0.8`}>{product.names.secondary}</div>
                        <h1
                            onClick={() => setIsProfi(!isProfi)} // @TODO For testing
                            className={`${style.text1} text--regular mb-1 mb-2:xxl`}>{product.names.primary}
                        </h1>
                        <div className={`${style.price} is-hidden--md`}>
                            <span className={`${style.text2} text--bold`}>{activeValue.price.actual} ₽</span>
                            {
                                activeValue.price.old
                                    ? <span className={`${style.text3} ${style.priceOld} text--bold`}>{activeValue.price.old} ₽</span>
                                    : null
                            }
                            {
                                !isProfi
                                    ? <span onClick={infoHandler} className={`${style.priceIcon} is-hiden--md`}>
                                        <Icon name='info' width='18' height='18' />
                                    </span>
                                    : null
                            }
                        </div>
                        <div className='text--p6 text--upper mt-0.8:xxl mb-1 mb-2:xxl is-hidden--md'>
                            <span className='mr-0.5'>Вы получите</span>
                            <span className='text--bold'>{activeValue.bonuses} Red-бонуса</span>
                        </div>

                        {
                            detail.color
                                ? <div onClick={colorsHandler} className={`${style.color} mb-1.5`}>
                                    <div className={style.colorImage}>
                                        <Image src={detail.color.image} width='50' height='50' alt='' />
                                    </div>
                                    <div className='text--t3'>
                                        <span className={`${style.colorName} text--bold`}>{detail.color.name}</span>
                                        <span className={`${style.colorText} text--normal`}>{detail.color.text}</span>
                                    </div>
                                    <div className={`${style.colorArrow} text--bold`}>
                                        <Icon name='chevronRight' width='20' height='20' />
                                    </div>
                                </div>
                                : null
                        }

                        <RadioButton items={detail.values} setActiveValue={setActiveValue} />

                        <div className='text--p4 text--color-small mt-0.5 mb-1 mb-2:xxl'>
                            Артикул: {activeValue.art}
                        </div>

                        <div className='mb-2' />

                        <BuyButton
                            activeValue={activeValue}
                            setInBasket={setInBasket}
                            isProfi={isProfi}
                            max={activeValue.max}>
                            <div className={`${style.price} text--h4`}>
                                <span className={`${style.text2} text--bold`}>{activeValue.price.actual} ₽</span>
                                {
                                    activeValue.price.old
                                        ? <span className={`${style.text2} ${style.priceOld} text--bold`}>{activeValue.price.old} ₽</span>
                                        : null
                                }
                                {
                                    !isProfi
                                        ? <span onClick={infoHandler} className={`${style.priceIcon} is-hiden--md`}>
                                            <Icon name='info' width='18' height='18' />
                                        </span>
                                        : null
                                }
                            </div>
                            <div className='text--p6 text--upper mt-0.8 mt-0:md mt-0.8:lg'>
                                <span className='mr-0.5'>Вы получите</span>
                                <span className='text--bold'>{activeValue.bonuses} Red-бонуса</span>
                            </div>
                        </BuyButton>

                        <div className='mb-2' />
                        <div className='text--p6 mb-1'>Поделиться:</div>
                        <div className={`${style.group} pb-2.5 pb-2:md`}>
                            <div className='btn btn--grey btn--sm'><Icon width='18' height='18' name='VK' /></div>
                            <div className='btn btn--grey btn--sm'><Icon width='18' height='18' name='telegram' /></div>
                            <div onClick={copyHandler} className='btn btn--grey btn--sm'><Icon width='18' height='18' name='link' /></div>
                        </div>
                    </div>
                </div>

                <div className='col col--xs-6 col--lg-6'>
                    <div className={style.additionInfo}>
                        <div className={style.topInfo}>
                            <div className={`${style.text4} text--bold pb-0.6:xl pb-0:xxl`}>Доставка</div>
                            <a href='#' className='link active text--p5 text--upper text--bold'>Подробнее</a>
                        </div>
                        <div className='text--p5 mb-1.5 mb-2:xxl'>в город Москва</div>
                        <InfoLine text='сегодня' title='Фирменный магазин' />
                        <InfoLine text='с 13 октября' title='Доставка в ПВЗ' />
                        <InfoLine text='с 12 октября' title='Курьер' />

                        <div className='pt-1.5 pt-2.5:md pt-2:xl pt3:xxl' />

                        <Accordeon updateHeight={setContainerHeight} title='Описание' open={true}>
                            <div className={`${style.text6} mb-0.8`}>Лечение жирных волос и кожи головы</div>
                            <p className={`${style.text7} text--normal mb-2`}>
                                Специально для людей с активными сальными железами был разработан терапевтический шампунь № 4.
                                Если беспокоят такие проблемы, как быстро пачкающиеся волосы, зуд, отсутствие объема,
                                выпадение волос и перхоть, то это шампунь станет настоящим спасением.
                                Он подходит людям с раздраженной и чувствительной кожей головы, т. к.
                                моющая основа шампуня сделана из кокосового масла. Сланцевое масло, входящее в состав шампуня,
                                регулирует и стабилизирует работу сальных желез, а розмарин и ментол действуют успокаивающе на кожу головы.
                                При регулярном применении ваши волосы станут рассыпчатыми, обретут объем и здоровый блеск.
                                Частота использования 2–3 раза в неделю, рекомендованный курс 1–2 месяца.
                            </p>

                            <div className={`${style.text6} mb-0.8`}>Применение</div>
                            <p className={`${style.text7} text--normal mb-2`}>
                                Нанести на влажные волосы, слегка массируя кожу головы в течение 2–3 минут, затем смойте.
                            </p>

                            <div className={`${style.text6} mb-0.8`}>Состав</div>
                            <p className={`${style.text7} text--normal mb-2`}>
                                Вода, натрия лауретсульфат, лаурилгиксеид, кокамидопропилбетаин, натрия кокамфодиацетат,
                                кокоглюксеид, глицерилолеат, сланцевого масла натрия сульфонат, розмарин, ментол,
                                лимонная кислота, феноксиэтанол, йодопропинила бутилкарбамат, бутилциклогексан.
                            </p>
                        </Accordeon>

                        <div className='pt-2.5 pt-4:lg' />

                        <Accordeon updateHeight={setContainerHeight} title='Характеристики'>
                            <div className={style.params}>
                                <span className='text--p6 text--bold text--color-smaler text--upper'>Вид товара</span>
                                <span className='text--p4 text--normal'>Шампунь</span>
                            </div>
                            <div className={style.params}>
                                <span className='text--p6 text--bold text--color-smaler text--upper'>Особенности</span>
                                <span className='text--p4 text--normal'>Регулирует работу сальных желез</span>
                            </div>
                            <div className={style.params}>
                                <span className='text--p6 text--bold text--color-smaler text--upper'>Производство</span>
                                <span className='text--p4 text--normal'>Финляндия</span>
                            </div>
                            <div className={style.params}>
                                <span className='text--p6 text--bold text--color-smaler text--upper'>Назначение</span>
                                <span className='text--p4 text--normal'>Для работы, Для домашнего использования, Для роста волос, От выпадения, От жирности кожи головы</span>
                            </div>
                        </Accordeon>

                        <div className='pt-2.5 pt-4:lg' />

                        <Accordeon updateHeight={setContainerHeight} title='О бренде'>
                            <Image src='/images/product/brand-logo.svg' width='100' height='100' alt='' />

                            <div className='text--t1 mt-1.5 mb-1'>System 4</div>
                            <p className={`${style.text7} text--normal mb-2`}>
                                Более 50 лет, профессиональные средства Система 4 разрабатываются лучшими
                                учеными и специалистами по здоровью волос и кожи головы. Каждая формула проходит
                                серьезные исследования и тестирование, прежде чем поступить в продажу.
                            </p>
                            <a href='#' className='text--p5 text--bold text--upper btn btn--xxs btn--empty'>
                                <span className='mr-0.5'>подробнее о бренде</span>
                                <Icon name='arrowRight' width='18' height='18' />
                            </a>
                        </Accordeon>

                        <div className='pt-2.5 pt-4:lg' />
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

function RadioButton({ items = [], setActiveValue }) {
    if (!items.length) return null
    const [active, setActive] = useState(0)
    const clickHandler = index => {
        setActiveValue(items[index])
        setActive(index)
    }

    return (
        <div className={`${style.radio} text--p4`}>
            {items.map((item, index) => (
                <div
                    key={item.link}
                    data-disabled={item.max === 0}
                    onClick={() => clickHandler(index)}
                    data-active={active === index}>
                    {item.value}
                </div>
            ))}
        </div>
    )
}

function InfoLine({ title, text }) {
    return (
        <div className={style.infoline}>
            <div className={`${style.text5} text--normal`}>{title}</div>
            <div className={style.infolinedelim} />
            <div className='text--p5 text--bold text--upper'>{text}</div>
        </div>
    )
}