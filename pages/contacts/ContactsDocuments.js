export default function ContactsDocuments({ documents = {} }) {

    return (
        <section style={{minHeight: '0'}} className='pb-4 pb-0:md' data-scroll-section>
            <h2 className='text--h1 pt-5 pb-2.5 pt-0:md pb-1:md'>{documents.title}</h2>
            <div className='btn-container' style={{maxWidth: '660px'}}>
                {documents.items && documents.items.length
                    ? documents.items.map(document => (
                        <div key={document.name} className='btn text--p3 c-hover'>
                            <div className={`icon icon--${document.icon}`} />
                            <span>{document.name}</span>
                        </div>
                    ))
                    : ''
                }
            </div>
        </section>
    )
}
