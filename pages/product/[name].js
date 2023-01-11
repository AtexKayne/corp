import Image from 'next/image'
import Icon from '../../components/Icon'
import MainLayout from '../../layout/MainLayout'
import { useState, useEffect, useRef } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs'
import { product } from '../../components/helpers/constants'
import { motion, useAnimationControls } from 'framer-motion'
import style from '../../styles/module/Product/Product.module.scss'
import { globalState } from '../../components/helpers/globaslState'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'

export default function Product({ detail }) {
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
                    <ProductGallery images={product.images} alt={product.names.primary} />

                    <div className='pt-0 pt-3:lg' />
                </div>

                <div className='col col--xs-6 col--lg-5'>
                    <div className={style.mainInfo}>
                        <div className='text--p4 text--upper mb-0.8'>{product.names.secondary}</div>
                        <h1 className='text--h4 text--regular mb-0.8'>{product.names.primary}</h1>
                        <div className='text--p4 text--color-small mb-2'>Артикул: {product.art}</div>
                        <div className={`${style.price} is-hidden--md`}>
                            <span className='text--h4'>{product.price.actual} ₽</span>
                            <span className='text--h5'>{product.price.old} ₽</span>
                        </div>
                        <div className='text--p6 text--upper mt-0.8 mb-2 is-hidden--md'>
                            <span className='mr-0.5'>Вы получите</span>
                            <span className='text--bold'>{product.bonuses} Red-бонуса</span>
                        </div>

                        <RadioButton items={radioItems} />

                        <div className='mb-2' />

                        <BuyButton>
                            <div className={`${style.price} text--h4`}>
                                <span className='text--h4'>{product.price.actual} ₽</span>
                                <span className='text--h5'>{product.price.old} ₽</span>
                            </div>
                            <div className='text--p6 text--upper mt-0.8'>
                                <span className='mr-0.5'>Вы получите</span>
                                <span className='text--bold'>{product.bonuses} Red-бонуса</span>
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

                        <Accordeon title='Описание' open={true}>
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

function ProductGallery({ images = [], alt = '' }) {
    const [activeImage, setActiveImage] = useState(images[0].gallery)
    const [navDisabled, setNavDisabled] = useState('up')
    const [modalOpen, setModalOpen] = useState(false)
    const animatePreview = useAnimationControls()
    const refPreviewPosition = useRef(0)
    const refModal = useRef(null)

    const choseActive = (image, index = 0) => {
        setActiveImage(image)
        const imageList = refModal.current.querySelectorAll(`.${style.imageModal}`)
        const offsetTop = imageList[index].offsetTop
        refModal.current.scrollTo(0, offsetTop)
    }

    const slidePreview = slide => {
        const previewHeight = 100
        const slideTo = slide === 'down' ? -1 : 1
        refPreviewPosition.current = refPreviewPosition.current + slideTo * previewHeight
        const checkPosition = Math.abs(refPreviewPosition.current / previewHeight)

        if (checkPosition >= images.length - 3 && slide === 'down') setNavDisabled('down')
        else if (checkPosition === 0 && slide === 'up') setNavDisabled('up')
        else setNavDisabled(false)

        animatePreview.start({ y: refPreviewPosition.current, transition: { duration: 0.5 } })
    }

    const openModal = () => {
        setModalOpen(true)
        globalState.toggleBodyClass('overflow-hidden')
    }

    const modalClose = () => {
        setModalOpen(false)
        globalState.toggleBodyClass('overflow-hidden')
    }

    useEffect(() => {
        const imagePositions = []
        const imageList = refModal.current.querySelectorAll(`.${style.imageModal}`)
        imageList.forEach(image => {
            imagePositions.push(image.offsetTop)
        })
        const reversePositons = [...imagePositions].reverse()
        const searchIndex = (element, scrollTop) => element <= scrollTop

        const scrollHandler = () => {
            const scrollTop = refModal.current.scrollTop
            const element = reversePositons.find((element) => searchIndex(element, scrollTop))
            const index = element ? imagePositions.indexOf(element) : 0
            setActiveImage(images[index].gallery)
        }
        refModal.current.addEventListener('scroll', scrollHandler)

        return () => {
            if (refModal.current) {
                refModal.current.removeEventListener('scroll', scrollHandler)
            }
        }
    }, [])


    return (
        <>
            <div className={style.gallery}>
                <div className={`${style.nav} is-hidden--lg-down`}>
                    {images.length > 4
                        ? <div data-disabled={navDisabled === 'up'} onClick={() => slidePreview('up')} className={style.navPrev}>
                            <Icon name='chevronUp' width='20' height='20' />
                        </div>
                        : null
                    }

                    <div className={`${style.previews}`}>
                        <motion.div animate={animatePreview}>
                            {images.map((image, index) => (
                                <div onClick={() => choseActive(image.gallery, index)} data-active={activeImage === image.gallery} key={image.gallery} className={style.imagePreview}>
                                    <Image src={image.preview} width='88' height='88' alt={alt} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {images.length > 4
                        ? <div data-disabled={navDisabled === 'down'} onClick={() => slidePreview('down')} className={style.navNext}>
                            <Icon name='chevronDown' width='20' height='20' />
                        </div>
                        : null
                    }
                </div>

                <div className={`${style.navTablet} is-hidden--xl-up`}>
                    <span /><div /><div /><div /><div /><div />
                </div>

                <div onClick={openModal} className={style.imageMain}>
                    <Image src={activeImage} layout='fill' alt={alt} />
                </div>

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

            <div ref={refModal} data-open={modalOpen} className={style.galleryModal}>
                <div className='container p-relative'>
                    <div className={`${style.modalHeader} container`}>
                        <div className='text--t1 text--bold'>{alt}</div>
                        <div className='c-pointer' onClick={modalClose}><Icon name='close' width='16' height='16' /></div>

                        {/* <div className='c-pointer is-hidden--md-up' onClick={modalClose}>
                            <Icon name='chevronLeft' width='11' height='20' />
                            <span className='ml-0.5 text--no-wrap'>{alt}</span>
                        </div> */}
                    </div>

                    {images.map(image => (
                        <div key={image.full} className={style.imageModal}>
                            <Image src={image.full} width='1496' height='919' alt={alt} />
                        </div>
                    ))}

                    <div className={`${style.previewsModal} is-hidden--md-down`}>
                        {images.map((image, index) => (
                            <div onClick={() => choseActive(image.gallery, index)} data-active={activeImage === image.gallery} key={image.preview} className={style.previewModal}>
                                <Image src={image.preview} width='88' height='88' alt={alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
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
    const [isSelected, setIsSelected] = useState(false)
    const [diabled, setDiabled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [count, setCount] = useState(1)
    const refCounter = useRef(null)
    const refInput = useRef(null)
    const maxValue = 109

    const getValue = () => {
        const value = refInput.current.value
        return +value.replace(/[^\d]/g, '')
    }

    const documentClick = event => {
        if (!event.target.classList.contains(`${style.counterInput}`)) {
            document.removeEventListener('click', documentClick)
            setIsSelected(false)
            refInput.current.value = getValue()
        }
    }

    const counerClick = () => {
        // document.removeEventListener('click', documentClick)
        setIsSelected(true)
        setTimeout(() => {
            refInput.current.focus()
            document.addEventListener('click', documentClick)
        }, 100);
    }

    const updateCount = increment => {
        const newValue = +count + increment
        setCount(newValue)
    }

    const buyHandler = () => {
        setCount(1)
        setIsOpen(true)
        refInput.current.value = 1
        globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
        globalState.popover.setImage('/images/product/image-0.jpg')
        globalState.popover.setTextSecondary('ТЕПЕРЬ В КОРЗИНЕ')
        globalState.popover.setIsBasket(true)
        globalState.popover.setIsOpen(true)
    }

    const changeHandler = () => {
        setCount(getValue())
    }

    useEffect(() => {
        if (count <= 0) {
            setDiabled('minus')
            setCount(0)
            refInput.current.value = 0
            setIsSelected(false)
            setIsOpen(false)
            globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
            globalState.popover.setImage('/images/product/image-0.jpg')
            globalState.popover.setTextSecondary('БОЛЬШЕ НЕ В КОРЗИНЕ')
            globalState.popover.setIsBasket(true)
            globalState.popover.setIsOpen(true)
        } else if (count >= maxValue) {
            setDiabled('plus')
            setCount(maxValue)
            refInput.current.value = maxValue
            globalState.popover.setTextPrimary('System 4 Shale Oil Shampoo 4')
            globalState.popover.setImage('/images/product/image-0.jpg')
            globalState.popover.setTextSecondary('Максимум для этого заказа')
            globalState.popover.setIsBasket(false)
            globalState.popover.setIsOpen(true)
        } else {
            setDiabled(false)
        }
    }, [count])
    

    return (
        <div className={style.buybtn}>
            <div className={`${style.buybtnChildren} is-hidden--lg-up is-hidden--sm-down`}>
                {children}
            </div>

            <div className='btn btn--md btn--shadow'>
                <Icon name='heartMD' width='18' height='16' />
            </div>

            <div onClick={buyHandler} data-open={isOpen} className={`${style.btnMain} btn btn--md btn--fill btn--primary`}>
                <span className='text--upper text--p5 text--bold mr-0.8'>Добавить в корзину</span>
                <Icon name='basketMD' width='18' height='18' />
            </div>

            <div data-open={isOpen} className={style.buyOpen}>
                
                <div className={`${style.toBasket} btn btn--md btn--fill btn--secondary`}>
                    <span className='text--upper text--p5 text--bold mr-0.8'>к корзине</span>
                </div>

                <div
                    ref={refCounter}
                    data-active={isSelected}
                    className={`${style.countSelector} text--p5 text--bold`}>
                    <span data-disabled={diabled === 'minus'} onClick={() => updateCount(-1)} className={style.counterBtn}>
                        <Icon name='minus' width='16' height='16' />
                    </span>

                    <input
                        type='text'
                        ref={refInput}
                        placeholder={count}
                        onChange={changeHandler}
                        className={`${style.counterInput} text--p5 text--bold`} />
                    <div onClick={counerClick} className={style.counterDiv}>{count} ШТ</div>

                    <span data-disabled={diabled === 'plus'} onClick={() => updateCount(+1)} className={style.counterBtn}>
                        <Icon name='plus' width='16' height='16' />
                    </span>
                </div>
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
    const refChildrenContainer = useRef(null)
    const refContainerHeight = useRef(null)
    const refAccordeon = useRef(null)
    const titleHeight = 50

    useEffect(() => {
        refContainerHeight.current = refChildrenContainer.current.clientHeight + titleHeight
        const newHeight = isOpen ? refContainerHeight.current : titleHeight
        refAccordeon.current.style.height = `${newHeight}px`
    }, [])

    const toggleHandler = () => {
        setIsOpen(!isOpen)
        const newHeight = !isOpen ? refContainerHeight.current : titleHeight
        refAccordeon.current.style.height = `${newHeight}px`
    }

    return (
        <div ref={refAccordeon} data-open={isOpen} className={style.accordeon}>
            <div onClick={toggleHandler} className={`${style.accordeonTitle} text--p1 text--bold`}>{title}</div>

            <div ref={refChildrenContainer}>
                {children}
            </div>
        </div>
    )
}
