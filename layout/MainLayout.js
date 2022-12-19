import Head from 'next/head'
import Header from '../components/Header'

export default function MainLayout({ children, title }) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <div className='container'>
                <div className='row'>
                    <div className='col col--xs-6 col--md-4 col--lg-3 col--xl-2'>
                        <div style={{ border: '2px solid black', width: '100%', height: '100px' }} />
                    </div>
                    <div className='col col--xs-6 col--md-4 col--lg-3 col--xl-2'>
                        <div style={{ border: '2px solid black', width: '100%', height: '100px' }} />
                    </div>
                    <div className='col col--xs-6 col--md-4 col--lg-3 col--xl-2'>
                        <div style={{ border: '2px solid black', width: '100%', height: '100px' }} />
                    </div>
                    <div className='col col--xs-6 col--md-4 col--lg-3 col--xl-2'>
                        <div style={{ border: '2px solid black', width: '100%', height: '100px' }} />
                    </div>
                    <div className='col col--xs-6 col--md-4 col--lg-3 col--xl-2'>
                        <div style={{ border: '2px solid black', width: '100%', height: '100px' }} />
                    </div>
                    <div className='col col--xs-6 col--md-4 col--lg-3 col--xl-2'>
                        <div style={{ border: '2px solid black', width: '100%', height: '100px' }} />
                    </div>
                    <div className='col col--xs-6 col--md-4 col--lg-3 col--xl-2'>
                        <div style={{ border: '2px solid black', width: '100%', height: '100px' }} />
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}