import MainLayout from '../../layout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import Catalog from '../../components/catalog/Catalog'
import { cats as categories } from '../../components/helpers/categories'

export default function CatalogPage({ detail }) {
    const c = detail.currentCategory

    return (
        <MainLayout title={`Каталог | ${c.name}`}>
            <Breadcrumbs theme={c.theme ? c.theme : false} />

            <Catalog detail={detail} />
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const queryCategory = context.query.category[0]
    const prev = context
    let resp
    let currentCategory

    const json = {
        categories: categories.data
    }

    const recursiveSearch = (categories, url) => {
        categories.forEach(property => {
            if (property.url === queryCategory) {
                currentCategory = property
                return
            }
            if (Array.isArray(property['include_sections'])) {
                return recursiveSearch(property['include_sections'], url)
            }
        })
    }

    // const recursiveSearch = (categories, url) => {

    // }

    if (categories.data) {
        recursiveSearch(categories.data, queryCategory)
    }

    if (!currentCategory) {
        currentCategory = {
            name: 'Каталог товаров',
            id: 0,
            parent_id: 0,
            filter: false,
        }
    }

    json.currentCategory = currentCategory

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
