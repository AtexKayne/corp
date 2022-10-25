import Image from 'next/image'
import style from '../../styles/module/contacts/contacts-intro.module.scss'


export default function ContactsIntro({ title }) {
    return (
        <section style={{minHeight: '452px'}} data-scroll-section>
            <h1 className='sr-only'>{title}</h1>
            <div className={style.container}>
                <div className={style.image}>
                    <Image src='/assets/img/contacts/kaleidoscope.svg' alt='' width='904' height='452' />
                </div>
            </div>
        </section>
    )
}
