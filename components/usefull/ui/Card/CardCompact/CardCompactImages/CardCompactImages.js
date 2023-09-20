import Favourite from '../../../../Favourite'
import style from './style.module.scss'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function CardCompactImages({ images, count, animate, info, label = false }) {
    const infoUpdated = {
        primary: info.primaryName,
        image: images[0]
    }
    return (
        <motion.div animate={animate.inner} data-label={label} data-count={count} className={style.container}>
            <div className={style.image}>
                <Image layout='fill' alt={'product card image'} src={images[0]} />
            </div>
            <Favourite external={style.favourite} width='24' height='21' info={infoUpdated} />
        </motion.div>
    )
}
