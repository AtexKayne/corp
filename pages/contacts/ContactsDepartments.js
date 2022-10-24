import style from '../../styles/module/contacts/contacts-departments.module.scss'
import { useRef, useEffect } from "react"
import { motion, useAnimationControls, useInView } from "framer-motion"

function Line({ department }) {
    const refLine = useRef(null)
    const isInView = useInView(refLine, { margin: '100px 100px 150px 200px' })
    const animateLine = useAnimationControls()
    const animateText = useAnimationControls()

    useEffect(() => {
        if (isInView) {
            animateText.start({ opacity: 1, transition: { duration: 1.5, delay: 0.5 } })
            animateLine.start({ width: '100%', transition: { duration: 1.5, delay: 0.5 } })
        } else {
            animateText.start({ opacity: 0, transition: { duration: 1.5, delay: 0.5 } })
            animateLine.start({ width: '0%', transition: { duration: 1.5, delay: 0.5 } })
        }
    }, [isInView])

    return (
        <div ref={refLine} className={`${style.line} mb-1.5`}>
            <motion.div animate={animateText} className='text--h4 mb-1'>{department.name}</motion.div>
            <div className={style.lineImage}>
                <motion.svg animate={animateLine} id='patternId' width='100%' height='100%'>
                    <defs>
                        <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='20' patternTransform='scale(2) rotate(0)'>
                            <path d='M-10 7.5l20 5 20-5 20 5' strokeLinecap='square' strokeWidth='1' stroke='#FFA900' fill='none' />
                        </pattern>
                    </defs>
                    <rect width='100%' height='40' transform='translate(-15, -12)' fill='url(#a)' />
                </motion.svg>
            </div>
            <motion.span animate={animateText} className='text--t1'>
                <a href={`tel:${department.phone}`} className='c-hover'>{department.phone}</a>
            </motion.span>
            <motion.span animate={animateText} className='text--t1 text--transparent'>
                <a href={`mail:${department.mail}`} className='c-hover'>{department.mail}</a>
            </motion.span>
        </div>
    )
}

export default function ContactsDepartments({ departments }) {
    return (
        <section data-scroll-section>
            {departments.items
                ? departments.items.map(department => (
                    <Line key={department.name} department={department} />
                )) : ''}
        </section>
    )
}
