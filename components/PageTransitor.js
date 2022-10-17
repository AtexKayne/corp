import { motion } from 'framer-motion'

export default function PageTransitor({ pageTransition, leftPosition }) {
    return (
        <div className='page-transitor'>
            <motion.div
                className='page-transitor__top'
                initial={{ y: '-100vh' }}
                animate={pageTransition}
                transition={{ duration: 2, ease: [0.1, 0.7, 0.8, 0.9] }}
                variants={{
                    hidden: { y: '-100vh', borderWidth: '1px' },
                    shown: { y: '-50vh', borderWidth: ['6px', '1px', '6px'] },
                }}>
                <motion.div
                    initial={{ height: '1px' }}
                    animate={pageTransition}
                    transition={{ duration: 1, ease: [0.1, 1, 0.1, 1] }}
                    variants={{
                        hidden: { height: '1px' },
                        shown: { height: '1px' },
                    }} />
            </motion.div>
            <motion.div
                className='page-transitor__left'
                initial={{ x: leftPosition }}
                animate={pageTransition}
                transition={{ duration: 2, ease: [0.1, 0.7, 0.8, 0.9] }}
                variants={{
                    hidden: { x: leftPosition, borderColor: '#DADFEA' },
                    shown: { x: '-60vw', borderWidth: ['6px', '1px', '6px'], borderColor: '#FFA900' },
                }}>
                <motion.div
                    initial={{ width: '1px' }}
                    animate={pageTransition}
                    transition={{ duration: 1, ease: [0.1, 1, 0.1, 1] }}
                    variants={{
                        hidden: { width: '1px' },
                        shown: { width: '1px' },
                    }} />
            </motion.div>
            <motion.div
                className='page-transitor__bottom'
                initial={{ y: '100vh' }}
                animate={pageTransition}
                transition={{ duration: 2, ease: [0.1, 0.7, 0.8, 0.9] }}
                variants={{
                    hidden: { y: '100vh', borderWidth: '1px' },
                    shown: { y: '50vh', borderWidth: ['6px', '1px', '6px'] },
                }}>
                <motion.div
                    initial={{ height: '1px' }}
                    animate={pageTransition}
                    transition={{ duration: 1, ease: [0.1, 1, 0.1, 1] }}
                    variants={{
                        hidden: { height: '1px' },
                        shown: { height: '1px' },
                    }} />
            </motion.div>
            <motion.div
                className='page-transitor__right'
                initial={{ x: '100vw' }}
                animate={pageTransition}
                transition={{ duration: 2, ease: [0.1, 0.7, 0.8, 0.9] }}
                variants={{
                    hidden: { x: '100vw', borderWidth: '1px' },
                    shown: { x: '60vw', borderWidth: ['6px', '1px', '6px'] },
                }} >
                <motion.div
                    initial={{ width: '1px' }}
                    animate={pageTransition}
                    transition={{ duration: 1, ease: [0.1, 1, 0.1, 1] }}
                    variants={{
                        hidden: { width: '1px' },
                        shown: { width: '1px' },
                    }} />
            </motion.div>
        </div>
    )
}