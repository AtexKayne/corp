import A from './A'
import {motion, AnimatePresence} from 'framer-motion'

export default function Breadcrumbs({className, breadcrumbs, pageTransition}) {
    const width = (breadcrumbs && breadcrumbs.filter(path => path.href !== '/').length) ? breadcrumbs.length * 50 : 0
    if (!breadcrumbs) {
        return null
    }

    return (
        <div 
            className={`${className} breadcrumbs`} 
            // style={`width: ${width}px`}
            aria-label='breadcrumbs'>
            <AnimatePresence mode='wait'>
                <motion.div 
                    className='breadcrumbs__wrapper' 
                    initial={{ x: 200 }}
                    animate={{ x: 0 }}
                    exit={{ x: -200 }}
                    key={breadcrumbs[0].href}
                    transition={{duration: 1}}
                >
                    {breadcrumbs.map((breadcrumb, i) => {
                        return (
                            <div className='breadcrumbs__text' key={breadcrumb.href}>
                                <A href={breadcrumb.href} text={breadcrumb.breadcrumb.toUpperCase()}/>
                            </div>
                        )
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}