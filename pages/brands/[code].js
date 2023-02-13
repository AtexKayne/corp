import Catalog from '../catalog/[...category]'
import { useState, useEffect, useRef } from 'react'
import { brands as categories } from '../../components/helpers/categories'

export default function Brand({detail}) {

    return (
        <Catalog detail={detail}/>
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

            if (Array.isArray(property['include_sections'])) {
                property.include_sections.forEach(include => {
                    currentCategory = include.url.includes(`/${queryCategory}/`) ? include : currentCategory
                })
            }
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