import Icon from './Icon'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { globalState } from './helpers/globalState'
import { motion, useAnimationControls, useDragControls } from 'framer-motion'

export default function Modal() {
    const [isOpen, setIsOpen] = useState(false)
    const [isZero, setIsZero] = useState(false)
    const [template, setTemplate] = useState(null)
    const [isMobile, setIsMobile] = useState(null)
    const [isFullHeight, setIsFullHeight] = useState(false)

    const animateContent = useAnimationControls()
    const controls = useDragControls()
    const refContent = useRef(null)

    const startDrag = event => {
        if (isFullHeight || !isMobile) return
        if (window.innerWidth >= globalState.sizes.sm) return
        controls.start(event)
    }

    const dragEndHandler = (_, info) => {
        if (isFullHeight) return
        if (Math.abs(info.offset.y) > 60 && window.innerWidth < globalState.sizes.sm) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        globalState.modal = {
            setIsOpen: open => { setTimeout(() => setIsOpen(open), 120) },
            setTemplate,
            setIsZero
        }

        let observer
        if (refContent.current) {
            const config = {
                attributes: false,
                childList: true,
                subtree: false
            }
            const callback = info => {
                const value = info[0]
                // if (window.innerWidth >= globalState.sizes.sm) return
                if (!value.addedNodes || !value.addedNodes.length) return
                setIsFullHeight(value.addedNodes[0].classList.contains('full-height'))
            }

            observer = new MutationObserver(callback)
            observer.observe(refContent.current, config)
        }

        return () => {
            if (observer) observer.disconnect()
        }
    }, [])

    // @TODO REWIRITE!
    useEffect(() => {
        const mobile = window.innerWidth < globalState.sizes.sm
        const duration = mobile ? 0.3 : 0.5

        if (isOpen) {
            setIsMobile(mobile)
            const pos = window.innerWidth >= globalState.sizes.sm || isZero
                ? { x: 0, y: 0, transition: { duration: duration, ease: 'easeInOut' } }
                : { y: 0, x: 0, transition: { duration: duration, ease: 'easeInOut' } }
            const posStart = window.innerWidth >= globalState.sizes.sm || isZero
                ? { x: '100%', y: 0, transition: { duration: 0 } }
                : { y: '120%', x: 0, transition: { duration: 0 } }

            animateContent.start(posStart).then(() => {
                animateContent.start(pos)
            })
            globalState.body.addClass('overflow-hidden')
        } else {
            const posStart = window.innerWidth >= globalState.sizes.sm || isZero
                ? { x: '100%', y: 0, transition: { duration: duration, ease: 'easeInOut' } }
                : { y: '120%', x: 0, transition: { duration: duration, ease: 'easeInOut' } }

            animateContent.start(posStart)

            setTimeout(() => {
                setTemplate(null)
                setIsFullHeight(false)
                globalState.body.removeClass('overflow-hidden')
                setIsZero(false)
            }, 500)
        }
    }, [isOpen])


    return (
        <div data-open={isOpen} className='modal'>
            <div onClick={() => setIsOpen(false)} className='modal__layout' />
            <motion.div
                ref={refContent}
                dragElastic={0.5}
                dragControls={controls}
                animate={animateContent}
                onPointerDown={startDrag}
                onDragEnd={dragEndHandler}
                dragConstraints={{ top: 0, bottom: 0 }}
                drag={isFullHeight || isZero ? false : 'y'}
                className={`${isFullHeight ? 'modal__content--full-height' : 'modal__content'}`}>

                <div onClick={() => setIsOpen(false)} className='modal__close'>
                    <Icon name='close' width='20' height='20' />
                </div>
                <LoadTemplate name={template} />
            </motion.div>
        </div>
    )
}

function LoadTemplate({ name }) {
    const [LoadedTemplate, setLoadedTemplate] = useState(false)
    const loadTemplate = templateName => {
        const dynamicComponents = {
            profi: dynamic(() => import('./usefull/templates/ModalProfi'), { ssr: false }),
            colors: dynamic(() => import('./usefull/templates/ModalColors'), { ssr: false }),
            priceInfo: dynamic(() => import('./usefull/templates/ModalPriceInfo'), { ssr: false }),
            notification: dynamic(() => import('./usefull/templates/ModalNotification'), { ssr: false }),
            colorsSecond: dynamic(() => import('./usefull/templates/ModalColorsSecond'), { ssr: false }),
        }
        setLoadedTemplate(dynamicComponents[templateName])
    }

    useEffect(() => {
        loadTemplate(name)
    }, [name])

    return (
        <>
            {LoadedTemplate ? <LoadedTemplate /> : null}
        </>
    )
}