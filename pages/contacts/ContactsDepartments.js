import style from '../../styles/module/contacts/contacts-departments.module.scss'
import { useRef, useEffect, useState } from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion'

function Line({ department = {} }) {
    const refLine = useRef(null)
    const isInView = useInView(refLine, { margin: '100px 100px 150px 200px' })
    const [lineWidth, setLineWidth] = useState(0)
    const animateLine = useAnimationControls()
    const animateTextA = useAnimationControls()
    const animateTextB = useAnimationControls()
    const animateTextC = useAnimationControls()
    const animateCube = useAnimationControls()

    useEffect(() => {
        const offsetX = refLine.current.getBoundingClientRect()
        setLineWidth(window.innerWidth - offsetX.x + 50)
    }, [])

    useEffect(() => {
        if (isInView) {
            animateCube.start({ opacity: 1, transition: { duration: 0.2, delay: 0.5 } })
            animateTextA.start({ opacity: 1, transition: { duration: 1, delay: 0.5 } })
            animateTextB.start({ opacity: 1, transition: { duration: 1, delay: 1.0 } })
            animateTextC.start({ opacity: 1, transition: { duration: 1, delay: 1.5 } })
            animateLine.start({ width: '100%', transition: { duration: 1.5, delay: 0.5 } })
        }
    }, [isInView])

    return (
        <div ref={refLine} className={`${style.line} mb-2.5 mb-1.5:md`}>
            <motion.div animate={animateTextA} initial={{opacity: 0}} className='text--h4'>{department.name ? department.name : 'undefined'}</motion.div>
            <motion.div animate={animateCube} style={{width: `${lineWidth}px`}} initial={{opacity: 0}} className={style.lineImage}>
                <motion.svg animate={animateLine} initial={{width: '0%'}} id='patternId' width='100%' height='100%'>
                    <defs>
                        <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='20' patternTransform='scale(2) rotate(0)'>
                            <path d='M-10 7.5l20 5 20-5 20 5' strokeLinecap='square' strokeWidth='1' stroke='#FFA900' fill='none' />
                        </pattern>
                    </defs>
                    <rect width='100%' height='40' transform='translate(-15, -12)' fill='url(#a)' />
                </motion.svg>
            </motion.div>
            <motion.span animate={animateTextB} initial={{opacity: 0}} className='text--c4'>
                <a href={`tel:${department.phone}`} className='c-hover'>{department.phone}</a>
            </motion.span>
            <motion.span animate={animateTextC} initial={{opacity: 0}} className='text--c4 text--transparent'>
                <a href={`mail:${department.mail}`} className='c-hover'>{department.mail}</a>
            </motion.span>
        </div>
    )
}

export default function ContactsDepartments({ departments }) {
    return (
        <section data-scroll-section>
            <h2 className='text--h2 pt-5 pt-1:md pb-3.5 pb-1:md'>{departments && departments.title ? departments.title : 'undefined'}</h2>
            {departments && departments.items && departments.items.length
                ? departments.items.map((department, index) => (
                    <Line key={department.name ? department.name : index} department={department} />
                )) : ''}
        </section>
    )
}
