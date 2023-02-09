import Catalog from '../catalog/[...category]'
import { useState, useEffect, useRef } from 'react'
import { categories } from '../../components/helpers/categories'

export default function Brand({detail}) {

    return (
        <Catalog detail={detail}/>
    )
}

export async function getServerSideProps(context) {
    const queryCategory = context.query.category
    let resp
    let currentCategory = {
        name: 'Каталог товаров',
        id: 0,
        parent_id: 0,
        filter: false
    }
    const json = {}
    const getIncludes = obj => {
        const includes = []
        for (const property in obj) {
            includes.push(obj[property])
        }
        return includes
    }

    if (categories.data) {
        const data = []

        for (const property in categories.data) {
            // const url = categories.data[property].url.split('catalog/')[1]
            // categories.data[property].url = url
            currentCategory = categories.data[property].url.includes(queryCategory)
                ? categories.data[property]
                : currentCategory
            if (categories.data[property].hasOwnProperty('include_sections')) {
                const includes = getIncludes(categories.data[property].include_sections)
                categories.data[property].include_sections = includes

                if (currentCategory.id === 0) {
                    categories.data[property].include_sections.forEach(include => {
                        currentCategory = include.url.includes(queryCategory)
                            ? include
                            : currentCategory
                    })
                }
            }
            // categories.data[property].url = 'catalog'
            data.push(categories.data[property])
        }

        json.categories = data
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