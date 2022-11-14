import Title from '../../components/Title'
import MainLayout from '../../layout/MainLayout'
import { motion, useAnimationControls, useInView, useTransform, useMotionValue } from 'framer-motion'
import { brandItems } from '../../components/helpers/constants'
import styles from '../../styles/module/projects/projects.module.scss'
import { useRef, useEffect, useState } from 'react'
import ProjectsPattern from './projectsPattern'
import Image from 'next/image'
import Arrow from '../../components/Arrow'

export default function Projects() {
    const angle = 50
    const refBlocks = useRef(null)
    const refWrapper = useRef(null)
    const refIsAnimated = useRef({})
    const refStartDragPos = useRef(0)
    const isInView = useInView(refWrapper)
    const animateLines = useAnimationControls()
    const animateVideo = useAnimationControls()
    const animatePattern = useAnimationControls()
    const animateContent = useAnimationControls()
    const dragY = useMotionValue(10000)
    const [slideImage, setSlideImage] = useState('/assets/img/projects/image-1.jpg')
    const [patternColor, setPatternColor] = useState('#DADFEA')
    
    const rotateValue = useTransform(dragY, [-500, 500, 10000], [50, -50, -120])

    const dragStartHandler = () => {
        if (refIsAnimated.current.start) return refIsAnimated.current.end = true
        else refIsAnimated.current.end = false

        refStartDragPos.current = dragY.get()
    }

    const dragHandler = (_, info) => {
        const currentPos = refStartDragPos.current + info.offset.y
        if (currentPos > 500 || currentPos < -500 || refIsAnimated.current.start || refIsAnimated.current.end) return
        dragY.set(currentPos)
    }

    const dragEndHandler = () => {
        animateContent.stop()
        refIsAnimated.current.start = true
        const endPos = Math.round(dragY.get() / 500) * 500
        const animateParams = {
            transition: {
                duration: 0.4,
                type: 'spring',
                bounce: 0.45
            }
        }

        if (endPos === -500) animateParams.rotate = angle
        else if (endPos === 0) animateParams.rotate = 0
        else animateParams.rotate = angle * -1

        animateContent.start(animateParams).then(() => {
            setTimeout(() => {
                dragY.set(endPos)
                refIsAnimated.current.end = false
                refIsAnimated.current.start = false
            }, 200)
        })
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         animateContent.start({ rotate: -150, transition: { duration: 0 } })
    //     }, 500)
    // }, [])

    useEffect(() => {

        if (isInView) {
            setTimeout(() => {
                animateLines.start('start').then(() => {
                    animatePattern.start('start')
                    animateLines.start('end').then(() => {
                        animateVideo.start({ opacity: 1, transition: { duration: 1 } })
                        if (refBlocks.current) refBlocks.current.setAttribute('data-position', 'end')
                        setPatternColor('#F5F5F5')
                        animateContent.start({ rotate: angle, transition: { duration: 3, type: 'spring', bounce: 0.45 } })
                            .then(() => dragY.set(-500))
                    })
                })
            }, 2700)
        }
    }, [isInView])

    return (
        <MainLayout className='ui-light no-padding'>
            <div ref={refWrapper} className={styles.wrapper}>
                <h1 className='sr-only'>Проекты</h1>
                <div className={styles.decoration}>

                    <div ref={refBlocks} className={styles.blocks}>
                        <motion.div animate={animateLines} initial={{ rotate: '60deg', scale: '1, 1' }} transition={{ duration: 2 }} variants={{ end: { rotate: '25deg' } }}>
                            <motion.div animate={animateLines} initial={{ clipPath: 'polygon(60% 0%, 60% 0%, 60% 100%, 60% 100%)' }} transition={{ duration: 2 }} variants={{ start: { clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)' } }} />
                        </motion.div>
                        <motion.div animate={animateLines} initial={{ rotate: '60deg', scale: '1, -1' }} transition={{ duration: 2 }} variants={{ end: { rotate: '25deg' } }}>
                            <motion.div animate={animateLines} initial={{ clipPath: 'polygon(60% 0%, 60% 0%, 60% 100%, 60% 100%)' }} transition={{ duration: 2 }} variants={{ start: { clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)' } }} />
                        </motion.div>
                    </div>

                    <motion.div initial={{ opacity: 0 }} animate={animateVideo} className={styles.video}>
                        <div><Image src={slideImage} layout='fill' alt='' /></div>
                        <div><Image src={slideImage} layout='fill' alt='' /></div>
                        <div><Image src={slideImage} layout='fill' alt='' /></div>
                        <div><Image src={slideImage} layout='fill' alt='' /></div>
                    </motion.div>

                    <div style={{color: patternColor}} className={styles.pattern}>
                        <motion.div
                            animate={animatePattern}
                            initial={{ clipPath: 'polygon(50% 0, 50% 0, 50% 0, 50% 100%)' }}
                            variants={{ start: { clipPath: 'polygon(20% 0, 100% 0, 100% 65%, 50% 100%)' } }}
                            transition={{ duration: 2 }}>
                            <ProjectsPattern />
                        </motion.div>
                        <motion.div
                            animate={animatePattern}
                            initial={{ clipPath: 'polygon(50% 0, 50% 0, 50% 0, 50% 100%)' }}
                            variants={{ start: { clipPath: 'polygon(20% 0, 100% 0, 100% 64%, 50% 100%)' } }}
                            transition={{ duration: 2 }}>
                            <ProjectsPattern />
                        </motion.div>
                    </div>

                    <div className={styles.filler} />
                </div>


                <motion.div
                    onPanEnd={dragEndHandler}
                    onPanStart={dragStartHandler}
                    onPan={dragHandler}
                    className={`${styles.contentScroller} c-dragv`}>
                    <motion.div animate={animateContent} initial={{ rotate: 120 }} style={{ rotate: rotateValue }} className={styles.content}>
                        <div className={`${styles.inner} `}>
                            <h2 className='text--h1 pb-0.5 c-hover d-flex flex--center'>
                                <span>Russian Barber Week</span>
                                <Arrow />
                            </h2>
                            <p className='text--t2 pl-1'>
                                Одно из самых первых и крупнейших мероприятий,
                                ориентированное на всё пополняющуюся аудиторию барберов.
                                Мастер-классы, бизнес-программа, шоу, маркет, встречи и развлечение
                            </p>
                        </div>
                        <div className={`${styles.inner} `}>
                            <h2 className='text--h1 pb-0.5 c-hover d-flex flex--center'>
                                <span>Russian Barber Week</span>
                                <Arrow />
                            </h2>
                            <p className='text--t2 pl-1'>
                                Одно из самых первых и крупнейших мероприятий,
                                ориентированное на всё пополняющуюся аудиторию барберов.
                                Мастер-классы, бизнес-программа, шоу, маркет, встречи и развлечение
                            </p>
                        </div>
                        <div className={`${styles.inner} `}>
                            <h2 className='text--h1 pb-0.5 c-hover d-flex flex--center'>
                                <span>Russian Barber Week</span>
                                <Arrow />
                            </h2>
                            <p className='text--t2 pl-1'>
                                Одно из самых первых и крупнейших мероприятий,
                                ориентированное на всё пополняющуюся аудиторию барберов.
                                Мастер-классы, бизнес-программа, шоу, маркет, встречи и развлечение
                            </p>
                        </div>

                    </motion.div>
                </motion.div>
            </div>
        </MainLayout>
    )
}


export async function getServerSideProps({ req }) {
    let resp, json
    try {
        resp = await fetch(`${process.env.API_URL}/brands`)
        json = await resp.json()
    } catch (error) {
        json = brandItems
    }

    return {
        props: {
            items: json.items
        }
    }
}