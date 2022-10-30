export default function ContactsDocuments({ documents = {} }) {

    return (
        <section style={{minHeight: '0'}} data-scroll-section>
            <h2 className='text--h1 py-2'>{documents.title}</h2>
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
