import KaleidoscopeImage from '../../components/KaleidoscopeImage'
import style from '../../styles/module/contacts/contacts-intro.module.scss'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'


export default function ContactsIntro({ title }) {
    const { isMobile } = useDeviceDetect()

    return (
        <section style={{minHeight: 0}} data-scroll-section>
            <h1 className='sr-only'>{title}</h1>
            <div className={style.container}>
                <div className={style.image}>
                    <KaleidoscopeImage height={isMobile ? 519 : 904}/>
                </div>
            </div>
        </section>
    )
}
