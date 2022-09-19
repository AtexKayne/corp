import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import A from './A'
import {motion} from 'framer-motion'

const Breadcrumbs = ({className}) => {
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
                        animate={{x: 0, rotate: -90, transition: {delay: i + 1.5}}}
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