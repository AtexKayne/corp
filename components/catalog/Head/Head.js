import ColorCircle from '../ColorCircle/ColorCircle'
import Share from '../Share/Share'
import style from '../Catalog.module.scss'
import { useRef, useEffect, useState } from 'react'

export default function Head({ categoryName, isBrands, isPromo, info }) {
    const [imageLogo, setImageLogo] = useState('/icons/icon-empty.svg')
    const [imageOverlay, setImageOverlay] = useState(null)
    const [themeHead, setThemeHead] = useState('ui-light')

    useEffect(() => {
        if (isBrands) {
            setImageOverlay(info.img_big ? info.img_big : false)
            setImageLogo(info.logo)
            if (info.theme === 'dark') {
                globalState.header.setTheme('ui-dark')
                setThemeHead('ui-dark')
            }
        }
    }, [info])

    const openDescription = () => {
        const template = isPromo ? 'promoAbout' : 'brandAbout'
        // Здесь были непонятки с передаваемым именем.
        globalState.modal.open(template, false, { name: info.name })
    }

    if (isBrands) {
        return (
            <div className={`${themeHead} ${imageOverlay ? 'mb-2 mb-3.5:md mb-4:lg mb-5:xl mb-6:xxxl' : 'mb-1.5 mb-2:md mb-3:xxl'}`}>
                {imageOverlay
                    ? <div className={`${style.imageOverlay} ${categoryName.length >= 20 ? style.imageOverlayFull : ''}`}>
                        <Image src={imageOverlay} layout='fill' alt={info.name} />
                    </div> : null
                }

                <div className={style.brandHead}>
                    {imageOverlay
                        ? null
                        : <div className='mr-1.5 px-1 py-1 is-hidden--lg-down'><Image src={imageLogo} width='100' height='100' alt={info.name} /></div>
                    }
                    <div className={style.brandInfo}>
                        {isPromo
                            ? null
                            : <h2 className={`${style.brandDescription} text--p2 text--normal mb-0.6:xl mb-1.5:xxxl is-hidden--lg-down`}>{info.description}</h2>
                        }

                        <div className={`${style.head} ${isPromo ? 'mb-0.5 mb-1:xl' : 'mb-0.5 mb-0.6:xl mb-1.5:xxxl'}`}>
                            <div className={`${style.title}`}>
                                <h1 className={`text--a2 text--bold is-decorative`}>{categoryName}</h1>
                            </div>
                            <div className={style.headAddition}>
                                {categoryName === 'Sensido' ? <ColorCircle /> : null}

                                <Share isPromo={isPromo} isBrands={isBrands} name={info.name} />
                            </div>
                            {categoryName === 'Sensido' ? <ColorCircle isFullSize={true} /> : null}
                        </div>

                        {!isPromo
                            ? null
                            : <h2 className={`${style.brandDescription} text--p2 text--normal mb-0.6:xl mb-1.5:xxxl is-hidden--lg-down`}>{info.description}</h2>
                        }

                        <div onClick={openDescription} className={`${style.aboutBrand} text--t5 text--upper text--bold is-hidden--sm-down`}>{isPromo ? 'Подробнее' : 'Подробнее о бренде'}</div>
                        <div onClick={openDescription} className={`${style.aboutBrand} text--t6 text--upper text--bold is-hidden--md-up`}>{isPromo ? 'Подробнее' : 'Подробнее о бренде'}</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={`${style.head} row mb-2 pt-1.5`}>

                <div className={`${style.title}`}>
                    <h1 className={`text--a2 text--bold`}>{categoryName}</h1>
                </div>

                {info ? <Share isBrands={isBrands} name={info.name} /> : null}
            </div>
        )
    }
}
