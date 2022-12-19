import dynamic from "next/dynamic"
import { useState, useEffect } from 'react'

export default function Icon({ name, width = 16, height = 16, size }) {
    const [LoadedIcon, setLoadedIcon] = useState(false)
    const loadIcon = iconName => {
        // const path = `../public/icons/icon-${iconName}.svg`
        const dynamicComponents = {
            navigation: dynamic(() => import('../public/icons/icon-navigation.svg'), { ssr: false }),
            navigationXS: dynamic(() => import('../public/icons/icon-navigation-xs.svg'), { ssr: false }),
            heartMD: dynamic(() => import('../public/icons/icon-heart-md.svg'), { ssr: false }),
            searchMD: dynamic(() => import('../public/icons/icon-search-md.svg'), { ssr: false }),
            search: dynamic(() => import('../public/icons/icon-search.svg'), { ssr: false }),
            basketMD: dynamic(() => import('../public/icons/icon-basket-md.svg'), { ssr: false }),
            basket: dynamic(() => import('../public/icons/icon-basket.svg'), { ssr: false }),
            catalogMD: dynamic(() => import('../public/icons/icon-catalog-md.svg'), { ssr: false }),
            brandsMD: dynamic(() => import('../public/icons/icon-brands-md.svg'), { ssr: false }),
            arrowRight: dynamic(() => import('../public/icons/icon-arrow-right.svg'), { ssr: false }),
            burger: dynamic(() => import('../public/icons/icon-three-bars.svg'), { ssr: false }),
            person: dynamic(() => import('../public/icons/icon-person.svg'), { ssr: false }),
            VK: dynamic(() => import('../public/icons/icon-vk-fill.svg'), { ssr: false }),
            telegram: dynamic(() => import('../public/icons/icon-telegram-fill.svg'), { ssr: false }),
        }
        const Component = dynamicComponents[iconName]
        setLoadedIcon(Component)
    }
    
    useEffect(() => {
        loadIcon(name)
    }, [])

    return (
        <span className={`icon ${size ? 'icon--' + size : ''}`} style={{ width: +width, height: +height }}>
            {LoadedIcon ? <LoadedIcon /> : null}
        </span>
    )
}
