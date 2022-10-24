import style from '../../styles/module/brand/brand-footer.module.scss'
import Image from 'next/image'

export default function ContactsDocuments({ documents }) {

    return (
        <section style={{minHeight: '0'}} data-scroll-section>
            <h2 className={`${style.title} text--h1 py-2`}>{documents.title}</h2>
            <div className={style.documentWrapper}>
                {documents.items 
                    ? documents.items.map(document => (
                        <div key={document.name} className={`${style.document} text--p3 c-hover`}>
                            <Image src={`/assets/img/icons/icon-${document.icon}.svg`} width='24' height='24' alt={document.name} />
                            <span>{document.name}</span>
                        </div>
                    ))
                    : ''
                }
            </div>
        </section>
    )
}
