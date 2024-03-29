import MainLayout from '../../layout/MainLayout'
import Catalog from '../../components/catalog/Catalog'
import Breadcrumbs from '../../components/Breadcrumbs'
import { brands as categories } from '../../components/helpers/categories'

export default function BrandPage({detail}) {
    const c = detail.currentCategory

    return (
        <MainLayout title={`Бренд | ${c.name}`}>
            <Breadcrumbs theme={c.theme ? c.theme : false} />

            <Catalog detail={detail} />
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const queryCategory = context.query.code

    let resp
    let currentCategory = {
        name: 'Все бренды',
        id: 0,
        parent_id: 0,
        filter: false,
    }
    const json = {
        categories: categories.data
    }

    if (categories.data) {
        categories.data.forEach(property => {
            currentCategory = property.url.includes(`/${queryCategory}/`) ? property : currentCategory
        })
    }

    json.currentCategory = currentCategory
    json.isBrands = true

    // json = persone
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