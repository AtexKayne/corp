import Favourite from '../../../../Favourite'
import style from './style.module.scss'
import Image from 'next/image'

export default function CardCompactImages({ images, count, info, label = false }) {
    const infoUpdated = {
        primary: info.primaryName,
        image: images[0]
    }
    return (
        <div className={style.container}>
            <div className={style.image}>
                <Image layout='fill' alt={'product card image'} src={images[0]} />
            </div>
            <Favourite external={style.favourite} width='24' height='21' info={infoUpdated} />
        </div>
    )
}