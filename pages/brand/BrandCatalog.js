import Image from 'next/image'
import Link from 'next/link'
import Arrow from '../../components/Arrow'
import style from '../../styles/module/brand/brand-catalog.module.scss'

export default function BrandCatalog({ about }) {
    return (
        <section id='catalog' style={{minHeight: 0}} data-scroll-section>
            <div className='py-5 py-2:md'>
                <Link href='/' pathHref>
                    <a className={`${style.catalog} c-hover`}>
                        <div className={style.catalogImage}>
                            <Image src='/assets/img/brand/catalog.svg' alt='catalog icon' width='100' height='100' />
                            <Image src={about ? about.image: ''} alt='catalog icon' width='60' height='60' />
                        </div>
                        <div className={`${style.catalogText} text--h5 py-1 py-0:md ml-0 ml-0.5:md`}>
                            Полный каталог<br />товаров {about? about.name : ''}
                        </div>
                        <Arrow />
                    </a>
                </Link>
            </div>
        </section>
    )
}
