import Cloud from '../../components/Cloud'
import KaleidoscopeElem from '../../components/KaleidoscopeElem'
import Title from '../../components/Title'
import MainLayout from '../../layout/MainLayout'
import { brandItems } from '../../components/helpers/constants'

export default function Brands({ items }) {
    return (
        <MainLayout className='ui-light'>
            <div className='col col--between'>
                <Title text='Brands' hover='Бренды'/>
                <div className='text--c3'>
                    14 брендов лучшей косметики для парикмахеров, стилистов, колористов
                </div>
                <Cloud items={items} />
            </div>
            <div className='col col--center'>
                <KaleidoscopeElem />
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps({req}) {
    let resp, json
    // try {
    //     resp = await fetch(`${process.env.API_URL}/brands`)
    //     json = await resp.json()
    // } catch (error) {
        json = brandItems
    // }
  
    return {
        props: {
            items: json.items
        }
    }
}