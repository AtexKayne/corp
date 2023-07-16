import MainLayout from '../../layout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import Catalog from '../../components/catalog/Catalog'
import { cat } from '../../components/helpers/categories'

export default function CatalogPage({ detail }) {
    const c = detail.category

    return (
        <MainLayout title={`Каталог | ${detail.name}`}>
            <Breadcrumbs theme={detail.theme ? detail.theme : false} />

            <Catalog detail={detail} />
        </MainLayout>
    )
}

export async function getServerSideProps(context) {
    const json = cat.data
    // console.log(json.filter);

    const initFilters = () => {
        if (!json.filter || !JSON) return
        let newFilter = JSON.stringify(json.filter)
        if (typeof context.query === 'object') {
            for (const key in context.query) {
                if (Object.hasOwnProperty.call(context.query, key)) {
                    const element = context.query[key]
                    if (element && typeof element.split === 'function') {
                        const data = element.split('|')
                        data.forEach(element => {
                            if (element && newFilter.includes(`"${element}"`)) {
                                newFilter = newFilter.replace(`"${element}","isSelected":false`, `"${element}","isSelected":true`)
                            }
                        })
                    }
                }
            }
        }

        const parsed = JSON.parse(newFilter)
        return parsed
    }

    if (json.filter) {
        json.filter = initFilters()
    }

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
