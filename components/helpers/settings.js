import { useState, useEffect, useRef } from 'react'
import { globalState } from './globalState'

export default function Settings() {
    const [basketItems, setItems] = useState([])
    const add = item => {
        setItems(prev => {
            prev.push(item)
            return prev
        })
        const filtered = basketItems.find(element => element.id === item.id)
        // if (filtered.length) {
        //     basketItems.forEach(element => {

        //     })
        // }
    }

    useEffect(() => {
        const items = localStorage.basket ?? JSON.stringify([])
        const parsed = JSON.parse(items) 
        setItems(parsed)
        globalState.basket = {
            count: 0,
            basketItems,
            setItems,
            add
        }
    }, [])

    useEffect(() => {
        globalState.basket.items = basketItems
        globalState.basket.count = basketItems.length
        localStorage.basket = JSON.stringify(basketItems)
    }, [basketItems])

    return null
}