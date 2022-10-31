import style from '../../styles/module/contacts/map.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useEffect, useRef, useContext, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'
import Image from 'next/image'

export default function ContactsMap({ adress = {} }) {
    const { isMobile } = useDeviceDetect()
    const [mapItemActive, setMapItemActive] = useState('middle')

    const zoomIn = () => {
        if (mapItemActive === 'min') {
            setMapItemActive('middle')
        } else if (mapItemActive === 'middle') {
            setMapItemActive('max')
        } else if (mapItemActive === 'max') {
            setMapItemActive('max')
            console.warn('Don`t broke my site, mthrfkcr!');
        }
    }

    const zoomOut = () => {
        if (mapItemActive === 'min') {
            setMapItemActive('min')
            console.warn('Don`t broke my site, mthrfkcr!');
        } else if (mapItemActive === 'middle') {
            setMapItemActive('min')
        } else if (mapItemActive === 'max') {
            setMapItemActive('middle')
        }
    }

    useEffect(() => {

    }, [])

    return (
        <section data-scroll-section>
            <div id='map' className={style.container}>
                <div className={isMobile ? '' : 'col col--30'}>
                    {adress && adress.city
                        ? (
                            <div className='pt-1'>
                                <div className='text--h2 pb-0.5'>{adress.city}</div>

                                <div className={`${style.adressInfo} mb-0.5`}>
                                    <div className={style.metro}>
                                        <Image src='/assets/img/icons/icon-metro.svg' width='30' height='30' alt='metro' />
                                        <div className='text--t2'>{adress.metro}</div>
                                    </div>
                                    <div className='text--t2'>{adress.street}</div>
                                    <div className='text--t2'>{adress.house}</div>
                                </div>

                                <div className={`${style.links} mb-2`}>
                                    {adress.maps
                                        ? adress.maps.map(link => (
                                            <a
                                                href={link.link}
                                                target='_blank'
                                                rel='noreferrer'
                                                key={link.name}
                                                className={`${style.linkItem} c-hover`}>
                                                <Image width='40' height='40' alt='' src={`/assets/img/contacts/${link.name}-map.svg`} />
                                            </a>
                                        )) : ''}
                                </div>

                                <div className='text--h4 pb-1'>{adress.social.title}</div>

                                <div className={`${style.links} mb-1`}>
                                    {adress.social.icons
                                        ? adress.social.icons.map(link => (
                                            <a
                                                href={link.link}
                                                target='_blank'
                                                rel='noreferrer'
                                                key={link.name}
                                                className={`${style.socialsItem} text--t2 c-hover`}>
                                                {link.name}
                                            </a>
                                        )) : ''}
                                </div>

                                <div className={`${style.links} mb-0.5`}>
                                    <div className='text--t2'>{adress.bots.title}</div>
                                    {adress.bots.icons
                                        ? adress.bots.icons.map(link => (
                                            <a
                                                href={link.link}
                                                target='_blank'
                                                rel='noreferrer'
                                                key={link.name}
                                                className={`${style.botsItem} c-hover`}>
                                                <Image width='25' height='25' alt='' src={`/assets/img/icons/icon-${link.name}.svg`} />
                                            </a>
                                        )) : ''}
                                </div>
                            </div>
                        ) : ''}
                </div>
                <div className={isMobile ? '' : 'col col--70'}>
                    <div className='pt-2 pt-1:md-up pl-1:md-up p-relative'>
                        <div data-scroll data-scroll-sticky data-scroll-target='#map' className={style.map}>
                            <div data-active={mapItemActive} className={style.mapNav}>
                                <div className='c-hover' onClick={zoomIn}><span style={{height: '3.1rem'}}>+</span></div>
                                <div className='c-hover' onClick={zoomOut}><span style={{height: '4.1rem'}}>-</span></div>
                            </div>
                            <div data-active={mapItemActive === 'max'} className={style.mapItem}>
                                <Image src='/assets/img/contacts/map-image-max.svg' alt='' layout='fill'/>
                            </div>
                            <div data-active={mapItemActive === 'middle'} className={style.mapItem}>
                                <Image src='/assets/img/contacts/map-image-middle.svg' alt='' layout='fill'/>
                            </div>
                            <div data-active={mapItemActive === 'min'} className={style.mapItem}>
                                <Image src='/assets/img/contacts/map-image-min.svg' alt='' layout='fill'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
