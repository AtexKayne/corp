import BrandList from '../../components/BrandList'
import MainLayout from '../../layout/MainLayout'
import { brandItems } from '../../components/helpers/constants'

export default function Brands({ items }) {
    return (
        <MainLayout className='ui-light'>
            <BrandList items={brandItems.items}>

            </BrandList>
        </MainLayout>
    )
}

export async function getServerSideProps({req}) {
    let resp, json
    try {
        resp = await fetch(`${process.env.API_URL}/brands`)
        json = await resp.json()
    } catch (error) {
        json = brandItems
    }
  
    return {
        props: {
            items: json.items
        }
    }
}