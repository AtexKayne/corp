import { SmoothScrollProvider } from '../../components/helpers/SmoothScroll.context'
import MainLayout from '../../layout/MainLayout'
import BrandAbout from './BrandAbout'
import { brandDetail } from '../../components/helpers/constants'
import BrandNumbers from './BrandNumbers'
import BrandHistory from './BrandHistory'
import BrandCatalog from './BrandCatalog'
import BrandMedia from './BrandMedia'
import BrandFooter from './BrandFooter'
import BrandImage from './BrandImage'
import Scrollbar from '../../components/Scrollbar'
import { useEffect } from 'react';


export default function Brand({ setTheme }) {
    const sectons = [
        { id: 'image', icon: '' },
        { id: 'about', icon: '' },
        { id: 'numbers', icon: '' },
        { id: 'catalog', icon: '/assets/img/icons/icon-catalog' },
        { id: 'history', icon: '' },
        { id: 'media', icon: '' },
        { id: 'footer', icon: '' }
    ]

    useEffect(() => {
        setTheme('ui-transparent')

        return () => {
            setTheme('ui-light')
        }
    }, []);

    return (
        <MainLayout className='no-padding'>
            <SmoothScrollProvider options={{ smooth: true }}>
                <BrandImage image={brandDetail.image} />
                <BrandAbout about={brandDetail.about} />
                <BrandNumbers numbers={brandDetail.numbers} />
                <BrandCatalog about={brandDetail.about} />
                <BrandHistory history={brandDetail.history} />
                <BrandMedia media={brandDetail.media} />
                <BrandFooter info={brandDetail.contacts} documents={brandDetail.documents} />
                <Scrollbar scrollComponents={sectons} setTheme={ setTheme } />
            </SmoothScrollProvider>
        </MainLayout>
    )
}
