import Image from 'next/image'
import Icon from '../../components/Icon'
import { debounce } from '../helpers/debounce'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../helpers/globalState'
import { motion, useAnimationControls } from 'framer-motion'
import style from '/styles/module/Product/Product-gallery.module.scss'

// @TODO Переписать фунуции переключения слайдов по свайпу.
export default function Gallery({ images = [], alt = '' }) {
    const [activeImage, setActiveImage] = useState(images[0].gallery)
    const [fullScreenImage, setFullScreenImage] = useState('')
    const [previewHeight, setPreviewHeight] = useState(100)
    const [navDisabled, setNavDisabled] = useState('up')
    const [modalOpen, setModalOpen] = useState(false)
    const animateActiveImage = useAnimationControls()
    const animatePreview = useAnimationControls()
    const animateDrag = useAnimationControls()
    const refFullScreenImage = useRef(null)
    const refPreviewPosition = useRef(0)
    const refGalleryOffset = useRef(0)
    const refModalOpen = useRef(false)
    const refGallery = useRef(null)
    const refModal = useRef(null)

    const updateActiveImage = async image => {
        await animateActiveImage.start({ opacity: 0, transition: { duration: 0.5 } })
        setActiveImage(image)
        await animateActiveImage.start({ opacity: 1, transition: { duration: 0.5 } })
    }

    const choseActive = (image, index = 0) => {
        updateActiveImage(image)
        const imageList = refModal.current.querySelectorAll(`.${style.imageModal}`)
        const offsetTop = imageList[index].offsetTop
        refModal.current.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        })
    }

    const slidePreview = slide => {
        if (slide === 'reset') {
            refPreviewPosition.current = 0
            animatePreview.start({ y: 0, transition: { duration: 0.5 } })
            setNavDisabled('up')
            return
        }
        const slideTo = slide === 'down' ? -1 : 1
        refPreviewPosition.current = refPreviewPosition.current + slideTo * previewHeight
        const checkPosition = Math.abs(refPreviewPosition.current / previewHeight)

        if (checkPosition >= images.length - 4 && slide === 'down') setNavDisabled('down')
        else if (checkPosition === 0 && slide === 'up') setNavDisabled('up')
        else setNavDisabled(false)

        animatePreview.start({ y: refPreviewPosition.current, transition: { duration: 0.5 } })
    }

    const openModal = () => {
        setModalOpen(true)
        refModalOpen.current = true
        globalState.body.toggleClass('overflow-hidden')
    }

    const modalClose = () => {
        setModalOpen(false)
        refModalOpen.current = false
        refFullScreenImage.current.style.opacity = '0'
        setFullScreenImage(false)
        globalState.body.toggleClass('overflow-hidden')
    }

    const nextHandler = () => {
        const isTouch = window.innerWidth < globalState.sizes.lg
        const index = images.findIndex(image => image.gallery === activeImage)
        const nextImageObj = images[index + 1]
        if (!nextImageObj) {
            const index = images.findIndex(image => image.gallery === activeImage)
            animateDrag.start({ x: window.innerWidth * index * -1, transition: { duration: 0.1 } })
            if (isTouch) return
        }
        const nextImage = nextImageObj ? nextImageObj.gallery : images[0].gallery
        const scrollIndex = nextImageObj ? index + 1 : 0
        if (!isTouch) updateActiveImage(nextImage)
        else setActiveImage(nextImage)
        animateDrag.start({ x: window.innerWidth * scrollIndex * -1, transition: { duration: 0.3 } })
    }

    const prevHandler = () => {
        const index = images.findIndex(image => image.gallery === activeImage)
        const nextImageObj = images[index - 1]
        if (!nextImageObj) {
            const index = images.findIndex(image => image.gallery === activeImage)
            animateDrag.start({ x: window.innerWidth * index * -1, transition: { duration: 0.1 } })
            return
        }
        const nextImage = nextImageObj ? nextImageObj.gallery : images[images.length - 1].gallery
        const scrollIndex = nextImageObj ? index - 1 : images.length - 1
        setActiveImage(nextImage)
        animateDrag.start({ x: window.innerWidth * scrollIndex * -1, transition: { duration: 0.3 } })
    }

    const dragEndHandler = (_, info) => {
        if (typeof window === 'undefined' || window.innerWidth > globalState.sizes.lg) return
        const offsetX = Math.abs(info.offset.x)
        const offsetY = Math.abs(info.offset.y)

        if (offsetX > 60 && offsetY < 90) {
            if (info.offset.x < 0) nextHandler()
            else prevHandler()
        } else {
            const index = images.findIndex(image => image.gallery === activeImage)
            animateDrag.start({ x: window.innerWidth * index * -1, transition: { duration: 0.1 } })
        }
        // animateDrag.start({ x: 0, transition: { duration: 0.3 } })
    }

    useEffect(() => {
        // Gallery settings
        // setActiveImage(images[0].gallery)
        const rect = refGallery.current.getBoundingClientRect()
        refGalleryOffset.current = rect.x
        const windowInnerWidth = window.innerWidth
        if (windowInnerWidth < globalState.sizes.xxxl && windowInnerWidth >= globalState.sizes.sm) {
            refGallery.current.style.left = `${-refGalleryOffset.current}px`
            refGallery.current.style.width = `calc(100% + ${refGalleryOffset.current}px)`
        }

        if (windowInnerWidth >= globalState.sizes.xxxl) {
            setPreviewHeight(100)
        } else if (windowInnerWidth >= globalState.sizes.xxl && windowInnerWidth < globalState.sizes.xxxl) {
            setPreviewHeight(82)
        } else if (windowInnerWidth >= globalState.sizes.xl && windowInnerWidth < globalState.sizes.xxl) {
            setPreviewHeight(60)
        }

        const resizeHandler = () => {
            const windowWidth = window.innerWidth
            if (windowWidth < globalState.sizes.sm) return
            if (windowWidth >= globalState.sizes.xxxl) {
                refGallery.current.style.left = '0'
                refGallery.current.style.width = '100%'
                return
            }

            if (windowWidth >= globalState.sizes.xxxl) {
                setPreviewHeight(100)
            } else if (windowWidth >= globalState.sizes.xxl && windowWidth < globalState.sizes.xxxl) {
                setPreviewHeight(82)
            } else if (windowWidth >= globalState.sizes.xl && windowWidth < globalState.sizes.xxl) {
                setPreviewHeight(60)
            }

            const rect = refGallery.current.getBoundingClientRect()
            refGalleryOffset.current = refGalleryOffset.current - rect.x
            refGallery.current.style.left = `${refGalleryOffset.current}px`
            const galleryWidth = windowWidth >= globalState.sizes.lg
                ? `calc(100% + ${-refGalleryOffset.current}px)`
                : '100vw'
            refGallery.current.style.width = galleryWidth

            const index = images.findIndex(image => image.gallery === activeImage)
            animateDrag.start({ x: window.innerWidth * index * -1, transition: { duration: 0 } })

            refPreviewPosition.current = 0
            animatePreview.start({ y: 0, transition: { duration: 0 } })
        }

        const debounceResize = debounce(resizeHandler, 40)

        window.addEventListener('resize', debounceResize)

        // Modal settings
        const imageList = refModal.current.querySelectorAll(`.${style.imageModal}`)
        const imageListArr = Array.from(imageList)
        const observers = []
        const observeHandler = entries => {
            if (!refModalOpen.current) return
            const entry = entries[0]
            if (entry.isIntersecting) {
                const index = imageListArr.indexOf(entry.target)
                setActiveImage(images[index].gallery)
            }
        }

        imageList.forEach(image => {
            const observer = new IntersectionObserver(observeHandler, { threshold: 0.5 });
            observer.observe(image)
            observers.push(observer)
        })

        return () => {
            if (observers.length) {
                observers.forEach(observer => observer.disconnect())
            }
            window.removeEventListener('resize', debounceResize)
        }
    }, [])

    useEffect(() => {
        if (window.innerWidth < globalState.sizes.xl) return
        const activeIndex = images.findIndex(image => image.gallery === activeImage)
        const condition = Math.abs(refPreviewPosition.current / previewHeight) - activeIndex
        if (condition <= -4) slidePreview('down')
        else if (condition > 0) slidePreview('reset')
    }, [activeImage])

    const loadHandler = () => {
        setTimeout(() => {
            refFullScreenImage.current.style.opacity = '1'
            const imageWidth = refFullScreenImage.current.clientWidth
            const windowWidth = window.innerWidth
            const scrollTo = imageWidth / 2 - windowWidth / 2
            refFullScreenImage.current.parentElement.scroll(scrollTo, 0)
        }, 100)
        refFullScreenImage.current.removeEventListener('load', loadHandler)
    }

    const openFullImage = (event, index) => {
        if (window.innerWidth >= globalState.sizes.lg) return
        const target = event.target.closest(`.${style.imageModal}`)

        if (fullScreenImage) {
            refFullScreenImage.current.style.opacity = '0'
            setFullScreenImage(false)
        } else {
            target.style.transform = 'scale(1.5)'
            target.style.zIndex = '1'
            refFullScreenImage.current.addEventListener('load', loadHandler)
            setTimeout(() => {
                setFullScreenImage(images[index].full)
                target.style.transform = 'scale(1)'
                target.style.zIndex = ''
            }, 300)
        }
    }

    const scaleDownHandler = () => {
        refFullScreenImage.current.style.opacity = '0'
        setFullScreenImage(false)
    }

    return (
        <>
            <div ref={refGallery} className={style.gallery}>
                <div className={`${style.nav}  ${images.length <= 1 ? 'is-decorative' : ''} is-hidden--lg-down`}>
                    {images.length > 4
                        ? <div data-disabled={navDisabled === 'up'} onClick={() => slidePreview('up')} className={style.navPrev}>
                            <Icon name='chevronUp' width='20' height='20' />
                        </div>
                        : null
                    }

                    <div className={`${style.previews}`}>
                        {
                            images.length > 1
                                ? <motion.div animate={animatePreview}>
                                    {images.map((image, index) => (
                                        <div onClick={() => choseActive(image.gallery, index)} data-active={activeImage === image.gallery} key={image.gallery} className={style.imagePreview}>
                                            <Image src={image.preview} width='88' height='88' alt={alt} />
                                        </div>
                                    ))}
                                </motion.div>
                                : null
                        }
                    </div>

                    {images.length > 4
                        ? <div data-disabled={navDisabled === 'down'} onClick={() => slidePreview('down')} className={style.navNext}>
                            <Icon name='chevronDown' width='20' height='20' />
                        </div>
                        : null
                    }
                </div>

                <div className={`${style.navTablet} is-hidden--xl-up`}>
                    {images.map(image => (
                        <div key={image.full} data-active={image.gallery === activeImage} />
                    ))}
                </div>

                <motion.div
                    onClick={openModal}
                    transition={{ duration: 0.3 }}
                    animate={animateActiveImage}
                    className={`${style.imageMain} is-hidden--md-down`}>
                    <Image src={activeImage} layout='fill' alt={alt} />
                </motion.div>

                <div onClick={openModal} className={`${style.imageMain} is-hidden--lg-up`}>
                    <motion.div
                        drag='x'
                        animate={animateDrag}
                        onDragEnd={dragEndHandler}
                        className={style.imageDragCntainer}
                    // dragConstraints={{ left: 0, right: 0 }}
                    >

                        {images.map(image => (
                            <div key={image.gallery} className={style.imageDrag}>
                                <Image src={image.gallery} layout='fill' alt={alt} />
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className={style.labels}>
                    <div className='label label--sucess mb-0.6'>50%</div>
                    <div className='label label--info mb-0.6'>
                        <Icon name='new' width='22' height='22' />
                    </div>
                    <div className='label label--warning mb-0.6'>
                        <Icon name='fire' width='22' height='22' />
                    </div>
                    <div className='label label--danger mb-0.6'>
                        <Icon name='verified' width='22' height='22' />
                    </div>
                </div>

                {
                    images.length > 1
                        ? <div onClick={nextHandler} className={`${style.nextCol} is-hidden--md-down`} />
                        : null
                }

            </div>

            <div ref={refModal} data-open={modalOpen} className={style.galleryModal}>
                <div className='container p-relative'>
                    <div className={`${style.alt} text--a4 text--upper text--bold py-2 pr-4`}>
                        {alt}
                    </div>
                    <div className={`${style.modalHeader}`}>
                        <div className={`${style.closeBtn} c-pointer`} onClick={modalClose}><Icon name='close' width='20' height='20' /></div>
                    </div>

                    {images.map((image, index) => (
                        <div onClick={event => openFullImage(event, index)} key={image.full} className={style.imageModal}>
                            <Image src={image.full} width='1496' height='919' alt={alt} />
                        </div>
                    ))}

                    <div className={`${style.nav} is-hidden--lg-down`}>
                        {images.length > 4
                            ? <div data-disabled={navDisabled === 'up'} onClick={() => slidePreview('up')} className={style.navPrev}>
                                <Icon name='chevronUp' width='20' height='20' />
                            </div>
                            : null
                        }

                        <div className={`${style.previews}`}>
                            {
                                images.length > 1
                                    ? <motion.div animate={animatePreview}>
                                        {images.map((image, index) => (
                                            <div onClick={() => choseActive(image.gallery, index)} data-active={activeImage === image.gallery} key={image.gallery} className={style.imagePreview}>
                                                <Image src={image.preview} width='88' height='88' alt={alt} />
                                            </div>
                                        ))}
                                    </motion.div>
                                    : null
                            }
                        </div>

                        {images.length > 4
                            ? <div data-disabled={navDisabled === 'down'} onClick={() => slidePreview('down')} className={style.navNext}>
                                <Icon name='chevronDown' width='20' height='20' />
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>

            <div data-active={!!fullScreenImage} className={style.imageFullScreen}>
                <div
                    onClick={scaleDownHandler}
                    className={`${style.alt} text--a4 text--upper text--bold py-2 pr-4`}>
                    <Icon name='chevronLeft' width='20' height='20' external={'mr-0.5'} />
                    {alt}
                </div>
                <div className={`${style.modalHeader}`}>
                    <div className={`${style.closeBtn} c-pointer`} onClick={modalClose}><Icon name='close' width='20' height='20' /></div>
                </div>
                <div className={style.dragContainer}>
                    <img 
                        ref={refFullScreenImage}
                        style={{ opacity: 0 }}
                        width={fullScreenImage ? '' : 1}
                        height={fullScreenImage ? '' : 1}
                        src={fullScreenImage ? fullScreenImage : '/icons/icon-empty.svg'}
                        alt={alt} />
                </div>

            </div>
        </>
    )
}