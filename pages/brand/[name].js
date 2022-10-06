import { SmoothScrollProvider } from '../../components/helpers/SmoothScroll.context'
import Scrollbar from '../../components/Scrollbar'
import MainLayout from '../../layout/MainLayout'
import BrandAbout from './BrandAbout'
import { brandDetail } from '../../components/helpers/constants'
import BrandNumbers from './BrandNumbers'
import BrandHistory from './BrandHistory'

export default function Brand() {

    return (
        <MainLayout className='no-padding'>
            <SmoothScrollProvider options={{ smooth: true }}>
                <BrandAbout about={brandDetail.about} />
                {/* <BrandNumbers numbers={brandDetail.numbers} /> */}
                <BrandHistory history={brandDetail.history} />
                {/* <Scrollbar scrollContext={scroll} /> */}
            </SmoothScrollProvider>
        </MainLayout>
    )
}
