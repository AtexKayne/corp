import { SmoothScrollProvider } from '../../components/helpers/SmoothScroll.context'
import MainLayout from '../../layout/MainLayout'
import { contacts } from '../../components/helpers/constants'
import ContactsMap from './ContactsMap'
import ContactsIntro from './ContactsIntro'
import ContactsDepartments from './ContactsDepartments'
import ContactsDocuments from './ContactsDocuments'


export default function Brand({ setTheme, detail }) {
    return (
        <MainLayout className='no-padding'>
            <SmoothScrollProvider options={{ smooth: true }}>
                <ContactsIntro title={detail.pagename} />
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