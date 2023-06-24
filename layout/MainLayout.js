import { globalState } from '../components/helpers/globalState'
import { useEffect } from 'react'

import Head from 'next/head'
import Modal from '../components/Modal'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Popover from '../components/usefull/Popover'
import Settings from '../components/helpers/settings'
// import Script from 'next/script'

export default function MainLayout({ children, title }) {
    useEffect(() => {
        globalState.path.push(window.location.href)
    }, [])
    
    return (
        <>
            <Head>
                <title>{title}</title>
                {/* <script src="components/helpers/odometer.js"></script> */}
                {/* <link rel="stylesheet" href="http://github.hubspot.com/odometer/themes/odometer-theme-car.css" /> */}
            </Head>
            <Settings />
            <Header />
            <Popover />
            <div className='container'>
                {children}
            </div>
            <Footer />
            {/* <Script src='../components/helpers/odometer.js' strategy='lazyOnload' /> */}
            <Modal />
        </>
    )
}