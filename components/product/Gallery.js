import Image from 'next/image'
import Icon from '../../components/Icon'
import { useState, useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { globalState } from '../../components/helpers/globaslState'
import style from '../../styles/module/Product/Product-gallery.module.scss'

export default function Gallery({ images = [], alt = '' }) {
    const [activeImage, setActiveImage] = useState(images[0].gallery)
    const [navDisabled, setNavDisabled] = useState('up')
    const [modalOpen, setModalOpen] = useState(false)
    const animateActiveImage = useAnimationControls()
    const animatePreview = useAnimationControls()
    const refPreviewPosition = useRef(0)
    const refModal = useRef(null)

    const updateActiveImage = async image => {
        await animateActiveImage.start({ opacity: 0 })
        setActiveImage(image)
        await animateActiveImage.start({ opacity: 1 })
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
        const previewHeight = 100
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
        globalState.toggleBodyClass('overflow-hidden')
    }

    const modalClose = () => {
        setModalOpen(false)
        globalState.toggleBodyClass('overflow-hidden')
    }

    const nextHandler = () => {
        const index = images.findIndex(image => image.gallery === activeImage)
        const nextImageObj = images[index + 1]
        const nextImage = nextImageObj ? nextImageObj.gallery : images[0].gallery
        updateActiveImage(nextImage)
    }

    const prevHandler = () => {
        const index = images.findIndex(image => image.gallery === activeImage)
        const nextImageObj = images[index - 1]
        const nextImage = nextImageObj ? nextImageObj.gallery : images[images.length - 1].gallery
        updateActiveImage(nextImage)
    }

    const dragHandler = (_, info) => {
        if (typeof window === 'undefined' || window.innerWidth > 880) return
        const offset = info.offset.x
        if (offset < 120) nextHandler()
        else if (offset > -120) prevHandler()
    }

    useEffect(() => {
        const imagePositions = []
        const imageList = refModal.current.querySelectorAll(`.${style.imageModal}`)
        imageList.forEach(image => {
            imagePositions.push(image.offsetTop)
        })
        const reversePositons = [...imagePositions].reverse()
        const searchIndex = (element, scrollTop) => element <= scrollTop

        const scrollHandler = () => {
            if (!modalOpen) return
            const scrollTop = refModal.current.scrollTop
            const element = reversePositons.find((element) => searchIndex(element, scrollTop))
            const index = element ? imagePositions.indexOf(element) : 0
            updateActiveImage(images[index].gallery)
        }
        refModal.current.addEventListener('scroll', scrollHandler)

        return () => {
            if (refModal.current) {
                refModal.current.removeEventListener('scroll', scrollHandler)
            }
        }
    }, [])


    return (
        <>
            <div className={style.gallery}>
                <div className={`${style.nav} is-hidden--lg-down`}>
                    {images.length > 4
                        ? <div data-disabled={navDisabled === 'up'} onClick={() => slidePreview('up')} className={style.navPrev}>
                            <Icon name='chevronUp' width='20' height='20' />
                        </div>
                        : null
                    }

                    <div className={`${style.previews}`}>
                        <motion.div animate={animatePreview}>
                            {images.map((image, index) => (
                                <div onClick={() => choseActive(image.gallery, index)} data-active={activeImage === image.gallery} key={image.gallery} className={style.imagePreview}>
                                    <Image src={image.preview} width='88' height='88' alt={alt} />
                                </div>
                            ))}
                        </motion.div>
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
                    drag
                    onClick={openModal}
                    onDragEnd={dragHandler}
                    transition={{ duration: 0.3 }}
                    animate={animateActiveImage}
                    className={style.imageMain}>
                    <Image src={activeImage} layout='fill' alt={alt} />
                </motion.div>

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

                <div onClick={nextHandler} className={`${style.nextCol} is-hidden--md-down`} />
            </div>

            <div ref={refModal} data-open={modalOpen} className={style.galleryModal}>
                <div className='container p-relative'>
                    <div className={`${style.alt} text--t1 text--bold py-2 pr-4`}>{alt}</div>
                    <div className={`${style.modalHeader} container`}>
                        <div className='c-pointer' onClick={modalClose}><Icon name='close' width='16' height='16' /></div>
                    </div>

                    {images.map(image => (
                        <div key={image.full} className={style.imageModal}>
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
                            <motion.div animate={animatePreview}>
                                {images.map((image, index) => (
                                    <div onClick={() => choseActive(image.gallery, index)} data-active={activeImage === image.gallery} key={image.gallery} className={style.imagePreview}>
                                        <Image src={image.preview} width='88' height='88' alt={alt} />
                                    </div>
                                ))}
                            </motion.div>
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
        </>
    )
}