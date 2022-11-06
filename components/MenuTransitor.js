/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useContext } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { ThemeContext } from './helpers/ThemeContext'
import MenuContacts from './MenuContacts'
import { useRouter } from 'next/router'
import Search from './Search'
import A from './A'

export default function MenuTransitor({ preloaderState, menuItems, setContainerWidth, animateContent, className }) {
    const { theme, setTheme } = useContext(ThemeContext)
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
        const linkPath = url.split('/').filter(link => !!link)
        const pathArray = linkPath.map((path, i) => {
            return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') }
        })
        const newPosition = `-${(window.innerWidth - 101 - pathArray.filter(path => path.href !== '/').length * 50)}px`
        setLeftPosition(newPosition)
        setBreadcrumbs(pathArray)
    }

    const hideTransitor = async () => {
        setTheme('light')
        animate.start('hidden')
        await animateBreadcrumbs.start('shown')
        setTheme(refTheme.current)
    }

    const showTransitor = async () => {
        setTheme('light')
        animateBreadcrumbs.start('hidden')
        const awaitAnimation = await animate.start('shown')
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
            setTheme('light')
            animate.start('shown').then(() => {
                animateBreadcrumbs.start('hidden')
            })
        }
    }, [preloaderState])

    // Breadcrambs change
    useEffect(() => {
        if (isAnimated.current) {
            isAnimated.current.then(hideTransitor)
            animateContent.start('end')
        }
        setContainerWidth()
    }, [leftPosition, breadcrumbs])

    // Router change
    useEffect(() => {
        if (!isAnimated.current) {
            breadcrumbsSetting()
            setTimeout(hideTransitor, 100)
        }

        const startHandler = (url) => {
            if (url !== router.asPath) {
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

    useEffect(() => {
        if (theme.includes('ui')) {
            refTheme.current = theme
        }
    }, [theme])

    return (
        <div data-state={menuState} className={`${className} menu-wrapper`}>
            <div className='menu'>
                <div ref={refBurger} onClick={() => toggleMenu(animateNav, 'menu')} className={`icon ${menuState !== 'menu' ? 'icon--menu' : 'icon--close'} c-hover`} />

                <div ref={refControls} className='menu__controls'>
                    <div onClick={() => toggleMenu(animateSearch, 'search')} className={`icon ${menuState !== 'search' ? 'icon--search' : 'icon--close'} c-hover`} />
                    <div onClick={() => toggleMenu(animateLang, 'lang')} className={`icon ${menuState !== 'lang' ? 'icon--lang' : 'icon--close'} c-hover`} />
                    <div onClick={() => toggleMenu(animatePhone, 'phone')} className={`icon ${menuState !== 'phone' ? 'icon--phone' : 'icon--close'} c-hover`} />
                </div>

                <svg width='31' height='153' viewBox='0 0 31 153' fill='none'>
                    <path d='M28.23 150.5C27.6306 151.122 26.9135 151.62 26.1205 151.963C25.3274 152.306 24.4741 152.489 23.61 152.5L23.61 150.39C24.2258 150.379 24.8332 150.245 25.3964 149.996C25.9597 149.747 26.4675 149.388 26.89 148.94C27.7016 147.948 28.1151 146.69 28.05 145.41C28.1402 144.184 27.7852 142.966 27.05 141.98C26.7244 141.587 26.3142 141.272 25.85 141.06C25.3823 140.85 24.8724 140.751 24.36 140.77C23.5863 140.735 22.8284 140.996 22.24 141.5C21.7187 141.96 21.2968 142.521 21 143.15C20.6 144.05 20.24 144.97 19.93 145.9C19.5874 146.994 19.1697 148.063 18.68 149.1C18.2826 149.91 17.7002 150.616 16.98 151.16C16.1121 151.773 15.0602 152.069 14 152C13.0034 152.011 12.0234 151.745 11.17 151.23C10.3074 150.702 9.61357 149.939 9.17001 149.03C8.67646 147.966 8.43357 146.803 8.46001 145.63C8.42962 144.43 8.70856 143.241 9.27001 142.18C9.77874 141.226 10.5442 140.432 11.48 139.89C12.4634 139.339 13.5637 139.031 14.69 138.99L14.69 141.1C13.5095 141.124 12.3843 141.604 11.55 142.44C11.1519 142.868 10.8441 143.372 10.6448 143.922C10.4456 144.472 10.3589 145.056 10.39 145.64C10.3199 146.772 10.6767 147.889 11.39 148.77C11.7102 149.137 12.1059 149.43 12.55 149.63C13.0068 149.828 13.5025 149.921 14 149.9C14.7265 149.943 15.4421 149.707 16 149.24C16.5075 148.791 16.9132 148.239 17.19 147.62C17.5691 146.738 17.9029 145.836 18.19 144.92C18.5229 143.801 18.9373 142.708 19.43 141.65C19.8398 140.793 20.4589 140.054 21.23 139.5C22.1441 138.888 23.2311 138.586 24.33 138.64C25.1038 138.609 25.8747 138.752 26.586 139.058C27.2973 139.365 27.9308 139.827 28.44 140.41C29.5528 141.83 30.1045 143.61 29.99 145.41C30.0957 147.272 29.4633 149.101 28.23 150.5Z' fill='currentColor' />
                    <path d='M29.6901 131.5L29.6901 133.59L8.83008 133.59L8.83008 131.5L29.6901 131.5Z' fill='currentColor' />
                    <path d='M26.5301 115.6L8.83008 107.73L8.83008 105.81L29.6901 105.81L29.6901 107.92L14.0801 107.92L29.7001 114.92L29.7001 116.33L14.0801 123.33L29.7001 123.33L29.7001 125.4L8.84008 125.4L8.84008 123.4L26.5301 115.6Z' fill='currentColor' />
                    <path d='M29.6901 87.9309L20.9001 92.9309L20.9001 97.6009L29.6901 97.6009L29.6901 99.7109L8.83011 99.7109L8.83011 92.3809C8.81977 91.2134 9.10166 90.0617 9.65011 89.0309C10.1691 88.0676 10.9354 87.2599 11.8701 86.6909C12.7924 86.1216 13.8563 85.8236 14.9401 85.8309C16.2914 85.8109 17.6023 86.2918 18.6201 87.1809C19.6793 88.1065 20.4063 89.3533 20.6901 90.7309L29.6901 85.5009L29.6901 87.9309ZM10.7701 97.6009L19.0001 97.6009L19.0001 92.3709C19.0485 91.1969 18.6399 90.0499 17.8601 89.1709C17.4951 88.7723 17.0497 88.4556 16.5532 88.2418C16.0567 88.0281 15.5206 87.9221 14.9801 87.9309C14.4225 87.9129 13.8673 88.0117 13.3501 88.2209C12.8419 88.4411 12.3829 88.7607 12.0001 89.1609C11.6005 89.5911 11.2904 90.0964 11.0879 90.6475C10.8853 91.1985 10.7943 91.7844 10.8201 92.3709L10.7701 97.6009Z' fill='currentColor' />
                    <path d='M29.0001 77.4999C28.3602 78.6291 27.4044 79.5467 26.2501 80.1399C25.0099 80.7643 23.6385 81.0832 22.2501 81.0699L8.83008 81.0699L8.83008 78.9599L22.2101 78.9599C23.7658 79.0448 25.2935 78.5212 26.4701 77.4999C27.4834 76.4425 28.0492 75.0345 28.0492 73.5699C28.0492 72.1053 27.4834 70.6973 26.4701 69.6399C25.2966 68.6114 23.7685 68.0805 22.2101 68.1599L8.83008 68.1599L8.83008 66.0499L22.2101 66.0499C23.6053 66.0495 24.9792 66.393 26.2101 67.0499C27.3676 67.6255 28.3359 68.5208 29.0001 69.6299C29.6727 70.8076 30.018 72.1438 30.0001 73.4999C30.0355 74.8993 29.6899 76.2819 29.0001 77.4999Z' fill='currentColor' />
                    <path d='M28.23 59.4102C27.6293 60.0309 26.912 60.527 26.1192 60.8702C25.3264 61.2134 24.4738 61.3969 23.61 61.4102L23.61 59.3002C24.2264 59.2874 24.8341 59.1517 25.3973 58.901C25.9606 58.6503 26.4681 58.2896 26.89 57.8401C27.7034 56.8493 28.1171 55.5903 28.05 54.3101C28.1406 53.0868 27.7854 51.872 27.05 50.8902C26.7274 50.4939 26.3164 50.1789 25.85 49.9702C25.383 49.757 24.8732 49.6543 24.36 49.6702C23.6024 49.6368 22.8589 49.8823 22.27 50.3602C21.7254 50.8299 21.2859 51.4092 20.98 52.0601C20.5761 52.9577 20.2189 53.8756 19.91 54.8101C19.5691 55.9016 19.1514 56.9676 18.66 58.0002C18.2655 58.8124 17.6827 59.5186 16.96 60.0601C16.1015 60.6793 15.0571 60.9863 14 60.9302C12.9944 60.9535 12.0039 60.6819 11.1509 60.1487C10.2979 59.6156 9.61971 58.8443 9.20003 57.9302C8.70547 56.8664 8.46252 55.703 8.49003 54.5302C8.45965 53.3297 8.73859 52.1416 9.30003 51.0802C9.80632 50.1265 10.5726 49.3359 11.51 48.8002C12.4934 48.2496 13.5938 47.9411 14.72 47.9002L14.72 50.0102C13.5399 50.0265 12.4129 50.5039 11.58 51.3401C11.1826 51.7665 10.8758 52.269 10.6781 52.8173C10.4805 53.3656 10.3961 53.9483 10.43 54.5302C10.3642 55.6644 10.7204 56.7829 11.43 57.6702C11.7642 58.0316 12.1739 58.315 12.63 58.5002C13.0776 58.694 13.5626 58.7862 14.05 58.7701C14.7532 58.8158 15.4482 58.5984 16 58.1602C16.5174 57.7042 16.9243 57.1365 17.19 56.5002C17.57 55.6302 17.9 54.7302 18.19 53.8302C18.5223 52.7125 18.9333 51.6197 19.42 50.5601C19.8464 49.7362 20.4678 49.029 21.23 48.5002C22.1432 47.885 23.2301 47.58 24.33 47.6301C25.1038 47.5992 25.8748 47.7421 26.586 48.0484C27.2973 48.3548 27.9308 48.8167 28.44 49.4002C29.5503 50.8214 30.1017 52.6001 29.99 54.4002C30.0756 56.2352 29.4445 58.0317 28.23 59.4102Z' fill='currentColor' />
                    <path d='M28.2301 41.8301C27.631 42.453 26.914 42.9506 26.1209 43.294C25.3278 43.6373 24.4743 43.8196 23.6101 43.8301L23.6101 41.7201C24.2259 41.7092 24.8332 41.5753 25.3965 41.3263C25.9598 41.0773 26.4676 40.7182 26.8901 40.2701C27.6306 39.259 28.0405 38.0437 28.0638 36.7907C28.087 35.5376 27.7225 34.308 27.0201 33.2701C26.6945 32.877 26.2843 32.5625 25.8201 32.3501C25.3515 32.1418 24.8428 32.0394 24.3301 32.0501C23.5713 32.0204 22.8279 32.2694 22.2401 32.7501C21.705 33.2368 21.282 33.8339 21.0001 34.5001C20.6001 35.4001 20.2401 36.3201 19.9301 37.2501C19.5892 38.3448 19.1715 39.4141 18.6801 40.4501C18.2758 41.2393 17.6939 41.9239 16.9801 42.4501C16.1402 43.0512 15.1217 43.3507 14.0901 43.3001C13.0935 43.3115 12.1135 43.0449 11.2601 42.5301C10.3947 42.0012 9.70021 41.2338 9.26009 40.3201C8.76635 39.2596 8.52341 38.0996 8.55009 36.9301C8.51971 35.7296 8.79864 34.5416 9.36009 33.4801C9.86638 32.5264 10.6327 31.7358 11.5701 31.2001C12.5511 30.6424 13.6524 30.3302 14.7801 30.2901L14.7801 32.4001C13.5996 32.4243 12.4744 32.9045 11.6401 33.7401C11.243 34.1691 10.9358 34.6732 10.7365 35.2228C10.5373 35.7724 10.4501 36.3563 10.4801 36.9401C10.4099 38.0718 10.7668 39.1887 11.4801 40.0701C11.8003 40.437 12.196 40.7303 12.6401 40.9301C13.0877 41.1239 13.5726 41.2161 14.0601 41.2001C14.7859 41.2385 15.4997 41.0029 16.0601 40.5401C16.5676 40.0909 16.9733 39.5386 17.2501 38.9201C17.6201 38.0401 17.9601 37.1501 18.2501 36.2501C18.5796 35.1282 18.9907 34.032 19.4801 32.9701C19.8987 32.1218 20.5205 31.3901 21.2901 30.8401C22.2027 30.2236 23.29 29.9184 24.3901 29.9701C25.1636 29.9413 25.9339 30.0852 26.6448 30.3913C27.3557 30.6975 27.9895 31.1583 28.5001 31.7401C29.611 33.1606 30.1593 34.9407 30.0401 36.7401C30.0906 37.6661 29.9566 38.5929 29.6459 39.4667C29.3352 40.3405 28.8539 41.1439 28.2301 41.8301Z' fill='currentColor' />
                    <path d='M29.6901 22.8509L29.6901 24.9609L8.83008 24.9609L8.83008 22.8509L29.6901 22.8509Z' fill='currentColor' />
                    <path d='M29.6901 1.2404L29.6901 3.5004L24.3901 5.5004L24.3901 14.9804L29.6901 16.9804L29.6901 19.1504L8.83008 11.1504L8.83008 9.15039L29.6901 1.2404ZM22.4501 6.2404L11.8101 10.2404L22.4501 14.2404L22.4501 6.2404Z' fill='currentColor' />
                    <path d='M-9.22311e-08 131.31L0.83 129.37L5.67 131.48L4.84 133.42L-9.22311e-08 131.31Z' fill='#E21B25' />
                </svg>

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
                { menuItems && menuItems.length
                    ? menuItems.map(item => <A key={item.text} externalClass={`${router.asPath === item.link ? 'active' : ''} text--h4`}
                        href={item.link} text={item.text} />)
                    : ''
                }
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
                        <motion.div
                            animate={animateBreadcrumbs}
                            initial={{ x: 200 }}
                            variants={{ hidden: { x: -200 }, shown: { x: 0 } }}
                            transition={{ duration: 1 }}
                            className='bread__line' key={breadcrumb.href}>
                            <div className='bread__filler--1' />
                            <div className='bread__filler--2' />
                            <div className='bread__text'>
                                <A href={breadcrumb.href} text={breadcrumb.breadcrumb.toUpperCase()} />
                            </div>
                            <div className='bread__filler--3' />
                        </motion.div>
                    )
                })}
            </div>

            {transitors.map((transitor) => (
                <motion.div
                    animate={animate}
                    key={transitor.position}
                    transition={{ duration: 1, easings: ['easeIn', 'easeOut'] }}
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
                        transition={{ duration: 1, easings: ['easeIn', 'easeOut'] }}
                        className='transitor__image' >
                        <img src={transitor.image} alt='' />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}
