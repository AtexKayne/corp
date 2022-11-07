import style from '../../styles/module/brand/brand-about.module.scss'
import Image from 'next/image'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useContext } from 'react'
import InfoLine from '../../components/InfoLine'

export default function BrandAbout({ about }) {
    // const { scroll } = useContext(SmoothScrollContext)
    // const scrollHandler = event => {
    //     event.deltaY < 0 && scroll && scroll.scrollTo('#image')
    // }
    return (
        <section 
            data-scroll-speed='10'
            // onWheel={scrollHandler}
            id='about'
            data-scroll-section
            className={style.container}>
            {/* <h1 className={`${style.title} text--h1 pb-1`}>{ about ? about.name : '' }</h1> */}
            <div className='col col--60 pr-1'>
                <InfoLine textBold={'Страна происхождения'} textThin={about ? about.country : ''}/>
                <p className='text--t2'>{ about ? about.description : '' }</p>
            </div>
            <div className='col col--40 col--center'>
                <div className={style.image}>
                    <Image src={about ? about.image : ''} width='240' height='240' alt={ about ? about.name : '' }/>
                </div>
            </div>
        </section>
    )
}
