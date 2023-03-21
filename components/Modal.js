import Icon from './Icon'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { globalState } from './helpers/globalState'
import { motion, useAnimationControls, useDragControls } from 'framer-motion'

export default function Modal() {
    const [data, setData] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isZero, setIsZero] = useState(false)
    const [template, setTemplate] = useState(null)
    const [isMobile, setIsMobile] = useState(false)

    const animateContent = useAnimationControls()
    const refContent = useRef(null)

    const dragEndHandler = (event, info) => {
        if (isZero || !isMobile) return
        if (Math.abs(info.offset.y) < 60) return
        if (event.target.closest('.modal-scroll-content')) return
        setIsOpen(false)
    }

    useEffect(() => {
        globalState.modal = {
            setIsOpen: open => { setTimeout(() => setIsOpen(open), 120) },
            setTemplate,
            setIsZero,
            setData
        }
    }, [])

    // @TODO REWIRITE!
    useEffect(() => {
        const mobile = window.innerWidth < globalState.sizes.sm
        setIsMobile(mobile)
        const duration = mobile ? 0.3 : 0.5

        if (isOpen) {
            const pos = window.innerWidth >= globalState.sizes.sm || isZero
                ? { x: 0, y: 0, transition: { duration, ease: 'easeInOut' } }
                : { y: 0, x: 0, transition: { duration, ease: 'easeInOut' } }
            const posStart = window.innerWidth >= globalState.sizes.sm || isZero
                ? { x: '100%', y: 0, transition: { duration: 0 } }
                : { y: '120%', x: 0, transition: { duration: 0 } }

            animateContent.start(posStart).then(() => {
                animateContent.start(pos)
            })
            globalState.body.addClass('overflow-hidden')
        } else {
            const posStart = window.innerWidth >= globalState.sizes.sm || isZero
                ? { x: '100%', y: 0, transition: { duration, ease: 'easeInOut' } }
                : { y: '120%', x: 0, transition: { duration, ease: 'easeInOut' } }

            animateContent.start(posStart)

            setTimeout(() => {
                setTemplate(null)
                globalState.body.removeClass('overflow-hidden')
            }, 500)
        }
    }, [isOpen])


    return (
        <div data-open={isOpen} className='modal'>
            <div onClick={() => setIsOpen(false)} className='modal__layout' />
            <motion.div
                ref={refContent}
                dragElastic={0.5}
                animate={animateContent}
                onDragEnd={dragEndHandler}
                drag={isZero || !isMobile ? false : 'y'}
                dragConstraints={{ top: 0, bottom: 0 }}
                className={`${isZero ? 'modal__content--full-height' : 'modal__content'}`}>

                <div onClick={() => setIsOpen(false)} className='modal__close'>
                    <Icon name='close' width='20' height='20' />
                </div>
                <LoadTemplate data={data} name={template} />
            </motion.div>
        </div>
    )
}

function LoadTemplate({ name, data }) {
    const [LoadedTemplate, setLoadedTemplate] = useState(false)
    const loadTemplate = templateName => {
        const dynamicComponents = {
            auth: dynamic(() => import('./usefull/templates/ModalAuth'), { ssr: false }),
            profi: dynamic(() => import('./usefull/templates/ModalProfi'), { ssr: false }),
            colors: dynamic(() => import('./usefull/templates/ModalColors'), { ssr: false }),
            filters: dynamic(() => import('./usefull/templates/ModalFilters'), { ssr: false }),
            priceInfo: dynamic(() => import('./usefull/templates/ModalPriceInfo'), { ssr: false }),
            promoAbout: dynamic(() => import('./usefull/templates/ModalPromoAbout'), { ssr: false }),
            brandAbout: dynamic(() => import('./usefull/templates/ModalBrandAbout'), { ssr: false }),
            colorCircle: dynamic(() => import('./usefull/templates/ModalColorCircle'), { ssr: false }),
            colorsSecond: dynamic(() => import('./usefull/templates/ModalColorsSecond'), { ssr: false }),
        }
        setLoadedTemplate(dynamicComponents[templateName])
    }

    useEffect(() => {
        loadTemplate(name)
    }, [name])

    return (
        <>
            {LoadedTemplate ? <LoadedTemplate data={data} /> : null}
        </>
    )
}