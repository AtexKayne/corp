import Icon from './Icon'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react'
import { globalState } from './helpers/globalState'
import { motion, useAnimationControls, useDragControls } from 'framer-motion'

export default function Modal() {
    const [isOpen, setIsOpen] = useState(false)
    const [template, setTemplate] = useState(null)
    const [isFullHeight, setIsFullHeight] = useState(false)
    const refContent = useRef(null)
    const animateContent = useAnimationControls()
    const controls = useDragControls()

    const startDrag = event => {
        if (isFullHeight) return
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
            setIsOpen,
            setTemplate
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



    useEffect(() => {
        if (isOpen) {
            const pos = window.innerWidth >= globalState.sizes.sm
                ? { x: 0, y: 0, transition: { duration: 0.6, ease: 'easeIn', delay: 0.3 } }
                : { y: 0, x: 0, transition: { duration: 0.6, ease: 'easeIn', delay: 0.3 } }

            globalState.body.addClass('overflow-hidden')
            animateContent.start(pos)
        } else {
            const pos = window.innerWidth >= globalState.sizes.sm
                ? { x: '100%', y: 0, transition: { duration: 0.6, ease: 'easeIn', delay: 0 } }
                : { y: '100%', x: 0, transition: { duration: 0.6, ease: 'easeIn', delay: 0 } }

            animateContent.start(pos)

            setTimeout(() => {
                setTemplate(null)
                setIsFullHeight(false)
                globalState.body.removeClass('overflow-hidden')
            }, 600)
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
                drag={isFullHeight ? false : 'y'}
                dragConstraints={{ top: 0, bottom: 0 }}
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