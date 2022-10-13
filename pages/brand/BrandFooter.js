import style from '../../styles/module/brand/brand-footer.module.scss'
import Image from 'next/image'

export default function BrandFooter({ info, documents }) {

    return (
        <section id='footer' data-scroll-section className='d-flex'>
            <div className='col col--60 pt-2 pr-1'>
                <div className={`${style.info} mb-0.5`}>
                    <span className='text--t2 text--bold'>Официальный сайт</span>
                    <div className={style.delim} />
                    <span className='text--t2'>
                        <a className='c-hover' href={info.site} rel='noreferrer' target='_blank'>info.site</a>
                    </span>
                </div>
                <div className={`${style.info} mb-0.5`}>
                    <span className='text--t2 text--bold'>Где купить</span>
                    <div className={style.delim} />
                    <span className='text--t2'>{info.markets}</span>
                </div>
                <h1 className={`${style.title} text--h1 py-2`}>Документы</h1>
                <div className={style.documentWrapper}>
                    {documents.map(document => (
                        <div key={document.name} className={`${style.document} text--p3 c-hover`}>
                            <Image src={document.icon} width='24' height='24' alt={document.name} />
                            <span>{document.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
