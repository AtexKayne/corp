import Head from 'next/head'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function MainLayout({ children, title }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <div className='container'>
                {children}
            </div>
            <Footer />
        </>
    )
}