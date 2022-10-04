import { SmoothScrollProvider } from '../../components/helpers/SmoothScroll.context'
import MainLayout from '../../layout/MainLayout'
import About from './About'


export default function AboutPage() {
    return (
        <MainLayout>
            <SmoothScrollProvider options={{ smooth: true }}>
                <About />
            </SmoothScrollProvider>
        </MainLayout>
    )
}
