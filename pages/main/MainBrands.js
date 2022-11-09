import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import style from '../../styles/module/main/main-brands.module.scss'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'

export default function MainBrands({ brands }) {
    const { isMobile } = useDeviceDetect()
    const [image, setImage] = useState('/assets/img/textlogo.svg')
    const [isHover, setIsHover] = useState(false)

    const hoverStartHandler = () => {
        const width = refText.current.clientWidth + 30
        setLineWidth(width)
        setIsHover(true)
    }

    const hoverEndHandler = () => {
        setLineWidth(30)
        setIsHover(false)
    }

    useEffect(() => {
        
    }, [isMobile])

    return (
        <div className={`${style.container}`}>
            <div className={style.inner}>
                {brands
                    ? brands.map((brand, index) => (
                        // TODO replace index
                        <Image key={index} src={image} alt='simrussia logo' width={isMobile ? 199 : 265} height={isMobile ? 60 : 81} />
                    )) : null
                }
            </div>
        </div>
    )
}