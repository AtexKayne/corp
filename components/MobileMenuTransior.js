import { useState, useEffect } from "react"
import { motion, useAnimationControls } from 'framer-motion'
import { useRouter } from 'next/router'
import Image from "next/image"
import A from "./A"
import { menuItems } from './helpers/constants'
import Search from "./Search"
import MenuContacts from "./MenuContacts"

export default function MobileMenuTransitor({ className }) {
    const [menuState, setMenuState] = useState('close')
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const animateTransitor = useAnimationControls()
    const animateFooter = useAnimationControls()
    const router = useRouter()

    // useEffect(() => {
    //     if (!isAnimated.current) {
    //         breadcrumbsSetting()
    //         setTimeout(hideTransitor, 100)
    //     }

    //     const startHandler = (url) => {
    //         if (url !== router.asPath) {
    //             setTheme('ui-light')
    //             refTheme.current = 'ui-light'
    //             animateContent.start('start')
    //             isAnimated.current = showTransitor()
    //         }
    //     }
    //     const completeHandler = (url) => {
    //         if (url === router.asPath && isAnimated.current) {
    //             breadcrumbsSetting(url)
    //             // isAnimated.current.then(hideTransitor)
    //         }
    //     }

    //     router.events.on('routeChangeStart', startHandler)
    //     router.events.on('routeChangeComplete', completeHandler)
    //     router.events.on('routeChangeError', completeHandler)

    //     return () => {
    //         router.events.off('routeChangeStart', startHandler)
    //         router.events.off('routeChangeComplete', completeHandler)
    //         router.events.off('routeChangeError', completeHandler)
    //     }
    // }, [router])


    const breadcrumbsSetting = (url = router.asPath) => {
        const linkPath = url.split('/')
        linkPath.shift()
        const pathArray = linkPath.map((path, i) => {
            return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') }
        })
        setBreadcrumbs(pathArray)
    }

    const menuClickHandler = async () => {
        if (menuState !== 'menu') {
            await animateFooter.start({ y: 0, transition: { duration: 0.5 } })
            await animateTransitor.start({ y: '0vh', borderWidth: [1, 15, 1], transitionTimingFunction: 'ease', transition: { duration: 1 } })
            setMenuState('menu')
            animateTransitor.start({ y: '100vh', borderWidth: [1, 15, 1], transitionTimingFunction: 'ease', transition: { duration: 1 } })
        } else {
            await animateTransitor.start({
                y: '0vh', borderWidth: [1, 15, 1],
                transitionTimingFunction: 'ease',
                transition: { duration: 1 }
            })
            setMenuState('close')
            await animateTransitor.start({
                y: '100vh', borderWidth: [1, 15, 1],
                transitionTimingFunction: 'ease',
                transition: { duration: 1 }
            })
            animateFooter.start({ y: 150, transition: { duration: 0.5 } })
        }
    }

    const additionClickHandler = async type => {
        if (type !== menuState) {
            await animateTransitor.start({
                y: '0vh', borderWidth: [1, 15, 1],
                transitionTimingFunction: 'ease',
                transition: { duration: 1 }
            })
            setMenuState(type)
            animateTransitor.start({
                y: '100vh', borderWidth: [1, 15, 1],
                transition: { duration: 1, type: 'tween' }
            })
        } else {
            await animateTransitor.start({
                y: '0vh', borderWidth: [1, 15, 1],
                transition: { duration: 1, type: 'tween' }
            })
            setMenuState('close')
            await animateTransitor.start({
                y: '100vh', borderWidth: [1, 15, 1],
                transition: { duration: 1, type: 'tween' }
            })
            animateFooter.start({ y: 150, transition: { duration: 0.5 } })
        }
    }

    return (
        <div data-state={menuState} className='menu-mobile'>
            <div className='menu-mobile__top'>
                <div className={`menu-mobile__additional ${menuState === 'close' ? 'is-invisible' : ''}`}>
                    <div onClick={() => additionClickHandler('search')} className={`icon ${menuState !== 'search' ? 'icon--search' : 'icon--close'} c-hover`} />
                    <div onClick={() => additionClickHandler('lang')} className={`icon ${menuState !== 'lang' ? 'icon--lang' : 'icon--close'} c-hover`} />
                    <div onClick={() => additionClickHandler('phone')} className={`icon ${menuState !== 'phone' ? 'icon--phone' : 'icon--close'} c-hover`} />
                </div>

                <div onClick={menuClickHandler} className={`icon ${menuState !== 'menu' ? 'icon--menu' : 'icon--close'} c-hover`} />
            </div>

            <nav className='menu-mobile__nav'>
                {menuItems.map(item => <A key={item.text} externalClass={`${router.asPath === item.link ? 'active' : ''} text--t1`} href={item.link} text={item.text} />)}
            </nav>

            <div className='menu-mobile__search'>
                <Search />
            </div>

            <div className='menu-mobile__lang text--h4'>
                <div className='c-hover' data-active='true'>Русский</div>
                <div className='c-hover'>English</div>
                <div className='c-hover'>Türkçe</div>
                <div className='c-hover'>中文</div>
            </div>

            <div className='menu-mobile__phone text--h4'>
                <MenuContacts />
            </div>

            <div className='menu-mobile__mechs'>
                <Image src='/assets/img/transitor-mobile-top.svg' width='255' height='255' alt='simrussia logo' />
                <Image src='/assets/img/transitor-mobile-center.svg' width='85' height='85' alt='simrussia logo' />
                <Image src='/assets/img/transitor-mobile-bottom.svg' width='164' height='164' alt='simrussia logo' />
            </div>

            <motion.div animate={animateFooter} initial={{ y: 150 }} className='menu-mobile__footer'>
                <div className='menu-mobile__footer__nav'>
                    <Image src='/assets/img/logo-mobile.svg' width='152' height='31' alt='simrussia logo' />

                    <div className='text--t2'>
                        <a href='#' className='c-hover'>VK</a>
                        <a href='#' className='c-hover'>TG</a>
                    </div>
                </div>
                <div className='mobile-bread'>
                    {breadcrumbs.map((breadcrumb, i) => {
                        return (
                            <div className='mobile-bread__line' key={breadcrumb.href}>
                                <A href={breadcrumb.href} text={breadcrumb.breadcrumb.toUpperCase()} />
                            </div>
                        )
                    })}
                </div>
            </motion.div>

            <motion.div animate={animateTransitor} initial={{ y: '100vh' }} className='menu-mobile__transitor' />
        </div>
    )
}