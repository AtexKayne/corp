import { globalState } from '../components/helpers/globalState'
import { useEffect } from 'react'

import Head from 'next/head'
import Modal from '../components/Modal'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Popover from '../components/usefull/Popover'

export default function MainLayout({ children, title }) {
    useEffect(() => {
        globalState.path.push(window.location.href)
    }, [])
    
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
            <Modal />
        </>
    )
}