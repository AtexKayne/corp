import BrandList from './BrandList'
import { useContext, useEffect } from 'react'
import MainLayout from '../../layout/MainLayout'
import { brandItems } from '../../components/helpers/constants'
import { ThemeContext } from '../../components/helpers/ThemeContext'

export default function Brands({ items }) {
    const {setTheme} = useContext(ThemeContext)
    useEffect(() => {
        setTheme('ui-light')
    }, [])

    return (
        <MainLayout className='ui-light no-padding'>
            <BrandList items={brandItems.items} tags={brandItems.tags} />
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
            items: json.items,
            // tags: json.tags
        }
    }
}