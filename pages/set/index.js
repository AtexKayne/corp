import MainLayout from '../../layout/MainLayout'
import Banner from '../../components/product/Banner'
import Breadcrumbs from '../../components/Breadcrumbs'
import { set } from '../../components/helpers/constants'

export default function Promo({detail}) {

    return (
        <MainLayout title={`Подборки`}>
            <Breadcrumbs link={['Подборки|/set']} />
            <h1 className='text--h4 mb-2.5 mb-4:lg mt-2 mt-1.5:md mt-2:lg'>Подборки</h1>
            {detail && detail.length
                ? detail.map(promo => <Banner
                    key={promo.id}
                    title={promo.title}
                    items={promo.items}
                    images={promo.images}
                    description={promo.description} />)
                : null
            }
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    let resp, json
    
    json = set
    // try {
    //   resp = await fetch(`${process.env.API_URL}/team/${context.query.name}/?lang=ru`)
    //   json = await resp.json()
    // } catch (error) {
    //   json = persone
    // }

    return {
        props: {
            detail: json,
        }
    }
}