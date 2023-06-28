import { useState, useEffect, useRef } from 'react'
import { globalState } from './globalState'
import { isEqual } from './isEqual'

export default function Settings() {
    const refBasketItems = useRef([])
    const [updateItemsCount, setUpdateItemsCount] = useState(0)

    const replace = items => {
        refBasketItems.current = items
        globalState.basket.count = items.length
        globalState.basket.items = items
        localStorage.basket = JSON.stringify(items)
    }

    const update = value => {
        const item = { ...value.info }
        item.values = [value.activeValue]
        const isExist = isEqual(refBasketItems.current, item)
        if (isExist === false) {
            refBasketItems.current.push(item)
        } else {
            refBasketItems.current[isExist.index].values[0].basket = value.val
        }
        localStorage.basket = JSON.stringify(refBasketItems.current)
        globalState.basket.count = refBasketItems.current.length
        globalState.basket.items = refBasketItems.current
        setUpdateItemsCount(refBasketItems.current.length)
    }

    const resizeHandler = () => {
        const wh = window.innerHeight
        const gwh = globalState.window.height
        if (wh !== gwh) {
            const attr = wh > gwh ? 'biggest' : 'smallest'
            document.body.setAttribute('data-swap', attr)
        } else {
            document.body.setAttribute('data-swap', false)
        }
    }
    
    useEffect(() => {
        const items = localStorage.basket
        const parsed = items ? JSON.parse(items) : []
        refBasketItems.current = parsed
        globalState.basket = {
            count: parsed.length,
            updateItemsCount,
            // basketItems,
            items: parsed,
            replace,
            update
        }

        globalState.window = {
            height: window.innerHeight
        }

        if (window.innerWidth <= globalState.sizes.sm) {
            document.body.setAttribute('data-swap', false)
            window.addEventListener('resize', resizeHandler)
        }

        return () => {
            window.removeEventListener('resize', resizeHandler)
        }
    }, [])

    // let openRequest = indexedDB.open('basket')
    // openRequest.onsuccess = function () {
    //     let db = openRequest.result;
    //     // продолжить работу с базой данных, используя объект db
    // };

    return null
}