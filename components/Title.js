import Image from 'next/image'
import { motion } from 'framer-motion';

export default function Title({image, text, hover}) {
    return (
        <motion.div 
            initial='hidden'
            animate='visible'
            className='title c-hover'
            variants={{
                hidden: {
                    scale: .8,
                    opacity: 0
                },
                visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                        delay: .3
                    }
                }
            }}>
            <div className='title__text'>
                {image
                    ? ( <>
                            <Image src={image} alt='logo' width='263' height='80' className='title__image'/>
                            <h1 className='sr-only'>Home</h1>
                        </>
                    ) : <h1 className='h1'>{text}</h1>
                }
            </div>
            { hover ? (
                <div className='title__arrow'>
                    <span className='title__arrow-text text--p3'>
                        {hover}
                    </span>
                    <div className='title__arrow-icon'>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : null }
        </motion.div>
    )
}