import { useContext } from 'react'
import { SmoothScrollContext, SmoothScrollProvider } from '../../components/helpers/SmoothScroll.context'
import Scrollbar from '../../components/Scrollbar'
import MainLayout from '../../layout/MainLayout'
import BrandAbout from './BrandAbout'
import { brandDetail } from '../../components/helpers/constants'

export default function Brand() {
    const { scroll } = useContext(SmoothScrollContext)

    return (
        <MainLayout>
            <SmoothScrollProvider options={{ smooth: true }}>
                <BrandAbout about={brandDetail.about} />
                <Scrollbar scrollContext={ scroll } />
            </SmoothScrollProvider>
        </MainLayout>
    )
}
