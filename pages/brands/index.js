import Cloud from "../../components/Cloud"
import KaleidoscopeElem from "../../components/KaleidoscopeElem"
import Title from "../../components/Title"
import MainLayout from "../../layout/MainLayout"

export default function Brands({ items }) {
    return (
        <MainLayout className='ui-light'>
            <div className="col col--between">
                <Title text='Brands' hover='Бренды'/>
                <div className='text--c3'>
                    14 брендов лучшей косметики для парикмахеров, стилистов, колористов
                </div>
                <Cloud items={items} />
            </div>
            <div className="col col--center">
                <KaleidoscopeElem />
            </div>
        </MainLayout>
    )
}

export async function getServerSideProps({req}) {
    const resp = await fetch(`${process.env.API_URL}/brands`)
    const json = await resp.json()
  
    return {
        props: {
            items: json.items
        }
    }
}