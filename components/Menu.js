import A from "./A";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion'
import { menuItems } from './helpers/constants'
import MenuPreloader from "./MenuPreloader";

export default function Menu ({className}) {
    const [active, setActive] = useState(false)
    const clickHandler = (event) => {
        const activeState = active === 'menu' ? 'false' : 'menu'
        setActive(activeState)
    }
    useEffect(() => {
        
    }, [active])
    return (
        <div data-active={active} className={`${className} menu`}>
            <div className='menu__controls'>
                <div onClick={ clickHandler } className='menu__burger c-hover'>
                    <div /><div /><div />
                </div>


            </div>
            <div className='menu__wrapper'>
                <nav onClick={ clickHandler } className='menu__nav'>
                    { menuItems.map( item => <A key={item.text} href={item.link} text={item.text} /> )}
                </nav>
                
                <div className='menu__preload'>
                    <MenuPreloader state={active} />
                </div>
            </div>
        </div>
    )
}