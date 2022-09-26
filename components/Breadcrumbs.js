import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import A from './A'
import {motion} from 'framer-motion'

const Breadcrumbs = ({className, onAfterEffect, pageTransition}) => {
    const router = useRouter()
    const [breadcrumbs, setBreadcrumbs] = useState(null)

    useEffect(() => {
        if (router) {
            const linkPath = router.asPath.split('/')
            linkPath.shift()

            const pathArray = linkPath.map((path, i) => {
                return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') }
            })

            setBreadcrumbs(pathArray)
            const newPosition = `-${(window.innerWidth - 121 - pathArray.filter(path => path.href !== '/').length * 50)}px`
            onAfterEffect(newPosition)
        }
    }, [router])

    if (!breadcrumbs || !breadcrumbs[0].breadcrumb) {
        return null
    }

    return (
        <div className={`${className} breadcrumbs`} aria-label='breadcrumbs'>
            {breadcrumbs.map((breadcrumb, i) => {
                return (
                    <motion.div 
                        className='breadcrumbs__text'
                        initial={{x: 200, rotate: -90}}
                        animate={pageTransition}
                        variants={{
                            hidden: { x: 0, rotate: -90, transition: { duration: 1, delay: 0.2 } },
                            shown: { x: 200, rotate: -90, transition: { duration: 0.2, delay: 0 } },
                        }}
                        key={breadcrumb.href}
                    >
                        <A href={breadcrumb.href} text={breadcrumb.breadcrumb.toUpperCase()}/>
                    </motion.div>
                )
            })}
        </div>
    )
}

export default Breadcrumbs