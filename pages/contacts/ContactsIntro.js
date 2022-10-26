import KaleidoscopeImage from '../../components/KaleidoscopeImage'
import style from '../../styles/module/contacts/contacts-intro.module.scss'


export default function ContactsIntro({ title }) {
    return (
        <section style={{minHeight: 0}} data-scroll-section>
            <h1 className='sr-only'>{title}</h1>
            <div className={style.container}>
                <div className={style.image}>
                    <KaleidoscopeImage height={904}/>
                </div>
            </div>
        </section>
    )
}
