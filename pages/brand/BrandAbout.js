import Image from 'next/image'
import style from '../../styles/module/brand-about.module.scss'

export default function BrandAbout({ about }) {

    return (
        <section data-scroll-section className={style.container}>
            <h1 className={`${style.title} text--h1 pb-1`}>{ about.name }</h1>
            <div className='col col--60 pr-1'>
                <div className={`${style.country} pb-1`}>
                    <span className='text--t2 text--bold'>Страна происхождения</span>
                    <div className={style.delim} />
                    <span className='text--t2'>{ about.country }</span>
                </div>
                <p className='text--t2'>{ about.description }</p>
            </div>
            <div className='col col--40 col--center'>
                <div className={style.image}>
                    <Image src={about.image} width='240' height='240' alt={ about.name }/>
                </div>
            </div>
        </section>
    )
}
