import { SmoothScrollProvider } from '../../components/helpers/SmoothScroll.context'
import Scrollbar from '../../components/Scrollbar'
import MainLayout from '../../layout/MainLayout'
import BrandAbout from './BrandAbout'
import { brandDetail } from '../../components/helpers/constants'
import BrandNumbers from './BrandNumbers'

export default function Brand() {

    return (
        <MainLayout className='no-padding'>
            <SmoothScrollProvider options={{ smooth: true }}>
                <BrandAbout about={brandDetail.about} />
                <BrandNumbers numbers={brandDetail.numbers} />
                {/* <Scrollbar scrollContext={scroll} /> */}
            </SmoothScrollProvider>
        </MainLayout>
    )
}
