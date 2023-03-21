import Icon from './Icon'
import Link from 'next/link'
import Image from 'next/image'
import { debounce } from './helpers/debounce'
import { globalState } from './helpers/globalState'
import { useState, useEffect, useRef } from 'react'
import style from '../styles/module/Header.module.scss'
import { motion, useAnimationControls } from 'framer-motion'

export default function Header() {
    const refRabbit = useRef(null)
    const refThemeDefault = useRef('ui-light')
    const [theme, setTheme] = useState('ui-light')
    const [basketCount, setBasketCount] = useState(0)
    const [themeImage, setThemeImage] = useState('ui-light')
    const [isTranslated, setIsTranslated] = useState(false)
    const [isHeaderFixed, setIsHeaderFixed] = useState(false)
    const [isRabbitFixed, setIsRabbitFixed] = useState(false)
    const [isHeaderHover, setIsHeaderHover] = useState(false)
    const animateHeader = useAnimationControls()
    const refHeader = useRef(null)
    const refIsHandled = useRef(false)
    const scrolloffset = 300

    const hoverEnterHandler = () => {
        setIsTranslated(true)
        setIsRabbitFixed(false)
        setThemeLight()
    }

    const hoverLeaveHandler = () => {
        setThemeDefault()
        if (window.scrollY <= scrolloffset) return
        setIsTranslated(false)
        setIsRabbitFixed(true)
    }

    const setThemeLight = () => {
        setTheme('ui-light')
        setIsHeaderHover(true)
    }

    const setThemeDefault = () => {
        setTheme(refThemeDefault.current)
        setIsHeaderHover(false)
    }

    const setHeaderTheme = theme => {
        refThemeDefault.current = theme
        setTheme(theme)
    }

    const scrollHandler = () => {
        setThemeDefault()
        const scroll = window.scrollY
        refRabbit.current.style.pointerEvents = 'none'
        if (refIsHandled.current) clearInterval(refIsHandled.current)
        if (scroll > scrolloffset) {
            setIsHeaderFixed(true)
            setIsRabbitFixed(true)
            setIsTranslated(false)
        } else {
            setIsHeaderFixed(false)
            setIsRabbitFixed(false)
        }

        refIsHandled.current = setTimeout(() => {
            if (!refRabbit.current) return
            refRabbit.current.style.pointerEvents = 'all'
        }, 300)
    }

    const debounceScroll = debounce(scrollHandler, 5)

    const getTranslate = () => {
        const ww = window.innerWidth
        let translate = 0
        if (ww >= globalState.sizes.xxl) translate = -59
        else if (ww < globalState.sizes.xxl && ww >= globalState.sizes.xl) translate = -51
        else if (ww < globalState.sizes.xl && ww >= globalState.sizes.lg) translate = -45
        // else if (ww < globalState.sizes.lg && ww >= globalState.sizes.md) translate = 
        return translate
    }

    useEffect(() => {
        if (isHeaderFixed) {
            animateHeader.start({ position: 'fixed', y: -180, transition: { duration: 0 } })
        } else {
            animateHeader.start({ position: 'absolute', y: 0, transition: { duration: 0 } })
        }
    }, [isHeaderFixed])

    useEffect(() => {
        if (!isHeaderFixed) return
        const yPosition = getTranslate()
        if (isTranslated) {
            animateHeader.start({ y: yPosition, transition: { duration: 0.4 } })
        } else {
            animateHeader.start({ y: -180, transition: { duration: 0.4 } })
        }
    }, [isTranslated])


    useEffect(() => {
        window.addEventListener('scroll', debounceScroll, { passive: true })

        const toggleClass = className => {
            const classList = document.querySelector('html').classList
            if (classList.contains(className)) classList.remove(className)
            else classList.add(className)
        }
        const addClass = className => {
            const classList = document.querySelector('html').classList
            classList.add(className)
        }
        const removeClass = className => {
            const classList = document.querySelector('html').classList
            classList.remove(className)
        }

        globalState.body = { addClass, removeClass, toggleClass }
        globalState.basket = { setBasketCount, basketCount }
        globalState.header = { setTheme: setHeaderTheme }

        return () => {
            window.removeEventListener('scroll', debounceScroll)
        }
    }, [])

    return (
        <>
            <header ref={refHeader} onMouseEnter={setThemeLight} onMouseLeave={setThemeDefault} className={`${style.header} ${theme}`}>
                <div className={`container ${style.container}`}>
                    <div data-hover={isHeaderHover} className='header-hover'></div>

                    <div className={`${style.top} ${style.textt4} text--regular is-hidden--md-down`} >

                        <div className={style.group}>
                            <a className='link active' href='#' rel='nofollow'>RedHare Market</a>
                            <a className='link' href='#' rel='nofollow'>RedHare Обучение</a>
                        </div>
                        <div className={'d-flex flex--align-center'}>
                            <a className='link btn btn--xs' href='#' rel='nofollow'>
                                <Icon name='navigationXS' width='12' height='12' size='xxs' />
                                <span>Петропавловск-Камчатский</span>
                            </a>
                            <a className='link is-hidden--xl-up mr-0:lg' href='#'>Контакты</a>
                            <a className='link is-hidden--xl-down' href='tel:+74959833542'>+7 (495) 983-35-42</a>
                        </div>
                        <div className={`${style.group} is-hidden--lg-down`}>
                            <a className='link' href='#'>Помощь</a>
                            <a className='link' href='#'>Доставка и оплата</a>
                            <a className='link' href='#'>Контакты</a>
                        </div>
                    </div>
                </div>
            </header>

            <motion.div
                animate={animateHeader}
                data-active={isTranslated}
                onMouseEnter={setThemeLight}
                onMouseLeave={hoverLeaveHandler}
                className={`${style.fixedContainer} ${theme}`}
            >

                <div className={`${style.fixedContainerInnerTablet} is-hidden--lg-up`}>
                    <div className={`${style.top} ${style.textt4} text--regular`}>
                        <div className={style.groupMD}>
                            <div className='btn btn--empty btn--xs'>
                                <Icon width='24' height='24' external='is-hidden--sm-down' name='burger' />
                                <Icon width='21' height='21' external='is-hidden--md-up' name='burger' />
                            </div>
                            <div className='btn btn--empty btn--sm'>
                                <Icon width='24' height='24' external='is-hidden--sm-down' name='search' />
                                <Icon width='21' height='21' external='is-hidden--md-up' name='search' />
                            </div>
                        </div>
                        <div className={style.group}>
                            {/* <Link href='/'> */}
                            <div className='logo-light'>
                                <div className='is-hidden--sm-down'>
                                    <Image src='/images/layout/logo-md.svg' width='242' height='45' alt='RedHair market' />
                                </div>
                                <div className='is-hidden--md-up'>
                                    <Image src='/images/layout/logo-xs.svg' width='41' height='41' alt='RedHair market' />
                                </div>
                            </div>
                            {/* </Link> */}

                            {/* <Link href='/'> */}
                            <div className='logo-dark'>
                                <div className='is-hidden--sm-down'>
                                    <Image src='/images/layout/logo-dark-md.svg' width='242' height='45' alt='RedHair market' />
                                </div>
                                <div className='is-hidden--md-up'>
                                    <Image src='/images/layout/logo-dark-xs.svg' width='41' height='41' alt='RedHair market' />
                                </div>
                            </div>
                            {/* </Link> */}
                        </div>
                        <div className={style.groupMD}>
                            <div className='btn btn--empty btn--xs p-relative'>
                                <Icon width='27' height='24' external='is-hidden--sm-down' name='basket' />
                                <Icon width='24' height='21' external='is-hidden--md-up' name='basket' />
                                <div className={`${style.countBasket} ${!!basketCount ? '' : 'is-hidden'}`}>{basketCount}</div>
                            </div>
                            <div className='btn btn--empty btn--sm'>
                                <Icon width='24' height='24' external='is-hidden--sm-down' name='person' />
                                <Icon width='21' height='21' external='is-hidden--md-up' name='person' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${style.fixedContainerInnerDesktop} is-hidden--md-down`}>
                    <div className={`${style.groupMD} ${style.textt1} text--semi`}>
                        <Link href='/'>
                            <a href='/' className='logo-light'>
                                <div className='is-hidden--xxl-down' style={{ width: 297, height: 52 }}>
                                    <Image src='/images/layout/logo-xxl.svg' width='297' height='52' alt='RedHair market' />
                                </div>
                                <div className='is-hidden--xxxl-up is-hidden--xl-down' style={{ width: 256, height: 44 }}>
                                    <Image src='/images/layout/logo-xl.svg' width='256' height='44' alt='RedHair market' />
                                </div>
                                <div className='is-hidden--xxl-up' style={{ width: 44, height: 44 }}>
                                    <Image src='/images/layout/logo-lg.svg' width='44' height='44' alt='RedHair market' />
                                </div>
                            </a>
                        </Link>

                        <Link href='/'>
                            <a href='/' className='logo-dark'>
                                <div className='is-hidden--xxl-down' style={{ width: 297, height: 52 }}>
                                    <Image src='/images/layout/logo-dark-xxl.svg' width='297' height='52' alt='RedHair market' />
                                </div>
                                <div className='is-hidden--xxxl-up is-hidden--xl-down' style={{ width: 256, height: 44 }}>
                                    <Image src='/images/layout/logo-dark-xl.svg' width='256' height='44' alt='RedHair market' />
                                </div>
                                <div className='is-hidden--xxl-up' style={{ width: 44, height: 44 }}>
                                    <Image src='/images/layout/logo-dark-lg.svg' width='44' height='44' alt='RedHair market' />
                                </div>
                            </a>
                        </Link>

                        <div className={`${style.catalogBtn} btn btn--md btn--secondary`}>
                            <div className='btn__icon'>
                                <Icon width='20' height='20' external='is-hidden--lg-down' name='catalogMD' />
                                <Icon width='16' height='16' external='is-hidden--xl-up' name='catalogMD' />
                            </div>
                            <span className='btn__text is-hidden--xxl-down'>Каталог товаров</span>
                            <span className='btn__text is-hidden--xxxl-up'>Каталог</span>
                        </div>

                        <div className='btn btn--label btn--md'>
                            <div className='btn__icon '>
                                <Icon width='22' height='22' external='is-hidden--lg-down' name='brandsMD' />
                                <Icon width='18' height='18' external='is-hidden--xl-up' name='brandsMD' />
                            </div>
                            <span className='btn__text'>Бренды</span>
                        </div>

                        <div className='btn btn--label btn--md'>Подборки</div>
                        <div className='btn btn--label btn--md'>Со скидкой</div>
                    </div>

                    <div className={`${style.groupSM} is-hidden--lg-down`}>
                        <div className='btn btn--empty btn--sm'><Icon width='21' height='21' name='searchMD' /></div>
                        <div className='btn btn--empty btn--sm'><Icon width='24' height='21' name='heartMD' /></div>
                        <div className='btn btn--empty btn--sm p-relative'>
                            <div className={`${style.countBasket} ${!!basketCount ? '' : 'is-hidden'}`}>{basketCount}</div>
                            <Icon width='27' height='25' name='basketMD' />
                        </div>
                        <AuthBtn size='25' />
                    </div>

                    <div className={`${style.groupSM} is-hidden--xl-up`}>
                        <div className='btn btn--empty btn--sm'><Icon width='18' height='20' name='searchMD' /></div>
                        <div className='btn btn--empty btn--sm'><Icon width='20' height='18' name='heartMD' /></div>
                        <div className={`btn btn--empty btn--sm p-relative`}>
                            <div className={`${style.countBasket} ${!!basketCount ? '' : 'is-hidden'}`}>{basketCount}</div>
                            <Icon width='22' height='21' name='basketMD' />
                        </div>
                        <AuthBtn size='20' />
                    </div>
                </div>
            </motion.div>

            <div
                ref={refRabbit}
                data-active={isRabbitFixed}
                onClick={hoverEnterHandler}
                onMouseOver={hoverEnterHandler}
                className={`${style.rabbit}`}>
                <Image src='/images/layout/logo-lg.svg' layout='fill' alt='RedHair market' />
            </div>
        </>
    )
}

function AuthBtn({ size }) {
    const [isAuth, setIsAuth] = useState(false)

    const authHandler = () => {
        globalState.modal.setData({ type: 'auth' })
        globalState.modal.setTemplate('auth')
        globalState.modal.setIsZero(true)
        globalState.modal.setIsOpen(true)
    }

    useEffect(() => {
        globalState.auth = { setIsAuth, isAuth }
    }, [])

    useEffect(() => {
        globalState.auth.isAuth = isAuth
    }, [isAuth])

    return isAuth
        ? (
            <div onClick={() => setIsAuth(false)} className={`btn btn--empty btn--sm p-relative`}>
                {/* <div className={`${style.countBasket} ${!!basketCount ? '' : 'is-hidden'}`}>{basketCount}</div> */}
                <Icon name='person' width={size} height={size} />
            </div>
        ) : <div onClick={authHandler} className={`${style.textt6} btn btn--tetriary btn--md text--bold ml-0.5`}>ВОЙТИ</div>
}
