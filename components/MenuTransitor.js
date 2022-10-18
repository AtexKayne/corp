/* eslint-disable @next/next/no-img-element */
import A from "./A";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls } from 'framer-motion'
import { menuItems } from './helpers/constants'
import { useRouter } from 'next/router'
// import MenuPreloader from "./MenuPreloader";

export default function MenuTransitor({ setTheme, className }) {
    const router = useRouter()
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
            image: '/assets/img/transitor-right.svg'
        },
        {
            position: 'top',
            initial: { y: '-100vh' },
            variants: {
                shown: { y: '-50vh' },
                hidden: { y: '-100vh' },
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
            image: '/assets/img/transitor-bottom.svg'
        },
        {
            position: 'left',
            initial: { x: leftPosition },
            variants: {
                shown: { x: '-40vw' },
                hidden: { x: leftPosition },
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

    const hideTransitor = () => animate.start('hidden').then(() => animateBreadcrumbs.start('shown'))
    const showTransitor = () => {
        animateBreadcrumbs.start('hidden')
        return animate.start('shown')
    }

    const clickHandler = async () => {
        if (!isMenuOpened.current) {
            isMenuOpened.current = true
            if (menuState === 'close') {
                setMenuState('open')
                await showTransitor()
                animateNav.start('shown')
                animateImage.start('shown')
                await animateWrapper.start('shown')
                await animateWrapper.start('hidden')
                isMenuOpened.current = false
            } else {
                setMenuState('close')
                animateImage.start('hidden')
                await animateWrapper.start('smash')
                await animateNav.start('hidden')
                animateWrapper.start('fastHidden')
                await hideTransitor()
                isMenuOpened.current = false
            }
        }
    }

    const clickNavHandler = async () => {
        setMenuState('close')
        animateImage.start('hidden')
        await animateWrapper.start('smash')
        await animateNav.start('hidden')
        animateWrapper.start('fastHidden')
        await hideTransitor()
        isMenuOpened.current = false
    }

    useEffect(() => {
        if (isAnimated.current) isAnimated.current.then(hideTransitor)
    }, [leftPosition, breadcrumbs])

    useEffect(() => {
        if (!isAnimated.current) {
            breadcrumbsSetting()
            setTimeout(hideTransitor, 100)
        }

        const startHandler = (url) => {
            if (url !== router.asPath) {
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
                <div onClick={ clickHandler } className='menu__burger c-hover'>
                    <div /><div /><div />
                </div>
                {menuItems.map((item, id) => <A key={item.text} href={item.link} text={id} />)}
            </div>

            <motion.nav
                onClick={ clickNavHandler }
                animate={animateNav}
                initial={{x: '-100vw', zIndex: 0}}
                transition={{duration: 0}}
                variants={{
                    shown: { x: '-40vw', zIndex: 4, transition: {delay: 1.5, duration: 0} },
                    hidden: { zIndex: 0, x: '-100vw' }
                }}
                className='menu__nav'>
                { menuItems.map( item => <A key={item.text} externalClass='text--h4' href={item.link} text={item.text} /> )}
                <motion.img 
                    animate={animateImage}
                    variants={{shown: {opacity: 1}, hidden: {opacity: 0}}}
                    transition={{duration: 1}}
                    src={transitors[3].image}
                    className='menu__nav__image' alt='' />
            </motion.nav>

            <motion.div
                animate={animateWrapper}
                initial={{x: '-40vw', zIndex: 0}}
                variants={{
                    shown: { x: '-40vw', zIndex: 0 },
                    hidden: { zIndex: [4, 4], x: ['-40vw', '-40vw', '-100vw'] },
                    smash: {zIndex: 4, x: '-40vw'},
                    fastHidden: {zIndex: 0, x: '-100vw', transition: {duration: 0}}
                }}
                transition={{duration: 1}}
                className='menu__wrapper'>
            </motion.div>

            

            <div className='bread'>
                {breadcrumbs.map((breadcrumb, i) => {
                    return (
                        <motion.div 
                            animate={animateBreadcrumbs}
                            initial={{x: 200}}
                            variants={{hidden: {x: -200}, shown: {x: 0}}}
                            transition={{duration: 1}}
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
                    transition={{ duration: 2 }}
                    initial={transitor.initial}
                    variants={transitor.variants}
                    className={`transitor transitor--${transitor.position}`}>
                    <motion.div
                        animate={animate}
                        variants={{ shown: { width: '8px' }, hidden: { width: '1px' } }}
                        initial={{ width: '1px' }}
                        className='transitor__line' />
                    <motion.img 
                        animate={animateImage}
                        variants={{shown: {opacity: 1}, hidden: {opacity: 0}}}
                        transition={{duration: 1}}
                        src={transitor.image}
                        className='transitor__image' alt='' />
                </motion.div>
            ))}
        </div>
    )
}