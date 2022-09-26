import Title from "../../components/Title"
import MainLayout from "../../layout/MainLayout"
import { brandItems } from '../../components/helpers/constants'

export default function Projects() {
    return (
        <MainLayout className='ui-light'>
            <div className="col">
                <Title text='Projects' hover='Проекты'/>
            </div>
            <div className="col">
            </div>
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