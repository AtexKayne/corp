import { motion } from 'framer-motion'

export default function PageTransitor({ pageTransition, leftPosition}) {
    return (
        <div className='page-transitor'>
            <motion.div 
                className='page-transitor__top'
                initial={{ y: '-100vh' }}
                animate={pageTransition}
                transition={{duration: 1}}
                variants={{
                    hidden: { y: '-100vh' },
                    shown: { y: '-50vh' },
                }}/>
            <motion.div 
                className='page-transitor__left'
                initial={{ x: leftPosition }}
                animate={pageTransition}
                transition={{duration: 1}}
                variants={{
                    hidden: { x: leftPosition },
                    shown: { x: '-65vw' },
                }}/>
            <motion.div 
                className='page-transitor__bottom'
                initial={{ y: '100vh' }}
                animate={pageTransition}
                transition={{duration: 1}}
                variants={{
                    hidden: { y: '100vh' },
                    shown: { y: '70vh' },
                }}/>
            <motion.div 
                className='page-transitor__right'
                initial={{ x: '100vw', y: '0vh' }}
                animate={pageTransition}
                transition={{duration: 1}}
                variants={{
                    hidden: { x: '100vw', y: '0vh' },
                    shown:  { x: '50vw',  y: '50vh' },
            }}/>
        </div>
    )
}