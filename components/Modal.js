import Icon from './Icon'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { globalState } from './helpers/globalState'

export default function Modal() {
    const [isOpen, setIsOpen] = useState(false)
    const [template, setTemplate] = useState(null)
    const [isFullHeight, setIsFullHeight] = useState(false)
    const refContent = useRef(null)

    const dragEndHandler = (_, info) => {
        if (isFullHeight) return
        if (Math.abs(info.offset.y) > 60 && window.innerWidth < globalState.sizes.sm) {
            setTimeout(() => setIsOpen(false), 300)
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
                if (window.innerWidth >= globalState.sizes.sm) return
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
            globalState.body.addClass('overflow-hidden')
        } else {
            globalState.body.removeClass('overflow-hidden')
            setTimeout(() => {
                setTemplate(null)
                setIsFullHeight(false)
            }, 300)
        }
    }, [isOpen])


    return (
        <div data-open={isOpen} className='modal'>
            <div className='modal__layout' />
            <motion.div
                drag='y'
                ref={refContent}
                dragElastic={0.5}
                className={`modal__content ${isFullHeight ? 'modal__content--full-height' : ''}`}
                onDragEnd={dragEndHandler}
                dragConstraints={{ top: 0, bottom: 0 }}>

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