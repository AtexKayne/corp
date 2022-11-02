import ContactsMap from './ContactsMap'
import { useContext, useEffect } from 'react'
import MainLayout from '../../layout/MainLayout'
import ContactsDocuments from './ContactsDocuments'
import ContactsDepartments from './ContactsDepartments'
import { contacts } from '../../components/helpers/constants'
import { ThemeContext } from '../../components/helpers/ThemeContext'
import { SmoothScrollProvider } from '../../components/helpers/SmoothScroll.context'


export default function Brand({ detail }) {
    const { setTheme } = useContext(ThemeContext)
    useEffect(() => {
        setTheme('ui-light')
    }, [])
    return (
        <MainLayout className='no-padding'>
            <SmoothScrollProvider options={{ smooth: true }}>
                {/* <ContactsIntro title={detail.pagename} /> */}
                <ContactsMap adress={detail.adress} />
                <ContactsDepartments departments={detail.departments} />
                <ContactsDocuments documents={detail.documents} />
            </SmoothScrollProvider>
        </MainLayout>
    )
}

export async function getServerSideProps({ req }) {
    let resp, json
    try {
        resp = await fetch(`${process.env.API_URL}/contacts/?lang=ru`)
        json = await resp.json()
    } catch (error) {
        json = contacts
    }

    return {
        props: {
            detail: json,
        }
    }
}