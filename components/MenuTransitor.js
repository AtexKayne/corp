/* eslint-disable @next/next/no-img-element */
import A from "./A";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls } from 'framer-motion'
import { menuItems } from './helpers/constants'
import { useRouter } from 'next/router'
import Search from "./Search";
import Image from "next/image";
import MenuContacts from "./MenuContacts";
import useDeviceDetect from '../components/helpers/useDeviceDetect'
// import MenuPreloader from "./MenuPreloader";

export default function MenuTransitor({ theme, preloaderState, setTheme, setContainerWidth, animateContent, className }) {
    const router = useRouter()
    const refTheme = useRef(theme)
    const refBurger = useRef(null)
    const refControls = useRef(null)
    const isAnimated = useRef(false)
    const isMenuOpened = useRef(false)
    const animate = useAnimationControls()
    const animateBreadcrumbs = useAnimationControls()
    const animateWrapper = useAnimationControls()
    const animateSearch = useAnimationControls()
    const animateLang = useAnimationControls()
    const animateImage = useAnimationControls()
    const animatePhone = useAnimationControls()
    const animateNav = useAnimationControls()
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [leftPosition, setLeftPosition] = useState('-100vw')
    const [menuState, setMenuState] = useState('close')
    const { isMobile } = useDeviceDetect()
    const transitors = [
        {
            position: 'right',
            initial: { x: '100vw' },
            variants: {
                shown: { x: '60vw' },
                hidden: { x: '100vw' },
            },
            line: {
                shown: { width: ['1px', '20px', '1px'] },
                hidden: { width: ['1px', '20px', '1px'] },
            },
            image: '/assets/img/transitor-right.svg'
        },
        {
            position: 'top',
            initial: { y: '-100vh' },
            variants: {
                shown: { y: '-50vh' },
                hidden: { y: '-100vh' },
            },
            line: {
                shown: { height: ['1px', '20px', '1px'] },
                hidden: { height: ['1px', '20px', '1px'] },
            },
            image: '/assets/img/transitor-top.svg'
        },
        {
            position: 'bottom',
            initial: { y: '100vh' },
            variants: {
                shown: { y: '50vh' },
                hidden: { y: '100vh' },
            },
            line: {
                shown: { height: ['1px', '20px', '1px'] },
                hidden: { height: ['1px', '20px', '1px'] },
            },
            image: '/assets/img/transitor-bottom.svg'
        },
        {
            position: 'left',
            initial: { x: leftPosition },
            variants: {
                shown: { x: '-40vw' },
                hidden: { x: leftPosition },
            },
            line: {
                shown: { width: ['1px', '20px', '1px'], backgroundColor: '#8712FC' },
                hidden: { width: ['1px', '20px', '1px'], backgroundColor: ['#8712FC', '#8712FC', '#8712FC', '#DADFEA'] },
            },
            image: '/assets/img/transitor-left.svg'
        }
    ]

    const breadcrumbsSetting = (url = router.asPath) => {
        const linkPath = url.split('/')
        linkPath.shift()
        const pathArray = linkPath.map((path, i) => {
            return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') }
        })
        const newPosition = `-${(window.innerWidth - 101 - pathArray.filter(path => path.href !== '/').length * 50)}px`
        setLeftPosition(newPosition)
        setBreadcrumbs(pathArray)
    }

    const hideTransitor = async () => {
        setTheme('ui-light')
        animate.start('hidden')
        await animateBreadcrumbs.start('shown')

        if (refTheme.current !== theme) {
            setTheme(refTheme.current)
        }
    }

    const showTransitor = async () => {
        const currentTheme = refTheme.current
        setTheme('ui-light')
        animateBreadcrumbs.start('hidden')
        const awaitAnimation = await animate.start('shown')
        refTheme.current = currentTheme
        return awaitAnimation
    }

    const clickNavHandler = async (event) => {
        if (event.target.tagName.toUpperCase() !== 'A') return
        const currentState = menuState
        setMenuState('awaiting')
        animateImage.start('hidden')
        await animateWrapper.start('smash')
        if (currentState === 'menu') await animateNav.start('hidden')
        else if (currentState === 'lang') await animateLang.start('hidden')
        else if (currentState === 'phone') await animatePhone.start('hidden')
        else if (currentState === 'search') await animateSearch.start('hidden')
        animateContent.start('end')
        await animateWrapper.start('fastHidden')
        isMenuOpened.current = false
        setTimeout(() => setMenuState('close'), 200)
    }

    const toggleMenu = async (animation, type) => {
        if (!isMenuOpened.current) {
            isMenuOpened.current = true
            setTheme('ui-light')
            if (menuState === 'close') {
                setMenuState(type)
                animateContent.start('start')
                await showTransitor()
                animation.start('shown')
                animateImage.start('shown')
                await animateWrapper.start('fastShown')
                await animateWrapper.start('hidden')
                isMenuOpened.current = false
            } else {
                if (menuState === type) {
                    setMenuState('close')
                    animateImage.start('hidden')
                    await animateWrapper.start('smash')
                    animateContent.start('end')
                    await animation.start('hidden')
                    animateWrapper.start('fastHidden')
                    await hideTransitor()
                    isMenuOpened.current = false
                } else {
                    await animateWrapper.start('smash')
                    if (menuState === 'menu') animateNav.start('hidden')
                    else if (menuState === 'lang') animateLang.start('hidden')
                    else if (menuState === 'phone') animatePhone.start('hidden')
                    else if (menuState === 'search') animateSearch.start('hidden')
                    await animation.start('shown')
                    animateWrapper.start('hidden')
                    isMenuOpened.current = false
                    setMenuState(type)
                }
            }
        }
    }

    // Preloader state change
    useEffect(() => {
        if (preloaderState === false) {
            animate.start('hidden').then(() => {
                animateBreadcrumbs.start('shown')
                setTheme(refTheme.current)
            })
        } else if (preloaderState === true) {
            setTheme('ui-light')
            animate.start('shown').then(() => animateBreadcrumbs.start('hidden'))
        }
    }, [preloaderState])

    // Theme change
    useEffect(() => {
        if (preloaderState !== undefined && theme !== refTheme.current) refTheme.current = theme
    }, [theme])

    // Breadcrambs change
    useEffect(() => {
        if (isAnimated.current) {
            isAnimated.current.then(hideTransitor)
            animateContent.start('end')
        }
        if (!isMobile) setContainerWidth()
    }, [leftPosition, breadcrumbs])

    // Router change
    useEffect(() => {
        if (!isAnimated.current) {
            breadcrumbsSetting()
            setTimeout(hideTransitor, 100)
        }

        const startHandler = (url) => {
            if (url !== router.asPath) {
                setTheme('ui-light')
                refTheme.current = 'ui-light'
                animateContent.start('start')
                isAnimated.current = showTransitor()
            }
        }
        const completeHandler = (url) => {
            if (url === router.asPath && isAnimated.current) {
                breadcrumbsSetting(url)
                // isAnimated.current.then(hideTransitor)
            }
        }

        router.events.on('routeChangeStart', startHandler)
        router.events.on('routeChangeComplete', completeHandler)
        router.events.on('routeChangeError', completeHandler)

        return () => {
            router.events.off('routeChangeStart', startHandler)
            router.events.off('routeChangeComplete', completeHandler)
            router.events.off('routeChangeError', completeHandler)
        }
    }, [router])

    return (
        <div data-state={menuState} className={`${className} menu-wrapper`}>
            <div className='menu'>
                <div ref={refBurger} onClick={() => toggleMenu(animateNav, 'menu')} className={`icon ${menuState !== 'menu' ? 'icon--menu' : 'icon--close'} c-hover`} />

                <div ref={refControls} className='menu__controls'>
                    <div onClick={() => toggleMenu(animateSearch, 'search')} className={`icon ${menuState !== 'search' ? 'icon--search' : 'icon--close'} c-hover`} />
                    <div onClick={() => toggleMenu(animateLang, 'lang')} className={`icon ${menuState !== 'lang' ? 'icon--lang' : 'icon--close'} c-hover`} />
                    <div onClick={() => toggleMenu(animatePhone, 'phone')} className={`icon ${menuState !== 'phone' ? 'icon--phone' : 'icon--close'} c-hover`} />
                </div>

                <Image src='/assets/img/icons/icon-logo.svg' width='31' height='153' alt='Simrussia logo' />

                <div className='menu__social'>
                    <div className='c-hover'>VK</div>
                    <div className='c-hover'>TG</div>
                </div>
            </div>

            <motion.nav
                onClick={clickNavHandler}
                animate={animateNav}
                initial={{ x: '-100vw', zIndex: 0 }}
                transition={{ duration: 0 }}
                variants={{
                    shown: { x: '-40vw', zIndex: 4, transition: { delay: 0.2, duration: 0 } },
                    hidden: { zIndex: 0, x: '-100vw' }
                }}
                className='menu__nav'>
                {menuItems.map(item => <A key={item.text} externalClass={`${router.asPath === item.link ? 'active' : ''} text--h4`} href={item.link} text={item.text} />)}
                <motion.div
                    className='menu__nav__image'
                    animate={animateImage}
                    initial={{ x: '600px' }}
                    variants={{ shown: { x: 0 }, hidden: { x: '600px' } }}
                    transition={{ duration: 1 }}>
                    <img src={transitors[3].image} alt='' />
                </motion.div>
            </motion.nav>

            <motion.div
                animate={animateSearch}
                initial={{ x: '-100vw', zIndex: 0 }}
                transition={{ duration: 0 }}
                variants={{
                    shown: { x: '-40vw', zIndex: 4, transition: { delay: 0.2, duration: 0 } },
                    hidden: { zIndex: 0, x: '-100vw' }
                }}
                className='menu__nav'>
                <Search />
                <motion.div
                    className='menu__nav__image'
                    animate={animateImage}
                    initial={{ x: '600px' }}
                    variants={{ shown: { x: 0 }, hidden: { x: '600px' } }}
                    transition={{ duration: 1 }}>
                    <img src={transitors[3].image} alt='' />
                </motion.div>
            </motion.div>

            <motion.div
                animate={animateLang}
                initial={{ x: '-100vw', zIndex: 0 }}
                transition={{ duration: 0 }}
                variants={{
                    shown: { x: '-40vw', zIndex: 4, transition: { delay: 0.2, duration: 0 } },
                    hidden: { zIndex: 0, x: '-100vw' }
                }}
                className='menu__nav'>
                <div className='menu__lang text--h4'>
                    <div className='c-hover' data-active='true'>Русский</div>
                    <div className='c-hover'>English</div>
                    <div className='c-hover'>Türkçe</div>
                    <div className='c-hover'>中文</div>
                </div>
                <motion.div
                    className='menu__nav__image'
                    animate={animateImage}
                    initial={{ x: '600px' }}
                    variants={{ shown: { x: 0 }, hidden: { x: '600px' } }}
                    transition={{ duration: 1 }}>
                    <img src={transitors[3].image} alt='' />
                </motion.div>
            </motion.div>

            <motion.div
                animate={animatePhone}
                initial={{ x: '-100vw', zIndex: 0 }}
                transition={{ duration: 0 }}
                variants={{
                    shown: { x: '-40vw', zIndex: 4, transition: { delay: 0.2, duration: 0 } },
                    hidden: { zIndex: 0, x: '-100vw' }
                }}
                className='menu__nav'>
                <div onClick={clickNavHandler} className='menu__lang text--h4'>
                    <MenuContacts />
                </div>
                <motion.div
                    className='menu__nav__image'
                    animate={animateImage}
                    initial={{ x: '600px' }}
                    variants={{ shown: { x: 0 }, hidden: { x: '600px' } }}
                    transition={{ duration: 1 }}>
                    <img src={transitors[3].image} alt='' />
                </motion.div>
            </motion.div>

            <motion.div
                animate={animateWrapper}
                initial={{ x: '-100vw', zIndex: 0 }}
                variants={{
                    shown: { x: '-40vw', zIndex: 0 },
                    fastShown: { x: '-40vw', zIndex: 0, transition: { duration: 0 } },
                    hidden: { zIndex: [4, 4], x: ['-40vw', '-40vw', '-100vw'] },
                    smash: { zIndex: 4, x: '-40vw', transition: { duration: 0.5 } },
                    fastHidden: { zIndex: 0, x: '-100vw', transition: { duration: 0 } }
                }}
                transition={{ duration: 1 }}
                className='menu__wrapper'>
            </motion.div>

            <div className='bread'>
                {breadcrumbs.map((breadcrumb, i) => {
                    return (
                        <div className='bread__line' key={breadcrumb.href}>
                            <div className='bread__filler--1' />
                            <div className='bread__filler--2' />
                            <motion.div
                                animate={animateBreadcrumbs}
                                initial={{ x: 200 }}
                                variants={{ hidden: { x: -200 }, shown: { x: 0 } }}
                                transition={{ duration: 1 }}
                                className='bread__text'>
                                <A href={breadcrumb.href} text={breadcrumb.breadcrumb.toUpperCase()} />
                            </motion.div>
                            <div className='bread__filler--3' />
                        </div>
                    )
                })}
            </div>

            {transitors.map((transitor) => (
                <motion.div
                    animate={animate}
                    key={transitor.position}
                    transition={{ duration: 1, easings: ["easeIn", "easeOut"] }}
                    initial={transitor.initial}
                    variants={transitor.variants}
                    className={`transitor transitor--${transitor.position}`}>
                    <motion.div
                        animate={animate}
                        variants={transitor.line}
                        className='transitor__line' />
                    <motion.div
                        animate={animateImage}
                        initial={{ x: '-500px', y: transitor.position === 'top' ? '500px' : '-500px' }}
                        variants={{
                            shown: { y: 0, x: 0 },
                            hidden: { x: '-500px', y: transitor.position === 'top' ? '500px' : '-500px' }
                        }}
                        transition={{ duration: 1, easings: ["easeIn", "easeOut"] }}
                        className='transitor__image' >
                        <img src={transitor.image} alt='' />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}