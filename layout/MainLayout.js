import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Popover from '../components/usefull/Popover'

export default function MainLayout({ children, title }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <Popover />
            <div className='container'>
                {children}
            </div>
            <Footer />
        </>
    )
}