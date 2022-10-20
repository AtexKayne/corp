/* eslint-disable @next/next/no-img-element */
import A from "./A";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls, useDomEvent } from 'framer-motion'
import { menuItems } from './helpers/constants'
import { useRouter } from 'next/router'
// import MenuPreloader from "./MenuPreloader";

export default function MenuTransitor({ theme, preloaderState, setTheme, setContainerWidth, animateContent, className }) {
    const router = useRouter()
    const refTheme = useRef(theme)
    const isAnimated = useRef(false)
    const isMenuOpened = useRef(false)
    const animate = useAnimationControls()
    const animateBreadcrumbs = useAnimationControls()
    const animateWrapper = useAnimationControls()
    const animateImage = useAnimationControls()
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
        const linkPath = url.split('/')
        linkPath.shift()
        const pathArray = linkPath.map((path, i) => {
            return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') }
        })
        const newPosition = `-${(window.innerWidth - 121 - pathArray.filter(path => path.href !== '/').length * 50)}px`
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

    const clickHandler = async () => {
        if (!isMenuOpened.current) {
            isMenuOpened.current = true
            setTheme('ui-light')
            if (menuState === 'close') {
                setMenuState('open')
                animateContent.start('start')
                await showTransitor()
                animateNav.start('shown')
                animateImage.start('shown')
                await animateWrapper.start('fastShown')
                await animateWrapper.start('hidden')
                isMenuOpened.current = false
            } else {
                setMenuState('close')
                animateImage.start('hidden')
                await animateWrapper.start('smash')
                animateContent.start('end')
                await animateNav.start('hidden')
                animateWrapper.start('fastHidden')
                await hideTransitor()
                isMenuOpened.current = false
            }
        }
    }

    const clickNavHandler = async () => {
        setMenuState('awaiting')
        animateImage.start('hidden')
        await animateWrapper.start('smash')
        await animateNav.start('hidden')
        await animateWrapper.start('fastHidden')
        isMenuOpened.current = false
        setTimeout(() => setMenuState('close'), 200)
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
                <div onClick={clickHandler} className='menu__burger c-hover'>
                    <div /><div /><div />
                </div>
                {menuItems.map((item, id) => <A key={item.text} href={item.link} text={id} />)}
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
                {menuItems.map(item => <A key={item.text} externalClass={`${router.asPath === item.link? 'active' : ''} text--h4`} href={item.link} text={item.text} />)}
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
                            className='bread__text'
                            key={breadcrumb.href}>
                            <A href={breadcrumb.href} text={breadcrumb.breadcrumb.toUpperCase()} />
                        </motion.div>
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