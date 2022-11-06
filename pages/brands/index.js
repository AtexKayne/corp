import BrandList from './BrandList'
import { useContext, useEffect } from 'react'
import MainLayout from '../../layout/MainLayout'
import { brandItems } from '../../components/helpers/constants'
import { ThemeContext } from '../../components/helpers/ThemeContext'

export default function Brands({ brandlist }) {
    const {setTheme} = useContext(ThemeContext)
    useEffect(() => {
        setTheme('ui-light')
    }, [])

    return (
        <MainLayout className='ui-light no-padding'>
            <BrandList items={brandlist.items} tags={brandlist.tags} />
        </MainLayout>
    )
}

export async function getServerSideProps({req}) {
    let resp, json
    try {
        resp = await fetch(`${process.env.API_URL}/brands/?lang=ru`)
        json = await resp.json()
    } catch (error) {
        json = brandItems
    }
  
    return {
        props: {
            brandlist: json,
        }
    }
}