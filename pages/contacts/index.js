import { SmoothScrollProvider } from '../../components/helpers/SmoothScroll.context'
import MainLayout from '../../layout/MainLayout'
import { contacts } from '../../components/helpers/constants'
import ContactsMap from './ContactsMap'
import ContactsIntro from './ContactsIntro'
import { useEffect } from 'react'


export default function Brand({ setTheme, detail }) {
    useEffect(() => {
        console.log(detail);
    }, []);
    return (
        <MainLayout className='no-padding'>
            <SmoothScrollProvider options={{ smooth: true }}>
                <ContactsIntro title={detail.pagename}/>
                <ContactsMap adress={detail.adress}/>
                <section data-scroll-section>
                    <h1 className='sr-only'>{detail.pagename}</h1>
                </section>
            </SmoothScrollProvider>
        </MainLayout>
    )
}

export async function getServerSideProps({ req }) {
    let resp, json
    try {
        // resp = await fetch(`${process.env.API_URL}/mainxczxc`)
        // json = await resp.json()
        json = contacts
    } catch (error) {
        json = contacts
    }

    return {
        props: {
            detail: json,
        }
    }
}