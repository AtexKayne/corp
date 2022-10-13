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

export default function Brand() {
    const sectons = [
        { id: 'image', icon: '' },
        { id: 'about', icon: '' },
        { id: 'numbers', icon: '' },
        { id: 'catalog', icon: '/assets/img/icon-catalog' },
        { id: 'media', icon: '' },
        { id: 'footer', icon: '' }
    ]
    return (
        <MainLayout className='no-padding'>
            <SmoothScrollProvider options={{ smooth: true }}>
                <BrandImage image={brandDetail.image} />
                <BrandAbout about={brandDetail.about} />
                <BrandNumbers numbers={brandDetail.numbers} />
                <BrandHistory history={brandDetail.history} />
                <BrandCatalog about={brandDetail.about} />
                <BrandMedia media={brandDetail.media} />
                <BrandFooter info={brandDetail.contacts} documents={brandDetail.documents} />
                <Scrollbar scrollComponents={sectons}/>
            </SmoothScrollProvider>
        </MainLayout>
    )
}
