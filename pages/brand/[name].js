import { SmoothScrollProvider } from '../../components/helpers/SmoothScroll.context'
import MainLayout from '../../layout/MainLayout'
import BrandAbout from './BrandAbout'
import { brandDetail } from '../../components/helpers/constants'
import BrandNumbers from './BrandNumbers'
import BrandHistory from './BrandHistory'
import BrandCatalog from './BrandCatalog'
import BrandMedia from './BrandMedia'

export default function Brand() {

    return (
        <MainLayout className='no-padding'>
            <SmoothScrollProvider options={{ smooth: true }}>
                <BrandAbout about={brandDetail.about} />
                <BrandNumbers numbers={brandDetail.numbers} />
                <BrandHistory history={brandDetail.history} />
                <BrandCatalog about={brandDetail.about} />
                <BrandMedia media={brandDetail.media} />
                <div className='py-3'></div>
                <div className='py-3'></div>
                <div className='py-3'></div>
                <div className='py-3'></div>
                <div className='py-3'></div>
                <div className='py-3'></div>
                {/* <Scrollbar scrollContext={scroll} /> */}
            </SmoothScrollProvider>
        </MainLayout>
    )
}
